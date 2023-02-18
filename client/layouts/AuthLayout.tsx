import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PATH from '../constants/path';
import { RootState } from '../redux/store';
import getCurrentRoute from '../utils/helpers/getCurrentRoute';

interface IAuthLayout {
    children: React.ReactNode;
}

const routesAuth = [PATH.SYSTEM];

const AuthLayout = ({ children }: IAuthLayout) => {
    const router = useRouter();
    const token = useSelector<RootState>((state) => state.auth.token);

    const [prevRouter, setPrevRouter] = useState('');
    const isAuth = routesAuth.some((routes) =>
        getCurrentRoute(router).includes(routes)
    );
    const isEqualRouter = getCurrentRoute(router) === prevRouter;

    useEffect(() => {
        if (isAuth && !token) {
            router.push({
                pathname: PATH.LOGIN,
                query: { prevRoute: router.asPath },
            });
            return;
        }
        setPrevRouter(getCurrentRoute(router));
    }, [router]);

    if (isAuth && !isEqualRouter) return null;
    return <>{children}</>;
};

export default AuthLayout;
