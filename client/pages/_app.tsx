import type { AppProps } from 'next/app';
import {
    QueryClient,
    QueryClientProvider,
    setLogger,
    Hydrate,
} from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '../redux/store';
import '../styles/globals.css';

import NextNProgress from 'nextjs-progressbar';
import AuthLayout from '../layouts/AuthLayout';
import PersistLayout from '../layouts/PersistLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
        },
    },
});

setLogger({
    error: (error) => { },
    log: (message) => { },
    warn: (message) => { },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <NextNProgress
                        showOnShallow={false}
                        options={{ showSpinner: false }}
                    />
                    <PersistLayout>
                        <AuthLayout>
                            <Component {...pageProps} />
                        </AuthLayout>
                    </PersistLayout>
                    <ToastContainer />
                </Provider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
