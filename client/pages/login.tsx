import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from '../components/global/Button';
import Input from '../components/global/Input';
import PATH from '../constants/path';
import DefaultLayout from '../layouts/DefaultLayout';
import { handleLogin } from '../utils/axios/auth.axios';
import { ILoginSchema, LoginSchema } from '../utils/validation/login.validation';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { setStateData } from '../features/authSlice';
import { useRouter } from 'next/router';

const Login = () => {
    const {
        control,
        handleSubmit,
    } = useForm<ILoginSchema>({
        resolver: yupResolver(LoginSchema),
    });

    const router = useRouter()
    const prevRoute = router.query['prevRoute'] || PATH.HOME
    const dispatch = useDispatch()

    const { mutate: login, isLoading } = useMutation('Login', handleLogin, {
        onSuccess: (data) => {
            dispatch(setStateData({ ...data, isLogin: true }))
            router.push(prevRoute as string) 
        },
        onError: (err) => {
            toast.error(err as string)
        }
    })

    const onSubmit = (data: ILoginSchema) => {  
        if (isLoading) return;
        login(data)
    };

    const [isShowPass, setIsShowPass] = useState(false);

    const toggleButtonShowPass = () => {
        setIsShowPass((prev) => !prev);
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Đăng nhập</title>
                <meta property="og:title" content="Login Page" key="title" />
            </Head>
            <div className="bg-white max-w-[600px] m-auto p-6 rounded-lg mt-6 shadow-md pb-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="flex text-3xl font-semibold mb-4">
                        Đăng nhập
                    </h3>
                    <Input
                        name="phone"
                        type="text"
                        defaultValue=''
                        id="number"
                        text="Số điện thoại"
                        placeholder=""
                        control={control}
                    />
                    <Input
                        name='password'
                        control={control}
                        defaultValue=''
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
                        Đăng nhập
                    </Button>
                </form>
                <div className="flex justify-between mt-6 text-primary text-base font-semibold">
                    <Link
                        href={PATH.HOME}
                        className="flex hover:text-secondary"
                    >
                        Bạn quên mật khẩu?
                    </Link>
                    <Link
                        href={PATH.REGISTER}
                        className="flex hover:text-secondary"
                    >
                        Tạo tài khoản mới
                    </Link>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Login;
