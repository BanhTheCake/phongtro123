import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import PATH from '../../constants/path';
import { getAllSlugs } from '../../utils/axios/category.axios';
import getCurrentRoute from '../../utils/helpers/getCurrentRoute';

const Navigate = () => {
    const router = useRouter();
    const { data: dataSlugs } = useQuery(
        'Get All Slugs',
        ({ signal }) => getAllSlugs(signal),
        {
            onError: (error) => {
                console.log('error ' + error);
            },
        }
    );

    return (
        <ul className="h-full flex px-4">
            <li className="h-full">
                <Link
                    className={`flex items-center text-white font-semibold text-sm h-full px-3 hover:bg-secondary ${router.pathname === PATH.HOME ? 'bg-secondary' : ''
                        }`}
                    href={PATH.HOME}
                >
                    Trang chủ
                </Link>
            </li>
            {dataSlugs &&
                dataSlugs.map((item) => {
                    const isActive =
                        getCurrentRoute(router) === `/${item.slug}`;
                    return (
                        <li className="h-full" key={item.id}>
                            <Link
                                className={`flex items-center text-white font-semibold text-sm h-full px-3 hover:bg-secondary ${isActive ? 'bg-secondary' : ''
                                    }`}
                                href={`/${item.slug}`}
                            >
                                {item.value}
                            </Link>
                        </li>
                    );
                })}
            <li className="h-full">
                <Link
                    className={`flex items-center text-white font-semibold text-sm h-full px-3 hover:bg-secondary ${router.pathname === PATH.CONTACT ? 'bg-secondary' : ''
                        }`}
                    href={PATH.CONTACT}
                >
                    Liên hệ
                </Link>
            </li>
        </ul>
    );
};

export default Navigate;
