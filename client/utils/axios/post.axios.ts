import {
    GET_ALL_POSTS_PAGINATION_URL,
    GET_NEW_POSTS_URL,
    CREATE_NEW_POST_URL,
    GET_OWNER_POSTS,
    GET_CURRENT_POST,
    UPDATE_CURRENT_POST,
    DELETE_POST_BY_ID,
    GET_DETAILS_POST,
} from './../../constants/api';
import { IResp } from './../interfaces/interfaces';
import axios, { Axios, AxiosError } from 'axios';
import { GET_ALL_POSTS_URL } from '../../constants/api';
import {
    IDetailsPost,
    IGetCurrentPost,
    IGetOwnerPosts,
    INewPost,
    IPostTitle,
    IPostTitlePagination,
} from '../interfaces/post.interface';
import axiosPrivate from './custom/axiosPrivate';
export const getAllPosts = () => {
    return new Promise<[IPostTitle]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Get',
                url: GET_ALL_POSTS_URL,
            });
            const resData = res.data as IResp<[IPostTitle]>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server !');
            }
            reject(errT.message);
        }
    });
};

export const getAllPostsPagination = (
    {
        limit,
        page,
        ...queries
    }: {
        limit: number | string;
        page: number | string;
        minPrice?: number | string | null;
        maxPrice?: number | string | null;
        minArea?: number | string | null;
        maxArea?: number | string | null;
        province?: string | null;
    },
    signal: AbortSignal | undefined
) => {
    return new Promise<IPostTitlePagination>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Get',
                url: GET_ALL_POSTS_PAGINATION_URL,
                params: {
                    limit,
                    page,
                    ...queries,
                },
                signal,
            });
            const resData = res.data as IResp<IPostTitlePagination>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server !');
            }
            reject(errT.message);
        }
    });
};

export const getNewPosts = (limit: number, signal: AbortSignal | undefined) => {
    return new Promise<[INewPost]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: GET_NEW_POSTS_URL,
                params: {
                    limit,
                },
                signal,
            });
            const resData = res.data as IResp<[INewPost]>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server !');
            }
            reject(errT.message);
        }
    });
};

export const handleCreatePost = (data: any) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'post',
                url: CREATE_NEW_POST_URL,
                data: data,
            });
            const resData = res.data as IResp<void>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve();
        } catch (error) {
            const errT = error as AxiosError;
            console.log(errT);
            if (!errT.response) return reject('Something wrong with server');
            reject(errT.message);
        }
    });
};

export const handleGetOwnerPosts = (
    signal: AbortSignal | undefined,
    filterValue: string
) => {
    return new Promise<IGetOwnerPosts[]>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'get',
                url: GET_OWNER_POSTS,
                signal,
                params: {
                    status: filterValue,
                },
            });
            const resData = res.data as IResp<IGetOwnerPosts[]>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) return reject('Something wrong with server !');
            reject(errT.message);
        }
    });
};

export const handleGetCurrentPost = (
    id: string,
    signal: AbortSignal | undefined
) => {
    return new Promise<IGetCurrentPost>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${GET_CURRENT_POST}/${id}`,
                signal,
            });
            const resData = res.data as IResp<IGetCurrentPost>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            console.log(errT);
            if (!errT.response) return reject('Something wrong with server ! ');
            reject(errT.message);
        }
    });
};

export const handleUpdatePost = ({ data, id }: { data: any; id: string }) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'post',
                url: `${UPDATE_CURRENT_POST}/${id}`,
                data: data,
            });
            const resData = res.data as IResp<void>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve();
        } catch (error) {
            const errT = error as AxiosError;
            console.log(errT);
            if (!errT.response) return reject('Something wrong with server ! ');
            reject(errT.message);
        }
    });
};

export const handleDeletePostById = (id: string) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'delete',
                url: `${DELETE_POST_BY_ID}/${id}`,
            });
            const resData = res.data as IResp<void>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve();
        } catch (error) {
            const errT = error as AxiosError;
            console.log(errT);
            if (!errT.response) return reject('Something wrong with server !');
            reject(errT.message);
        }
    });
};

export const handleGetDetailsPost = (
    id: string,
    signal: AbortSignal | undefined
) => {
    return new Promise<IDetailsPost>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${GET_DETAILS_POST}/${id}`,
                signal,
            });
            const resData = res.data as IResp<IDetailsPost>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            console.log(errT);
            if (!errT.response) return reject('Something wrong with server !');
            reject(errT.message);
        }
    });
};
