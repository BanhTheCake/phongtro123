import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HCM from '../../assets/img/location_hcm.jpg';
import HN from '../../assets/img/location_hn.jpg';
import DN from '../../assets/img/location_dn.jpg';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { getAllSlugs } from '../../utils/axios/category.axios';
import { getAllProvinces } from '../../utils/axios/province.axios';
import formatValue from '../../utils/helpers/formatValue';
import Link from 'next/link';
import getCurrentRoute from '../../utils/helpers/getCurrentRoute';

const menu = [
    { image: HCM, name: 'Phòng trọ Hồ Chí Minh', code: 'OODF' },
    { image: HN, name: 'Phòng trọ Hà Nội', code: 'AO0X' },
    { image: DN, name: 'Phòng trọ Đà Nẵng', code: 'IFH8' },
];

const initTitle = 'Kênh thông tin Phòng Trọ số 1 Việt Nam';
const initCategory = 'Cho thuê tất cả';
const prefix = 'Tiện nghi - Mới nhất 2023';

const PageHeader = () => {
    const router = useRouter();
    const [title, setTitle] = useState(initTitle);

    const { data: categories } = useQuery(
        'Get All Slugs',
        ({ signal }) => getAllSlugs(signal),
        {
            onError: (err) => {
                console.log('err: ' + err);
            },
        }
    );

    const { data: provinces } = useQuery(
        'Get All Provinces',
        ({ signal }) => getAllProvinces(signal),
        {
            onError: (err) => {
                console.log('err: ' + err);
            },
        }
    );

    useEffect(() => {
        const queries = router.query;
        const keyQueries = Object.keys(queries);

        const isAllow = !categories || !provinces || !keyQueries.some((key) => ['category', 'province', 'minArea', 'minPrice'].includes(key))
        if (isAllow) {
            setTitle(initTitle)
            return
        }

        let value: Record<string, string> = {};
        keyQueries.forEach((key) => {
            switch (key) {
                case 'category':
                    const categoryValue = categories.find((category) => category.slug === queries.category)?.value;
                    if (categoryValue) value[key] = categoryValue;
                    break;
                case 'province':
                    const provinceValue = provinces.find((province) => province.code === queries.province)?.value;
                    if (provinceValue) value[key] = provinceValue;
                    break;
                case 'minPrice':
                    const minPrice = Number(queries.minPrice);
                    const maxPrice = queries.maxPrice ? Number(queries.maxPrice) : null;
                    let priceText = '';
                    if (maxPrice === null) {
                        priceText = `Giá trên ${formatValue(minPrice, 1_000_000)} triệu`
                    }
                    if (minPrice === 0 && maxPrice !== null) {
                        priceText = `Giá dưới ${formatValue(maxPrice, 1_000_000)} triệu`;
                    }
                    if (maxPrice !== null && minPrice !== 0) {
                        priceText = `Giá từ ${formatValue(minPrice, 1_000_000)} - ${formatValue(maxPrice, 1_000_000)} triệu`;
                    }
                    value['price'] = priceText;
                    break;
                case 'minArea':
                    const minArea = Number(queries.minArea);
                    const maxArea = queries.maxArea ? Number(queries.maxArea) : null;
                    let areaText = ``;
                    if (maxArea === null) {
                        areaText = `Diện tích trên ${formatValue(minArea, 1)} m2`;
                    }
                    if (minArea === 0 && maxArea !== null) {
                        areaText = `Diện tích dưới ${formatValue(maxArea, 1)} m2`;
                    }
                    if (maxArea !== null && minArea !== 0) {
                        areaText = `Diện tích từ ${formatValue(minArea, 1)} - ${formatValue(maxArea, 1)} m2`;
                    }
                    value['area'] = areaText;
                    break;
            }
        });

        const arrText = ['category', 'province', 'price', 'area'].map(attr => {
            if (attr === 'category') {
                return value[attr] ? value[attr] : initCategory
            }
            return value[attr]
        }).filter(attr => attr)
        if (arrText.length <= 2) arrText.push(prefix)

        setTitle(arrText.join(' - '))
    }, [router, categories, provinces]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content="Home Page" key="title" />
            </Head>
            <div className="mt-3">
                <h1 className="font-semibold text-3xl mb-1">{title}</h1>
                <p className="text-slate-500">
                    Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho
                    thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả
                    với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.
                </p>
                <div className="flex items-center justify-center gap-6 mt-6">
                    {menu &&
                        menu.map((item) => {
                            return (
                                <Link
                                    href={{
                                        pathname: getCurrentRoute(router),
                                        query: { province: item.code }
                                    }}
                                    key={item.name}
                                    className="w-[190px] rounded-md bg-white shadow-md group hover:shadow-lg transition-all"
                                >
                                    <Image
                                        className="object-cover w-full h-[110px] rounded-tl-md rounded-tr-md"
                                        src={item.image}
                                        alt={'Hồ Chí Minh'}
                                        sizes="100vw"
                                    />
                                    <p className="p-3 text-center font-semibold text-sm text-primary group-hover:text-secondary">
                                        {item.name}
                                    </p>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default PageHeader;
