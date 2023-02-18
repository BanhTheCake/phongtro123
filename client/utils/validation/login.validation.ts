import * as yup from 'yup';

export interface ILoginSchema {
    phone: string;
    password: string;
}

export const LoginSchema = yup
    .object({
        phone: yup.string().required('Số điện thoại không được để trống'),
        password: yup.string().required('Mật khẩu không được để trống'),
    })
    .required();
