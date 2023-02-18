import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/global/Button';
import Input from '../../components/global/Input';
import InputFile from '../../components/global/InputFile';
import Contact from '../../components/public/Contact';
import useUploadImage from '../../hooks/useUploadImage';
import SystemLayout from '../../layouts/SystemLayout';
import { RootState } from '../../redux/store';
import { updateDataUser } from '../../utils/axios/user.axios';
import {
    IUpdateInfo,
    UpdateInfoSchema,
} from '../../utils/validation/updateInfo.validation';
import { setStateData } from '../../features/authSlice'
import { toast } from 'react-toastify';
import Head from 'next/head';
import PATH from '../../constants/path';

const UpdateInformation = () => {
    const user = useSelector<RootState>((state) => state.auth.user) as RootState['auth']['user']
    const prevUserRef = useRef<typeof user>();

    const dispatch = useDispatch()

    const { control, handleSubmit, reset } =
        useForm<IUpdateInfo>({
            resolver: yupResolver(UpdateInfoSchema),
        });

    const { mutate: handleUpdate, isLoading: isUpdating } = useMutation({
        mutationKey: 'Update Data user',
        mutationFn: updateDataUser,
        onSuccess: (_, variables) => {
            const newDataUser = { ...user, ...variables } as typeof user
            dispatch(setStateData({ user: newDataUser }))
            toast.success('Cập nhật thông tin thành công !')
        },
        onError: (err) => {
            console.log('err: ', err);
            toast.error(err as string)
        }
    })

    const [isUploading, handleUpload] = useUploadImage()
    const isLoading = isUploading || isUpdating

    const onSubmitUpdate = useCallback(async (data: IUpdateInfo) => {
        const dataExcludeFalsy = _.pickBy(data, _.identity);
        const prevUserExcludeFalsy = _.pickBy(prevUserRef.current, _.identity);
        const isEqual = _.isEqual(dataExcludeFalsy, prevUserExcludeFalsy);
        if (isEqual || isLoading) return;

        // Pick out the difference between the dataExcludeFalsy and prevUserExcludeFalsy
        const insertData = _.pickBy(
            dataExcludeFalsy,
            (v, k) => !_.isEqual(prevUserExcludeFalsy[k as keyof typeof prevUserExcludeFalsy], v)
        );
        const { image } = insertData
        if (image && Array.isArray(image)) {
            const imageUrl = (await handleUpload(image))[0]
            insertData['image'] = imageUrl
        }
        handleUpdate(insertData)
    }, [prevUserRef.current, isLoading, handleUpload])

    useEffect(() => {
        if (!user) return;
        type IKeyUser = keyof typeof user
        const arrayExclude: Partial<IKeyUser>[] = ['createdAt', 'updatedAt']
        const userNotNull: Partial<Record<IKeyUser, any>> = {};
        Object.keys(user).forEach(key => {
            const keyT = key as IKeyUser;
            if (user[keyT] && !arrayExclude.includes(keyT)) {
                userNotNull[keyT] = user[keyT]
            }
        })
        prevUserRef.current = userNotNull as typeof user
        reset(userNotNull)
    }, [user])

    return (
        <SystemLayout>
            <Head>
                <title>Thông tin bản thân</title>
                <meta property="og:title" content="data user" key="data user" />
            </Head>
            <section>
                <div className="flex justify-between gap-2 items-center w-full border-b pb-3">
                    <h1 className="text-3xl">Cập nhật thông tin cá nhân</h1>
                </div>
                <form
                    action=""
                    className="max-w-[800px] m-auto mt-6 space-y-12"
                    onSubmit={handleSubmit(onSubmitUpdate)}
                >
                    <div>
                        <Input
                            control={control}
                            name={'id'}
                            defaultValue={''}
                            id={'id'}
                            placeholder={''}
                            text={'Mã thành viên'}
                            type={'text'}
                            disabled
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                        <Input
                            control={control}
                            name={'phone'}
                            defaultValue={''}
                            id={'phone'}
                            placeholder={''}
                            text={'Số điện thoại'}
                            type={'text'}
                            disabled
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                    </div>
                    <div>
                        <Input
                            control={control}
                            name={'name'}
                            defaultValue={''}
                            id={'name'}
                            placeholder={'BanhTheCake'}
                            text={'Tên hiển thị'}
                            type={'text'}
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                        <Input
                            control={control}
                            name={'email'}
                            defaultValue={''}
                            id={'email'}
                            placeholder={'Example@gmail.com'}
                            text={'Email'}
                            type={'text'}
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                        <Input
                            control={control}
                            name={'zalo'}
                            defaultValue={''}
                            id={'zalo'}
                            placeholder={'09090909'}
                            text={'Số Zalo'}
                            type={'text'}
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                        <Input
                            control={control}
                            name={'url'}
                            defaultValue={''}
                            id={'url'}
                            placeholder={'https://example.com'}
                            text={'Facebook'}
                            type={'text'}
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                    </div>
                    <div>
                        <div className="flex items-center">
                            <p
                                className={`pl-1.5 block text-base font-medium text-gray-900 dark:text-white max-w-full w-[180px]`}
                            >
                                Mật khẩu
                            </p>
                            <Button
                                className="ml-2 px-4 hover:bg-red-700 transition-all"
                                isUnderline={false}
                                primary
                                href={PATH.CHANGE_PASSWORD}
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                        <div className="mt-8">
                            <InputFile
                                control={control}
                                name={'image'}
                                id={'image'}
                                text={'Ảnh đại diện'}
                            />
                        </div>
                    </div>
                    <button
                        className={`w-full bg-primary rounded-md text-white font-semibold p-2 rounded-sm ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Đang cập nhật ...' : 'Cập nhật'}
                    </button>
                </form>
                <Contact />
            </section>
        </SystemLayout>
    );
};

export default UpdateInformation;
