import moment from 'moment';
import 'moment/locale/vi';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsTextareaResize } from 'react-icons/bs';
import { HiOutlineHashtag } from 'react-icons/hi';
import { IoFlagSharp, IoPricetagsOutline } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Button from '../../components/global/Button';
import Star from '../../components/global/Star';
import SwiperComponent from '../../components/global/Swiper';
import PostItem from '../../components/public/PostItem';
import Sidebar from '../../components/public/Sidebar';
import PATH from '../../constants/path';
import { LIMIT } from '../../constants/var';
import DefaultLayout from '../../layouts/DefaultLayout';
import { getAllAreas } from '../../utils/axios/area.axios';
import { getAllSlugs } from '../../utils/axios/category.axios';
import {
    getAllPostsPagination,
    handleGetDetailsPost
} from '../../utils/axios/post.axios';
import { getAllPrices } from '../../utils/axios/price.axios';
import formatAmount from '../../utils/helpers/formatAmount';
import formatDate from '../../utils/helpers/formatDate';
import { IDetailsPost } from '../../utils/interfaces/post.interface';

const DetailsPost = () => {
    const router = useRouter();
    const [title, postId] = (router.query['detailsPost'] as string[]) || [];

    const { data: post } = useQuery(
        ['Get Details Post', postId],
        ({ signal }) => handleGetDetailsPost(postId, signal),
        {
            onError: (err) => {
                console.log('err: ', err);
            },
            enabled: !!postId,
        }
    );

    const queries = useMemo(() => {
        if (!post) return undefined;
        return {
            category: post.category.slug || '',
            province: post.province.code || '',
        };
    }, [post]);
    const page = 1;

    const { data: postsRelated } = useQuery(
        ['Get All Posts', LIMIT, page, queries],
        ({ signal }) =>
            getAllPostsPagination({ limit: LIMIT, page, ...queries }, signal),
        {
            onError: (err) => {
                console.log('err: ', err);
            },
        }
    );

    const postsRelatedData = useMemo(() => {
        if (!postsRelated) return;
        return postsRelated.data;
    }, [postsRelated]);

    return (
        <DefaultLayout>
            <Head>
                <title>{post?.title || 'Phongtro123'}</title>
                <meta property="og:title" content="Home Page" key="title" />
            </Head>
            <section className="grid grid-cols-3 mt-6 gap-4">
                <div className="col-span-2">
                    <div className="bg-white rounded-md shadow-low pb-2">
                        {post && (
                            <>
                                <SwiperComponent
                                    images={JSON.parse(post.images.images)}
                                />
                                <div className="p-3 space-y-3">
                                    <h1 className="font-semibold capitalize line-clamp-2 text-red-600 hover:underline text-2xl ">
                                        <Star
                                            size={30}
                                            number={parseInt(post.star || '0')}
                                        />
                                        {post.title}
                                    </h1>
                                    <h3 className="flex gap-1.5">
                                        <span>Chuyên mục:</span>
                                        <Link
                                            className="font-semibold text-blue-500 underline"
                                            href={`/${post.category.slug}?province=${post.province.code}`}
                                        >
                                            {post.overview.area}
                                        </Link>
                                    </h3>
                                    <div className="flex gap-1 items-center">
                                        <MdLocationOn
                                            size={24}
                                            className={'text-blue-500'}
                                        />
                                        <span>
                                            Địa chỉ:{' '}
                                            {post.address.replace(
                                                'Địa chỉ: ',
                                                ''
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex gap-12">
                                        <p className="flex gap-2 items-center">
                                            <IoPricetagsOutline
                                                size={24}
                                                className={'text-slate-500'}
                                            />
                                            <span className="font-semibold text-green-600 text-xl">
                                                {formatAmount(
                                                    post.attributes.price
                                                )}
                                            </span>
                                        </p>
                                        <p className="flex gap-2 items-center">
                                            <BsTextareaResize
                                                size={24}
                                                className={'text-slate-500'}
                                            />
                                            <span>
                                                {post.attributes.acreage}m
                                                <sup>2</sup>
                                            </span>
                                        </p>
                                        <p className="flex gap-2 items-center">
                                            <AiOutlineClockCircle
                                                size={24}
                                                className={'text-slate-500'}
                                            />
                                            <span>
                                                {post.attributes.published ||
                                                    formatDate(post.createdAt)}
                                            </span>
                                        </p>
                                        <p className="flex gap-2 items-center">
                                            <HiOutlineHashtag
                                                size={24}
                                                className={'text-slate-500'}
                                            />
                                            <span>
                                                {post.attributes.hashtag}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-2xl font-semibold">
                                            Thông tin mô tả
                                        </h3>
                                        <p className="whitespace-pre-line leading-loose mt-2">
                                            {`${JSON.parse(
                                                post.description
                                            ).join('\n')}`}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold">
                                            Đặc điểm tin đăng
                                        </h3>
                                        <div className="mt-4">
                                            <div className="bg-slate-100 grid grid-cols-4 p-2 rounded-sm">
                                                <p className="col-span-1">
                                                    Mã tin:
                                                </p>
                                                <p className="col-span-3">
                                                    #{post.attributes.hashtag}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Khu vực
                                                </p>
                                                <p className="col-span-3">
                                                    {post.overview.area}
                                                </p>
                                            </div>
                                            <div className="bg-slate-100  grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Loại tin rao:
                                                </p>
                                                <p className="col-span-3">
                                                    {post.overview.type}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Đối tượng thuê:
                                                </p>
                                                <p className="col-span-3">
                                                    {post.overview.target}
                                                </p>
                                            </div>
                                            <div className="bg-slate-100  grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Ngày đăng:
                                                </p>
                                                <p className="col-span-3 capitalize">
                                                    {moment(
                                                        post.createdAt
                                                    ).format(
                                                        'dddd - DD/MM/YYYY'
                                                    )}
                                                </p>
                                            </div>
                                            <div className="bg-slate-100  grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Ngày hết hạn:
                                                </p>
                                                <p className="col-span-3 capitalize">
                                                    {moment(
                                                        post.overview.expire
                                                    ).format(
                                                        'dddd - DD/MM/YYYY'
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <h3 className="text-2xl font-semibold">
                                            Thông tin liên hệ
                                        </h3>
                                        <div className="mt-4">
                                            <div className="bg-slate-100 grid grid-cols-4 p-2 rounded-sm">
                                                <p className="col-span-1">
                                                    Liên hệ:
                                                </p>
                                                <p className="col-span-3">
                                                    {post.user.name}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Điện thoại:
                                                </p>
                                                <p className="col-span-3">
                                                    {post.user.phone}
                                                </p>
                                            </div>
                                            <div className="bg-slate-100  grid grid-cols-4 p-2">
                                                <p className="col-span-1">
                                                    Zalo
                                                </p>
                                                <p className="col-span-3">
                                                    {post.user.zalo || ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 pt-2">
                                        {`Bạn đang xem nội dung tin đăng: "${[
                                            post.overview.area,
                                            post.overview.code,
                                        ].join(
                                            ' - '
                                        )}". Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.`}
                                    </p>
                                    <Button
                                        href={PATH.CONTACT}
                                        className="border border-primary text-primary font-semibold w-fit"
                                        icon={<IoFlagSharp size={24} />}
                                    >
                                        Gửi phản hồi
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-6 bg-white rounded-md p-4 pb-8 shadow-low">
                        <h3 className="font-semibold text-2xl pb-2 border-b mb-3">
                            {post?.overview.area.split(',')[0]}
                        </h3>
                        <div className="">
                            {postsRelatedData &&
                                postsRelatedData.map((post) => {
                                    return (
                                        <PostItem key={post.id} post={post} />
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 flex-col-reverse h-fit">
                    <Sidebar />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default DetailsPost;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const [_, postId] = ctx.query['detailsPost'] as string[];
    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            ['Get Details Post', postId],
            ({ signal }) => handleGetDetailsPost(postId, signal)
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

    const data = queryClient.getQueryData([
        'Get Details Post',
        postId,
    ]) as IDetailsPost;

    const queries = data
        ? {
            category: data.category.slug,
            province: data.province.code,
        }
        : {};
    const page = 1;
    await queryClient.prefetchQuery(
        ['Get All Posts', LIMIT, page, queries],
        ({ signal }) =>
            getAllPostsPagination({ limit: LIMIT, page, ...queries }, signal)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
