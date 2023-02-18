import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../utils/interfaces/user.interface';
import { boolean } from 'yup';

export interface authSlice {
    user: IUser | null;
    token: string;
    isLogin: boolean;
}

const initialState: authSlice = {
    user: null,
    token: '',
    isLogin: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStateData: (state, action: PayloadAction<Partial<authSlice>>) => {
            return { ...state, ...action.payload };
        },
        setStateLogin: (state, action: PayloadAction<{ isLogin: boolean }>) => {
            state.isLogin = action.payload.isLogin;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setStateData, setStateLogin } = authSlice.actions;

export default authSlice.reducer;
