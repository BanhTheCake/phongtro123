import { IResp } from './../interfaces/interfaces';
import { IAreas } from './../interfaces/area.interface';
import { GET_ALL_AREAS_URL } from './../../constants/api';
import axios, { AxiosError } from 'axios';

export const getAllAreas = (signal: AbortSignal | undefined) => {
    return new Promise<[IAreas]>(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: GET_ALL_AREAS_URL,
                signal,
            });
            const resData = res.data as IResp<[IAreas]>;
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
