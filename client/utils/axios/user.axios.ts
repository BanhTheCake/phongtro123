import { IUpdateUser, IUser } from './../interfaces/user.interface';
import { IResp } from './../interfaces/interfaces';
import { GET_CURRENT_USER_URL, UPDATE_DATA_USER } from './../../constants/api';
import { AxiosError } from 'axios';
import axiosPrivate from './custom/axiosPrivate';

export const getDataCurrentUser = (signal: AbortSignal | undefined) => {
    return new Promise<IUser>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'get',
                url: GET_CURRENT_USER_URL,
                signal,
            });
            const resData = res.data as IResp<IUser>;
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

export const updateDataUser = (data: Partial<IUpdateUser>) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const res = await axiosPrivate({
                method: 'Patch',
                url: UPDATE_DATA_USER,
                data: data,
            });
            const resData = res.data as IResp<void>;
            if (resData.errCode !== 0) {
                return reject(resData.msg);
            }
            resolve();
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) {
                return reject('Something wrong with server !');
            }
            reject(errT.message);
        }
    });
};
