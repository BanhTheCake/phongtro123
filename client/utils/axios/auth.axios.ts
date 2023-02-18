import {
    REGISTER_URL,
    LOGOUT_URL,
    REFRESH_TOKEN,
    GET_ALL_AREAS_URL,
    CHANGE_PASS_URL,
} from './../../constants/api';
import { IResp } from './../interfaces/interfaces';
import axios, { AxiosError } from 'axios';
import { LOGIN_URL } from '../../constants/api';
import { ILogin } from '../interfaces/auth.interface';
import axiosPrivate from './custom/axiosPrivate';

export const handleLogin = (data: { phone: string; password: string }) => {
    return new Promise<ILogin>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Post',
                url: LOGIN_URL,
                data: data,
                withCredentials: true,
            });
            const resData = res.data as IResp<ILogin>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT?.response) {
                reject('Something wrong with server !');
            }
            reject(errT.message);
        }
    });
};

export const handleRegister = (data: {
    name: string;
    phone: string;
    password: string;
}) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Post',
                url: REGISTER_URL,
                data: data,
            });
            const resData = res.data as IResp<unknown>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.msg);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) return reject('Something wrong with server !');
            reject(errT.message);
        }
    });
};

export const handleLogout = (id: string) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: LOGOUT_URL,
                withCredentials: true,
                params: {
                    id,
                },
            });
            const resData = res.data as IResp<void>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve();
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server ! ' + errT);
            }
            reject(errT.message);
        }
    });
};

export const handleTestToken = () => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                url: 'http://localhost:3003/v1/api/auth',
                method: 'get',
            });
            const resData = res.data;
            resolve(resData as string);
        } catch (error) {
            const errT = error as AxiosError;
            reject(errT.message);
        }
    });
};

export const handleRefreshToken = () => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: REFRESH_TOKEN,
                withCredentials: true,
            });
            const resData = res.data as IResp<string>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server ! ' + errT);
            }
            reject(errT.message);
        }
    });
};

export const handleChangePassword = (data: {
    password: string;
    newPassword: string;
}) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'post',
                url: CHANGE_PASS_URL,
                data: data,
            });
            const resData = res.data as IResp<void>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server ! ' + errT);
            }
            reject(errT.message);
        }
    });
};
