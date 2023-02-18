import type { GetServerSideProps, NextPage } from 'next';
import DefaultLayout from '../layouts/DefaultLayout';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getAllPostsPagination } from '../utils/axios/post.axios';
import { LIMIT } from '../constants/var';
import { getAllSlugs } from '../utils/axios/category.axios';
import { getAllPrices } from '../utils/axios/price.axios';
import { getAllAreas } from '../utils/axios/area.axios';
import Search from '../components/public/Search';
import PageHeader from '../components/public/PageHeader';
import Posts from '../components/public/Posts';
import Sidebar from '../components/public/Sidebar';

const Home: NextPage = () => {
    return (
        <DefaultLayout>
            <div className="">
                <Search />
                <PageHeader />
                <div className="grid grid-cols-6 gap-3 mt-6">
                    <div className="col-span-4 bg-white rounded-md shadow-md">
                        <Posts />
                    </div>
                    <div className="col-span-2 flex flex-col gap-4">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { page: _, ...queries } = ctx.query;
    const page = ctx.query.page || 1;
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            ['Get All Posts', LIMIT, page, queries],
            ({ signal }) =>
                getAllPostsPagination(
                    { limit: LIMIT, page: page as string | number, ...queries },
                    signal
                )
        ),
        queryClient.prefetchQuery('Get All Slugs', ({ signal }) =>
            getAllSlugs(signal)
        ),
        queryClient.prefetchQuery('Get All Prices', ({ signal }) =>
            getAllPrices(signal)
        ),
        queryClient.prefetchQuery('Get All Areas', ({ signal }) =>
            getAllAreas(signal)
        ),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
