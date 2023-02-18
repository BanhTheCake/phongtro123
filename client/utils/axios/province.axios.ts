import {
    IGetTotalProvince,
    IGetCurrentDistrict,
} from './../interfaces/province.interface';
import {
    GET_ALL_PROVINCE_URL,
    GET_TOTAL_PROVINCE_URL,
    GET_CURRENT_DISTRICT_URL,
} from './../../constants/api';
import axios, { AxiosError } from 'axios';
import { IGetAllProvince } from '../interfaces/province.interface';
import { IResp } from '../interfaces/interfaces';
export const getAllProvinces = (signal: AbortSignal | undefined) => {
    return new Promise<[IGetAllProvince]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Get',
                url: GET_ALL_PROVINCE_URL,
            });
            const resData = res.data as IResp<[IGetAllProvince]>;
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

export const getTotalProvinces = (signal: AbortSignal | undefined) => {
    return new Promise<IGetTotalProvince[]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: GET_TOTAL_PROVINCE_URL,
                signal,
            });
            const resData = res.data as { results: IGetTotalProvince[] };
            resolve(resData.results);
        } catch (error) {
            const errT = error as AxiosError;
            reject(errT.message);
        }
    });
};

export const getCurrentDistrict = (
    signal: AbortSignal | undefined,
    id: string
) => {
    return new Promise<IGetCurrentDistrict[]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${GET_CURRENT_DISTRICT_URL}/${id}`,
                signal,
            });
            const resData = res.data as { results: IGetCurrentDistrict[] };
            resolve(resData.results);
        } catch (error) {
            const errT = error as AxiosError;
            reject(errT.message);
        }
    });
};
