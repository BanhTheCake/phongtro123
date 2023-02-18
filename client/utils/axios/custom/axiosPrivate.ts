import axios, { AxiosError } from 'axios';
import { store } from '../../../redux/store';
import refreshToken from '../../helpers/refreshToken';

const axiosPrivate = axios.create({
    withCredentials: true,
});

axiosPrivate.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const errT = err as AxiosError;
        const previousReq = err.config;
        if (!errT.response) {
            return Promise.reject(err);
        }
        if (
            errT.response.status === 401 &&
            errT.response.statusText === 'Unauthorized' &&
            !previousReq.sent
        ) {
            await refreshToken();
            previousReq.headers = { ...previousReq.headers };
            previousReq.sent = true;
            return axiosPrivate(previousReq);
        }
        return Promise.reject(errT);
    }
);

export default axiosPrivate;
