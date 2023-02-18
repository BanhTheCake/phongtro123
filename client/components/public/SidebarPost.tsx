import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import 'moment/locale/vi'
import { INewPost } from "../../utils/interfaces/post.interface";
import PATH from "../../constants/path";
import formatAmount from "../../utils/helpers/formatAmount";
import formatDate from "../../utils/helpers/formatDate";
import convertToSlug from "../../utils/helpers/convertToSlug";
moment.locale('vi');

interface ISidebarPost {
    data: [INewPost] | undefined,
    title: string
}

const SidebarPost = ({ data, title }: ISidebarPost) => {
    return <div className="bg-white rounded-md shadow-md p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <ul>
            {data && data.length && data.map(item => {
                return <li key={item.id} className="border-b last:border-none">
                    <Link href={`${PATH.HOME}details/${convertToSlug(item.title)}/${item.id}`} className='flex gap-3 items-center group py-2'>
                        <div className="relative w-[65px] h-[65px] overflow-hidden rounded-md flex-shrink-0">
                            <Image src={JSON.parse(item.images.images)[0] || 'https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/10/29/45_1667017776.jpg'} alt='phong tro' fill sizes="auto" className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="line-clamp-2 text-primary font-semibold leading-snug mb-1.5 group-hover:underline">{item.title}</h4>
                            <div className="flex justify-between items-center flex-1">
                                <p className="font-semibold text-green-500">{formatAmount(item.attributes.price)}</p>
                                <p className="text-slate-500 text-sm font-semibold capitalize">{formatDate(item.createdAt)}</p>
                            </div>
                        </div>
                    </Link>
                </li >
            })}
        </ul>
    </div>;
};

export default SidebarPost;
