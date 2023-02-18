import { handleRefreshToken } from '../axios/auth.axios';
import { store } from '../../redux/store';
import { setStateData } from '../../features/authSlice';

const refreshToken = async () => {
    try {
        const accessToken = await handleRefreshToken();
        if (!accessToken) {
            throw new Error('Something wrong with server !');
        }
        store.dispatch(setStateData({ token: accessToken }));
    } catch (error) {
        console.log('Error at refreshToken: ' + error);
        throw new Error(error as string);
    }
};

export default refreshToken;
