import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import PATH from '../../constants/path';
import convertToSlug from '../../utils/helpers/convertToSlug';
import formatAmount from '../../utils/helpers/formatAmount';
import getCountyAndCity from '../../utils/helpers/getCountyAndCity';
import { IPostTitle } from '../../utils/interfaces/post.interface';
import Star from '../global/Star';

interface IPostItem {
    post: IPostTitle;
}

const PostItem = ({ post }: IPostItem) => {
    const images: [string] = post.images.images
        ? JSON.parse(post.images.images)
        : [];
    const address = getCountyAndCity(post.address);
    const price = formatAmount(post.attributes.price);

    return (
        <div className="bg-[#fff9f3] border-t-[1px] last:border-b-[1px] border-red-500 p-3 flex gap-3">
            <Link href={`${PATH.HOME}details/${convertToSlug(post.title)}/${post.id}`} className="relative shadow-sm flex-shrink-0 w-[280px]">
                <Image
                    src={
                        images[0] ||
                        'https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/07/09/z3546833179517-cc0773c8f9916f7c6fdb4913da056445-1_1657340240.jpg'
                    }
                    alt="Nhà Trọ"
                    fill
                    className='object-cover'
                    sizes='auto'
                />
                <div className="absolute bottom-0 left-0 w-full flex justify-between p-2">
                    <span className="bg-[rgba(0,0,0,.5)] px-2 rounded-sm text-white">
                        {images.length} ảnh
                    </span>
                    <FiHeart
                        size={26}
                        className="cursor-pointer hover:text-red-500 text-white"
                    />
                </div>
            </Link>
            <div className="overflow-hidden flex-1">
                <Link
                    href={`${PATH.HOME}details/${convertToSlug(post.title)}/${post.id}`}
                    className="mb-2 font-semibold uppercase line-clamp-2 text-red-600 hover:underline"
                >
                    <Star number={parseInt(post.star)} />
                    {post.title}
                </Link>
                <ul className="flex justify-between mb-2 gap-5">
                    <li className="font-bold text-green-500 whitespace-nowrap flex-shrink-0">
                        <p>{price}</p>
                    </li>
                    <li className="relative flex-shrink-0">
                        {post.attributes.acreage}m
                        <span className="text-xs absolute">2</span>
                    </li>
                    <li className="text-slate-600 line-clamp-1">{address}</li>
                </ul>
                <p className="line-clamp-3 text-sm text-slate-500">
                    {JSON.parse(post.description || '').join(' ')}
                </p>
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Image
                            src={
                                post.user.image ||
                                'https://phongtro123.com/images/default-user.png'
                            }
                            alt="avatar"
                            width={35}
                            height={35}
                            sizes="auto"
                            className="rounded-full object-cover"
                        />
                        <span className="line-clamp-1">{post.user.name}</span>
                    </div>
                    <p className="font-semibold text-slate-600 flex-shrink-0">
                        {post.attributes.published}
                    </p>
                </div>
                <div className="flex gap-2 mt-3">
                    <button className="flex-1 p-1 bg-primary rounded-sm text-white font-semibold">
                        Gọi {post.user.phone}
                    </button>
                    <button className="flex-1 p-1 rounded-sm bg-white text-primary border-primary border font-semibold hover:bg-primary transition-all hover:text-white">
                        Nhắn Zalo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
