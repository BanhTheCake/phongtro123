import * as yup from 'yup';
import { IInputSelectItem } from '../../components/global/InputSelect';

export interface IHandlePost {
    province: string;
    distinct: string;
    category: string;
    title: string;
    description: string;
    username: string;
    phone: string;
    price: string;
    area: string;
    gender: string;
    images: File[] | string[];
}

export const HandlePostSchema = yup
    .object({
        province: yup.string().required('Tỉnh/Thành phố không được để trống !'),
        distinct: yup.string().required('Quận/Huyện không được để trống !'),
        category: yup.string().required('Chuyên mục không được để trống !'),
        title: yup.string().required('Tiêu đề không được để trống !'),
        description: yup.string().required('Nội dung không được để trống !'),
        price: yup.string().required('Giá cho thuê không được để trống !'),
        area: yup.string().required('Diện tích không được để trống !'),
        gender: yup.string().required('Giới tính không được để trống !'),
        images: yup
            .array()
            .min(1, 'Ảnh không được để trống')
            .required('Ảnh không được để trống'),
    })
    .required();
