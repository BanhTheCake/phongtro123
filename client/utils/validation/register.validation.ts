import * as yup from 'yup';

export interface IRegisterSchema {
    name: string;
    phone: string;
    password: string;
}

export const RegisterSchema = yup
    .object({
        name: yup.string().required('Họ và tên không được để trống'),
        phone: yup.string().required('Số điện thoại không được để trống'),
        password: yup.string().required('Mật khẩu không được để trống'),
    })
    .required();
