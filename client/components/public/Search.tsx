import * as _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiBuildingHouse, BiSearchAlt } from 'react-icons/bi';
import { GrFormNext } from 'react-icons/gr';
import { IoPricetagsOutline } from 'react-icons/io5';
import { useQuery } from 'react-query';
import { getAllAreas } from '../../utils/axios/area.axios';
import { getAllSlugs } from '../../utils/axios/category.axios';
import { getAllPrices } from '../../utils/axios/price.axios';
import { getAllProvinces } from '../../utils/axios/province.axios';
import Modal from '../global/Modal';

import SearchItem from './SearchItem';
import SearchModal, { IItem } from './SearchModal';
import SearchModalSlider, { IItemSlider } from './SearchModalSlider';

interface Menu<T> {
    type: keyof typeof initData;
    data: T;
    search: 'normal' | 'slider';
    formatNumber?: number;
    prefix?: string;
}

const initData = {
    category: { code: '000', value: 'Phòng trọ, nhà trọ' },
    province: { code: '000', value: 'Toàn quốc' },
    price: { fromValue: null, toValue: null, value: '' },
    area: { fromValue: null, toValue: null, value: '' },
};

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [key, setKey] = useState('');

    const onOpen = (key: keyof typeof allValue, title: string) => {
        setIsOpen(true);
        setTitle(title);
        setKey(key);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const [allValue, setAllValue] = useState({
        category: initData['category'],
        province: initData['province'],
        price: initData['price'],
        area: initData['area'],
    });

    const handleChange = <T extends IItem | IItemSlider | undefined>(
        key: keyof typeof initData
    ) => {
        return (value: T) => {
            setAllValue((prev) => ({ ...prev, [key]: value }));
            setIsOpen(false);
        };
    };

    const handleReset = (key: keyof typeof initData) => {
        return () => {
            setAllValue((prev) => ({ ...prev, [key]: initData[key] }));
            setIsOpen(false);
        };
    };

    const { data: provinces } = useQuery(
        'Get All Provinces',
        ({ signal }) => getAllProvinces(signal),
        {
            onError: (err) => {
                console.log('err: ' + err);
            },
        }
    );

    const provincesMenu: Menu<IItem[]> | undefined = useMemo(() => {
        if (!provinces) return undefined;
        const newMenu: IItem[] = [initData['province'], ...provinces];
        return { type: 'province', data: newMenu, search: 'normal' };
    }, [provinces]);

    const { data: categories } = useQuery(
        'Get All Slugs',
        ({ signal }) => getAllSlugs(signal),
        {
            onError: (err) => {
                console.log('err: ' + err);
            },
        }
    );

    const categoriesMenu: Menu<IItem[]> | undefined = useMemo(() => {
        if (!categories) return undefined;
        const newMenu: IItem[] = [
            initData['category'],
            ...categories.map((category) => ({
                code: category.code,
                value: category.value,
            })),
        ];
        return { type: 'category', data: newMenu, search: 'normal' };
    }, [categories]);

    const { data: prices } = useQuery(
        'Get All Prices',
        ({ signal }) => getAllPrices(signal),
        {
            onError: (err) => {
                console.log('err: ' + err);
            },
        }
    );

    const pricesMenu: Menu<IItemSlider[]> | undefined = useMemo(() => {
        if (!prices) return undefined;
        const newMenu: IItemSlider[] = [
            ...prices.map((price) => ({
                fromValue: price.fromValue,
                toValue: price.toValue,
                value: price.value,
            })),
        ];
        return {
            type: 'price',
            data: newMenu,
            search: 'slider',
            formatNumber: 1_000_000,
            prefix: 'triệu',
        };
    }, [prices]);

    const { data: areas } = useQuery(
        'Get All Areas',
        ({ signal }) => getAllAreas(signal),
        {
            onError: (err) => {
                console.log('err: ' + err);
            },
        }
    );

    const areasMenu: Menu<IItemSlider[]> | undefined = useMemo(() => {
        if (!areas) return undefined;
        const newMenu: IItemSlider[] = [
            ...areas.map((price) => ({
                fromValue: price.fromValue,
                toValue: price.toValue,
                value: price.value,
            })),
        ];
        return {
            type: 'area',
            data: newMenu,
            search: 'slider',
            formatNumber: 1,
            prefix: 'm',
        };
    }, [areas]);

    const router = useRouter();
    useEffect(() => {
        const {
            category: slug,
            minArea,
            maxArea,
            minPrice,
            maxPrice,
            province,
        } = router.query;
        setAllValue(initData);

        if (slug && categories) {
            const currentCategory =
                categories.find((category) => category.slug === slug) ||
                initData['category'];
            handleChange('category')({
                code: currentCategory.code,
                value: currentCategory.value,
            });
        }

        if (areas && minArea) {
            const currentArea: IItemSlider = areas.find((area) => {
                return (
                    area.fromValue === Number(minArea) &&
                    area.toValue === (maxArea ? Number(maxArea) : null)
                );
            }) || {
                fromValue: Number(minArea),
                toValue: Number(maxArea),
                value: `Từ ${Number(minArea)} - ${Number(maxArea)} m`,
            };
            console.log({
                fromValue: Number(minArea),
                toValue: Number(maxArea),
                value: `Từ ${Number(minArea)} - ${Number(maxArea)} m`,
            });
            handleChange('area')(currentArea);
        }

        if (prices && minPrice) {
            const currentPrice: IItemSlider = prices.find((price) => {
                return (
                    price.fromValue === Number(minPrice) &&
                    price.toValue === (maxPrice ? Number(maxPrice) : null)
                );
            }) || {
                fromValue: Number(minPrice),
                toValue: Number(maxPrice),
                value: `Từ ${Number(minPrice) / 1_000_000} - ${
                    Number(maxPrice) / 1_000_000
                } triệu`,
            };
            handleChange('price')(currentPrice);
        }

        if (provinces && province) {
            const currentProvince =
                provinces.find((item) => {
                    return item.code === province;
                }) || initData['province'];
            handleChange('province')(currentProvince);
        }
    }, [router]);

    const handleSubmit = useCallback(() => {
        if (!areas || !provinces || !prices || !categories) return;
        const queryValue: Record<string, any> = {};

        // Duyệt tất cả các giá trị trong allValue và lấy ra những giá trị có giá trị khác falsy
        Object.keys(allValue).forEach((item) => {
            const inputValue = _.pickBy(
                allValue[item as keyof typeof allValue],
                _.identity
            );
            if (!_.isEmpty(inputValue)) {
                queryValue[item as keyof typeof allValue] = inputValue;
            }
        });

        const params: Record<string, any> = {};

        // lấy các giá trị thoả mãn để đưa vào params
        Object.keys(queryValue).forEach((item) => {
            if (['area', 'price'].includes(item)) {
                const capitalizeKey = item[0].toUpperCase() + item.slice(1); // ex: area => Area
                const min = 'min' + capitalizeKey;
                const max = 'max' + capitalizeKey;
                const { fromValue, toValue } = queryValue[item];
                params[min] = fromValue || 0;
                if (toValue) params[max] = toValue;
            }
            if (item === 'category' && queryValue[item].code !== '000') {
                const { code } = queryValue[item];
                // đối với category thì lấy ra slug để đưa vào params
                const currentCategory = categories.find(
                    (category) => category.code === code
                );
                if (currentCategory) {
                    params[item] = currentCategory.slug;
                }
            }
            if (item === 'province' && queryValue[item].code !== '000') {
                const { code } = queryValue[item];
                params[item] = code;
            }
        });

        // Định nghĩa options cho router
        let routerOptions: Record<string, any> = {
            pathname: '/',
            query: {
                ...params,
            },
        };

        if (params['category']) {
            const { category, ...query } = params;
            routerOptions = {
                pathname: `/${params.category}`,
                query: {
                    ...query,
                },
            };
        }
        router.push(routerOptions);
    }, [areas, provinces, prices, categories, allValue]);

    const handleChangeSlider = (key: keyof typeof initData) => {
        return ([min, max]: (number | null)[], value: string) => {
            handleChange(key)({ fromValue: min, toValue: max, value: value });
            setIsOpen(false);
        };
    };

    return (
        <div className="grid grid-cols-5 bg-[#febb02] p-2 rounded-[8px] mt-3 gap-2">
            <SearchItem
                iconLeft={<BiBuildingHouse />}
                iconRight={<GrFormNext />}
                title={allValue['category'].value}
                defaultText={''}
                onOpen={() => onOpen('category', 'Chọn thể loại')}
            />
            <SearchItem
                iconLeft={<BiBuildingHouse />}
                iconRight={<GrFormNext />}
                title={allValue['province'].value}
                defaultText={''}
                onOpen={() => onOpen('province', 'Chọn thành phố')}
            />
            <SearchItem
                iconLeft={<IoPricetagsOutline />}
                iconRight={<GrFormNext />}
                title={allValue['price'].value}
                defaultText={'Chọn giá'}
                onOpen={() => onOpen('price', 'Chọn giá')}
            />
            <SearchItem
                iconLeft={<IoPricetagsOutline />}
                iconRight={<GrFormNext />}
                title={allValue['area'].value}
                defaultText={'Chọn diện tích'}
                onOpen={() => onOpen('area', 'Chọn diện tích')}
            />
            <button
                className="w-full h-full p-1 px-2 bg-primary text-white rounded-[4px] flex items-center justify-center gap-1.5"
                onClick={handleSubmit}
            >
                <BiSearchAlt className="text-xl" />
                <span className="font-semibold">Tìm kiếm</span>
            </button>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={onClose} title={title}>
                    {[provincesMenu, categoriesMenu, pricesMenu, areasMenu].map(
                        (menu) => {
                            if (!menu || key !== menu.type) return null;
                            switch (menu.search) {
                                case 'normal':
                                    return (
                                        <SearchModal
                                            key={menu.type}
                                            onChange={handleChange(menu.type)}
                                            keyValue={menu.type}
                                            name={menu.type}
                                            value={allValue[menu.type] as IItem}
                                            menu={menu.data as IItem[]}
                                        />
                                    );
                                case 'slider':
                                    return (
                                        <SearchModalSlider
                                            key={menu.type}
                                            menu={menu.data as IItemSlider[]}
                                            data={
                                                allValue[
                                                    menu.type
                                                ] as IItemSlider
                                            }
                                            handleChangeValue={handleChangeSlider(
                                                menu.type
                                            )}
                                            formatNumber={
                                                menu.formatNumber as number
                                            }
                                            prefix={menu.prefix as string}
                                            handleReset={handleReset(menu.type)}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        }
                    )}
                </Modal>
            )}
        </div>
    );
};

export default Search;
