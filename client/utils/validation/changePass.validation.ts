import * as yup from 'yup';

export interface IChangePassword {
    password: string;
    newPassword: string;
}

export const ChangePasswordSchema = yup
    .object({
        password: yup.string().required('Vui lòng nhập mật khẩu cũ !'),
        newPassword: yup.string().required('Vui lòng nhập mật khẩu mới !'),
    })
    .required();
