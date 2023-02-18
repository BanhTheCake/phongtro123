import { IPagination } from './interfaces';
import { IUser } from './user.interface';

export interface IPostTitle {
    id: string;
    title: string;
    star: string;
    address: string;
    description: string;
    images: {
        images: string;
    };
    user: Pick<IUser, 'id' | 'name' | 'phone' | 'zalo' | 'image'>;
    attributes: {
        id: string;
        price: number;
        acreage: number;
        published: string;
        hashtag: string;
    };
}

export interface IPostTitlePagination {
    data: [IPostTitle];
    pagination: IPagination;
}

export interface INewPost {
    id: string;
    title: string;
    images: {
        images: string;
    };
    attributes: {
        price: number;
    };
    createdAt: string;
}

export interface IGetOwnerPosts {
    id: string;
    title: string;
    createdAt: string;
    attributes: {
        price: number;
    };
    overview: {
        code: string;
        expire: string;
    };
}

export interface IGetCurrentPost {
    id: string;
    title: string;
    description: string;
    categoryCode: string;
    overview: {
        area: string;
        target: string;
        type: string;
    };
    attributes: {
        price: number;
        acreage: number;
    };
    images: {
        images: string;
    };
}

export interface IDetailsPost {
    id: string;
    title: string;
    star: string;
    address: string;
    description: string;
    createdAt: string;
    overview: {
        id: string;
        code: string;
        area: string;
        type: string;
        target: string;
        expire: string;
        bonus: string | null;
    };
    attributes: {
        id: string;
        price: number;
        acreage: number;
        published: string;
        hashtag: string;
    };
    images: {
        id: string;
        images: string;
    };
    label: {
        id: number;
        code: string;
        value: string;
    };
    category: {
        id: number;
        code: string;
        value: string;
        slug: string;
        header: string;
        subheader: string;
    };
    province: {
        id: number;
        code: string;
        value: string;
    };
    user: {
        id: string;
        name: string;
        phone: string;
        zalo: string;
        url: string;
        image: string;
    };
}
