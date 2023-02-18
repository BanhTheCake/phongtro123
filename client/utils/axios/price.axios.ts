import { IResp } from './../interfaces/interfaces';
import { GET_ALL_PRICES_URL } from './../../constants/api';
import axios, { AxiosError } from 'axios';
import { IPrices } from '../interfaces/price.interface';

export const getAllPrices = (signal: AbortSignal | undefined) => {
    return new Promise<[IPrices]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: GET_ALL_PRICES_URL,
                signal,
            });
            const resData = res.data as IResp<[IPrices]>;
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
