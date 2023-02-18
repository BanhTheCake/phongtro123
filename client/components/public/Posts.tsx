import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { LIMIT } from '../../constants/var';
import { getAllPostsPagination } from '../../utils/axios/post.axios';
import Pagination from '../global/Pagination';
import PostItem from './PostItem';

const Posts = () => {
    const router = useRouter();
    const { page: _, ...queries } = router.query;
    const page = router.query.page || 1;
    const { data: dataPagination } = useQuery(
        ['Get All Posts', LIMIT, page, queries],
        ({ signal }) =>
            getAllPostsPagination(
                { limit: LIMIT, page: page as string | number, ...queries },
                signal
            ),
        {
            onError: (err) => {
                console.log('err ' + err);
            },
        }
    );

    const posts = useMemo(() => {
        return dataPagination?.data;
    }, [dataPagination]);

    const pagination = useMemo(() => {
        return dataPagination?.pagination;
    }, [dataPagination]);

    return (
        <div className="w-full">
            <div className="p-4">
                <h3 className="font-semibold text-2xl mb-2">
                    Danh sách tin đăng
                </h3>
                <div className="flex items-center">
                    <span>Sắp xếp : </span>
                    <ul className="ml-2 flex gap-2">
                        <li>
                            <Link
                                href={{
                                    pathname: router.pathname,
                                    query: {
                                        ...router.query,
                                        order: 'star',
                                    },
                                }}
                                className={`flex px-2 py-1 bg-slate-100 rounded-sm hover:bg-blue-100 transition-all  ${['star', undefined].some(
                                    (query) => query === router.query?.order
                                )
                                        ? 'font-semibold underline'
                                        : ''
                                    }`}
                            >
                                Mặc định
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: router.pathname,
                                    query: {
                                        ...router.query,
                                        order: 'createdAt',
                                    },
                                }}
                                className={`flex px-2 py-1 bg-slate-100 rounded-sm hover:bg-blue-100 transition-all ${router.query?.order === 'createdAt'
                                        ? 'font-semibold underline'
                                        : ''
                                    }`}
                            >
                                Mới Nhất
                            </Link>
                        </li>
                        <li>
                            <button className="px-2 py-1 bg-slate-100 rounded-sm hover:bg-blue-100 transition-all">
                                BanhTheCake
                            </button>
                        </li>
                    </ul>
                </div>
                {posts && posts.length >= 1 ? (
                    <>
                        <div className="mt-3">
                            {posts &&
                                posts.map((post) => {
                                    return (
                                        <PostItem key={post.id} post={post} />
                                    );
                                })}
                        </div>
                        {pagination && (
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    display={2}
                                    pagination={pagination}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center text-2xl font-semibold text-slate-500 mt-6 p-3">
                        Không có dữ liệu
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
