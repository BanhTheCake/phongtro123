import * as yup from 'yup';

export interface IUpdateInfo {
    id: string;
    name: string;
    phone: string;
    zalo: string;
    url: string;
    image: string | File[];
    email: string;
}

const onlyNumber = /^\d+$/;

export const UpdateInfoSchema = yup
    .object({
        zalo: yup
            .string()
            .matches(onlyNumber, 'Zalo chỉ được chứa ký tự số')
            .nullable()
            //https://stackoverflow.com/questions/70552258/yup-validation-of-empty-string
            .transform((curr, orig) => (orig === '' ? null : curr)),
        url: yup.string().url('Link facebook không hợp lệ !'),
        name: yup.string().trim(),
        email: yup.string().email('Email không hợp lệ !'),
    })
    .required();
