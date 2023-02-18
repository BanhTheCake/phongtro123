import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import PATH from '../constants/path';
import { setStateData } from '../features/authSlice';
import { RootState } from '../redux/store';
import { getDataCurrentUser } from '../utils/axios/user.axios';
import logout from '../utils/helpers/logout';
import refreshToken from '../utils/helpers/refreshToken';

interface IAuthLayout {
    children: React.ReactNode;
}

const routesAuth = [PATH.SYSTEM];

const PersistLayout = ({ children }: IAuthLayout) => {
    const token = useSelector<RootState>((state) => state.auth.token)
    const user = useSelector<RootState>((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter();
    const dispatch = useDispatch();

    const isAuth = routesAuth.some((routes) =>
        router.pathname.includes(routes)
    );

    useQuery(
        'Get Current User',
        ({ signal }) => getDataCurrentUser(signal),
        {
            enabled: !user && !!token,
            retry: 0,
            onSuccess: (data) => {
                dispatch(setStateData({ user: data, isLogin: true }));
            },
            onError: (err) => {
                logout(() => {
                    router.push(PATH.LOGIN);
                });
            },
            onSettled: () => {
                setIsLoading(false)
            }
        }
    );

    useEffect(() => {
        const handleGetToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                setIsLoading(false)
            }
        };
        handleGetToken();
    }, []);

    if (isAuth && isLoading) return null
    return <>{children}</>;
};

export default PersistLayout;
