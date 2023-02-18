import axios, { AxiosError } from 'axios';
import { GET_SLUGS_URL } from '../../constants/api';
import { ISlug } from '../interfaces/category.interface';
import { IResp } from '../interfaces/interfaces';

export const getAllSlugs = (signal: AbortSignal | undefined) => {
    return new Promise<[ISlug]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'Get',
                url: GET_SLUGS_URL,
                signal,
            });
            const resData = res.data as IResp<[ISlug]>;
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
