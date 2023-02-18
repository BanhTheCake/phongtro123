import { NextRouter } from 'next/router';

const getCurrentRoute = (router: NextRouter) => {
    return router.asPath.split('?')[0];
};

export default getCurrentRoute;
