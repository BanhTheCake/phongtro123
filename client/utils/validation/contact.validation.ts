import * as yup from 'yup';

export interface IContactSchema {
    name: string;
    phone: string;
    text: string;
}

const onlyNumber = /^\d+$/;
export const contactSchema = yup
    .object({
        name: yup.string().required('Họ tên không được để trống'),
        phone: yup
            .string()
            .required('Số điện thoại không được để trống')
            .matches(onlyNumber, 'Số điện thoại chỉ được chứa ký tự số'),
        text: yup.string().required('Nội dung không được để trống'),
    })
    .required();
