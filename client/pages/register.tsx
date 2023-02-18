import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from '../components/global/Button';
import Input from '../components/global/Input';
import PATH from '../constants/path';
import DefaultLayout from '../layouts/DefaultLayout';
import { handleRegister } from '../utils/axios/auth.axios';
import {
    IRegisterSchema,
    RegisterSchema,
} from '../utils/validation/register.validation';

const Register = () => {
    const { control, handleSubmit } = useForm<IRegisterSchema>({
        resolver: yupResolver(RegisterSchema),
    });

    const router = useRouter();

    const { mutate: register, isLoading } = useMutation(
        'register',
        handleRegister,
        {
            onSuccess: () => {
                toast.success('Đăng ký tài khoản thành công !');
                router.push(PATH.LOGIN);
            },
            onError: (err) => {
                toast.error(err as string);
            },
        }
    );

    const onSubmit = (data: IRegisterSchema) => {
        if (isLoading) return;
        register(data);
    };

    const [isShowPass, setIsShowPass] = useState(false);

    const toggleButtonShowPass = () => {
        setIsShowPass((prev) => !prev);
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Tạo tài khoản</title>
                <meta property="og:title" content="Register Page" key="title" />
            </Head>
            <div className="bg-white max-w-[600px] m-auto p-6 rounded-lg mt-6 shadow-md pb-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="flex text-3xl font-semibold mb-4">
                        Tạo tài khoản mới
                    </h3>
                    <Input
                        name="name"
                        type="text"
                        defaultValue=""
                        id="fullName"
                        text="Họ và tên"
                        placeholder=""
                        control={control}
                    />
                    <Input
                        name="phone"
                        type="text"
                        defaultValue=""
                        id="number"
                        text="Số điện thoại"
                        placeholder=""
                        control={control}
                    />
                    <Input
                        name="password"
                        control={control}
                        defaultValue=""
                        id="password"
                        text="Mật khẩu"
                        placeholder=""
                        type={isShowPass ? 'text' : 'password'}
                    />
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={isShowPass}
                                onChange={toggleButtonShowPass}
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Hiện mật khẩu
                        </label>
                    </div>
                    <Button secondary full>
                        Tạo tài khoản
                    </Button>
                </form>
                <div className="flex justify-between mt-6 text-base">
                    <p className="flex gap-1 font-semibold">
                        Bạn đã có tài khoản?{' '}
                        <Link
                            href={PATH.LOGIN}
                            className="flex text-primary hover:text-secondary"
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Register;
