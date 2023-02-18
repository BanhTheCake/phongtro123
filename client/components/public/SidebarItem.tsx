import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import getCurrentRoute from '../../utils/helpers/getCurrentRoute';

interface IMenu {
    title: string;
    query?: Record<string, any>;
    href?: string;
}

interface ISidebarItem {
    number?: 1 | 2;
    data: IMenu[];
    title: string;
}

const path = ['/[category]'];

const SidebarItem = ({ number = 1, data, title }: ISidebarItem) => {
    const router = useRouter();
    return (
        <div className="bg-white rounded-md shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <ul
                className={`grid ${number === 2 ? 'grid-cols-2' : 'grid-cols-1'
                    }`}
            >
                {data &&
                    data.length &&
                    data.map((item) => {
                        const isAccept = path.some((route) =>
                            route.includes(router.pathname)
                        );
                        const href = item.href
                            ? { pathname: ['/', item.href].join('') }
                            : { pathname: isAccept ? getCurrentRoute(router) : '/', query: { ...item.query } };
                        return (
                            <li
                                key={item.title}
                                className="border-b last:border-b-0"
                            >
                                <div className="flex items-center gap-1">
                                    <MdOutlineNavigateNext
                                        className="flex-shrink-0 text-slate-400"
                                        size={20}
                                    />
                                    <Link
                                        href={href}
                                        className="flex-1 hover:text-red-500 transition-all py-1.5"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default SidebarItem;
