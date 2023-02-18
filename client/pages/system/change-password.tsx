import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import React from 'react';
import Input from '../../components/global/Input';
import SystemLayout from '../../layouts/SystemLayout';
import { useForm } from 'react-hook-form';
import Contact from '../../components/public/Contact';
import {
    ChangePasswordSchema,
    IChangePassword,
} from '../../utils/validation/changePass.validation';
import { useMutation } from 'react-query';
import { handleChangePassword } from '../../utils/axios/auth.axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import logout from '../../utils/helpers/logout';
import PATH from '../../constants/path';

const ChangePasswordPage = () => {
    const { control, handleSubmit, reset } = useForm<IChangePassword>({
        resolver: yupResolver(ChangePasswordSchema),
    });

    const router = useRouter()

    const { mutate: changePassword, isLoading } = useMutation({
        mutationKey: 'Change password',
        mutationFn: handleChangePassword,
        onSuccess: () => {
            toast.success('Change password success !');
            logout(() => {
                router.push(PATH.LOGIN)
            })
        },
        onError: (err) => {
            toast.error(err as string);
        },
    });

    const onSubmitUpdate = (data: IChangePassword) => {
        if (isLoading) return;
        changePassword(data);
    };

    return (
        <SystemLayout>
            <Head>
                <title>Đổi mật khẩu</title>
                <meta property="og:title" content="data user" key="data user" />
            </Head>
            <section>
                <div className="flex justify-between gap-2 items-center w-full border-b pb-3">
                    <h1 className="text-3xl">Đổi mật khẩu</h1>
                </div>
                <form
                    action=""
                    className="max-w-[800px] m-auto mt-6 space-y-12"
                    onSubmit={handleSubmit(onSubmitUpdate)}
                >
                    <div>
                        <Input
                            control={control}
                            name={'password'}
                            defaultValue={''}
                            id={'password'}
                            placeholder={''}
                            text={'Mật khẩu cũ'}
                            type={'password'}
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                        <Input
                            control={control}
                            name={'newPassword'}
                            defaultValue={''}
                            id={'newPassword'}
                            placeholder={''}
                            text={'Mật khẩu mới'}
                            type={'password'}
                            sizeInput="s"
                            direction="row"
                            widthLabel="180px"
                        />
                    </div>
                    <button
                        className={`w-full bg-primary text-white font-semibold p-2 rounded-sm ${isLoading ? 'opacity-80 cursor-not-allowed' : ''
                            }`}
                    >
                        Đổi mật khẩu
                    </button>
                </form>
                <Contact />
            </section>
        </SystemLayout>
    );
};

export default ChangePasswordPage;
