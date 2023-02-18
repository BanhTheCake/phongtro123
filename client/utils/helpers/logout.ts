import { handleLogout } from './../axios/auth.axios';
import { setStateData } from '../../features/authSlice';
import { store } from '../../redux/store';
import Router from 'next/router';
import PATH from '../../constants/path';

interface ILogout {
    callback?: Function;
}

const logout = async (callback?: Function | undefined) => {
    try {
        const id = store.getState().auth.user?.id;
        store.dispatch(setStateData({ isLogin: false, token: '' }));
        if (callback) {
            callback();
        }
        if (!id) return;
        await handleLogout(id);
    } catch (error) {
        console.log('Logout err: ' + error);
    }
};

export default logout;
