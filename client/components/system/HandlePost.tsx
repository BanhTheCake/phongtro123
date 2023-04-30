import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useUploadImage from '../../hooks/useUploadImage';
import { RootState } from '../../redux/store';
import { getAllSlugs } from '../../utils/axios/category.axios';
import {
    handleCreatePost,
    handleGetCurrentPost,
    handleUpdatePost,
} from '../../utils/axios/post.axios';
import {
    getCoordinates,
    getCurrentDistrict,
    getTotalProvinces,
} from '../../utils/axios/province.axios';
import getCityName from '../../utils/helpers/getCityName';
import { IGetCurrentPost } from '../../utils/interfaces/post.interface';
import {
    HandlePostSchema,
    IHandlePost,
} from '../../utils/validation/createPost.validation';
import Input from '../global/Input';
import InputFile from '../global/InputFile';
import InputSelect, { IInputSelectItem } from '../global/InputSelect';
import InputTextarea from '../global/InputTextarea';
import dynamic from 'next/dynamic';

interface IHandlePostProps {
    type: 'create' | 'update';
    callback?: () => any | undefined;
}

const initData: IHandlePost = {
    province: '',
    distinct: '',
    category: '',
    title: '',
    description: '',
    phone: '',
    username: '',
    area: '',
    price: '',
    gender: '',
    images: [],
};

const targetOptions = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
];

const rules = [
    'Nội dung phải viết bằng tiếng Việt có dấu',
    'Tiêu đề tin không dài quá 100 kí tự',
    'Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn',
    'Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.',
    'Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!',
];

const HandlePost = ({ type, callback = undefined }: IHandlePostProps) => {
    const router = useRouter();
    const Map = dynamic(() => import('../global/Map'), {
        ssr: false,
    });

    const { id: postId } = router.query;
    const isCreating = type === 'create';
    const isUpdating = type === 'update';

    const user = useSelector<RootState>(
        (state) => state.auth.user
    ) as RootState['auth']['user'];

    const [distinctLabelOfPost, setDistinctLabelOfPost] = useState('');
    const [dataUpdate, setDataUpdate] = useState<Partial<IHandlePost>>({});
    const [isResetData, setIsResetData] = useState(isUpdating);
    const [queryCoordinate, setQueryCoordinate] = useState('');

    const { control, handleSubmit, watch, resetField, reset, setValue } =
        useForm<IHandlePost>({
            resolver: yupResolver(HandlePostSchema),
            defaultValues: initData,
        });

    const provinceValue: string | undefined = watch('province');
    const distinctValue: string | undefined = watch('distinct');

    const isFirstUpdateData = provinceValue === dataUpdate.province;

    const { mutate: createPost, isLoading: isCreatingPost } = useMutation({
        mutationKey: 'Create New Post',
        mutationFn: handleCreatePost,
        onError: (err) => {
            console.log('err: ' + err);
            toast.error('Tạo mới thất bại ...');
        },
        onSuccess: () => {
            reset({});
            toast.success('Tạo bài viết mới thành công !');
        },
    });

    const { mutate: updatePost, isLoading: isUpdatingPost } = useMutation({
        mutationKey: 'Update Current Post',
        mutationFn: handleUpdatePost,
        onError: (err) => {
            console.log('err: ' + err);
            toast.error('Cập nhật thất bại ...');
        },
        onSuccess: () => {
            toast.success('Cập nhật thành công !');
            callback && callback();
        },
    });

    const { data: coordinates } = useQuery(
        ['Get Coordinates', queryCoordinate],
        ({ signal }) => getCoordinates(signal, queryCoordinate),
        {
            onError: (err) => {
                console.log('Err: ', err);
            },
            enabled: !!queryCoordinate,
            onSuccess(data) {
                console.log(data);
            },
        }
    );

    const { data: provinces } = useQuery(
        'Get Total Provinces',
        ({ signal }) => getTotalProvinces(signal),
        {
            onError: (err) => {
                console.log('Err: ', err);
            },
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const provincesOptions: IInputSelectItem[] | undefined = useMemo(() => {
        if (!provinces) return undefined;
        return provinces.map((province) => ({
            value: province.province_id,
            label: province.province_name,
        }));
    }, [provinces]);

    const { data: districts } = useQuery(
        ['Get Current District', provinceValue],
        ({ signal }) => getCurrentDistrict(signal, provinceValue),
        {
            enabled: !!provinceValue,
            onSuccess: () => {
                !isFirstUpdateData &&
                    resetField('distinct', { defaultValue: '' });
            },
            onError: (err) => {
                console.log('Err: ', err);
            },
        }
    );

    const districtOptions: IInputSelectItem[] | undefined = useMemo(() => {
        if (!districts) return undefined;
        return districts.map((item) => ({
            value: item.district_id,
            label: item.district_name,
        }));
    }, [districts]);

    const { data: dataSlugs } = useQuery(
        'Get All Slugs',
        ({ signal }) => getAllSlugs(signal),
        {
            onError: (error) => {
                console.log('error ' + error);
            },
        }
    );

    const slugsOptions: IInputSelectItem[] | undefined = useMemo(() => {
        if (!dataSlugs) return undefined;
        return dataSlugs.map((slug) => ({
            value: slug.code,
            label: slug.value,
        }));
    }, [dataSlugs]);

    const formatData = (data: IGetCurrentPost) => {
        if (!provincesOptions || !user) return;
        const {
            overview: { area, type, target },
            categoryCode,
            title,
            description,
            attributes: { acreage, price },
            images: { images },
        } = data;
        const [provinceLabel, distinctLabel] = area
            .replace(type, '')
            .split(', ')
            .map((item) => item.trim());

        const provinceCode =
            provincesOptions?.find(
                (province) => province.label === provinceLabel
            )?.value || '';

        setValue('province', provinceCode);
        setDistinctLabelOfPost(distinctLabel);

        setDataUpdate({
            province: provinceCode,
            category: categoryCode,
            title: title,
            description: (JSON.parse(description) as string[])?.join(' ') || '',
            area: acreage.toString(),
            price: price.toString(),
            gender: target,
            images: JSON.parse(images),
            username: user.name,
            phone: user.phone,
        });
    };

    const { isLoading: isGetUpdatePost } = useQuery(
        ['Get Current Post', postId],
        ({ signal }) => handleGetCurrentPost(postId as string, signal),
        {
            onSuccess: (data) => {
                formatData(data);
                setIsResetData(false);
            },
            onError: (err) => {
                console.log('err: ', err);
            },
            enabled: isUpdating && !!postId && !!provincesOptions && !!user,
        }
    );

    const addressText = [
        provinceValue &&
            provincesOptions &&
            provincesOptions.find(
                (province) => province.value === provinceValue
            )?.label,
        distinctValue &&
            districtOptions &&
            districtOptions.find((district) => district.value === distinctValue)
                ?.label,
    ]
        .filter((item) => item)
        .join(' - ');

    const [isUploading, handleUpload] = useUploadImage();
    const isCreateLoading = isUploading || isCreatingPost;
    const isUpdateLoading = isUploading || isUpdatingPost;

    const onSubmitCreate = useCallback(
        async (data: IHandlePost) => {
            if (
                isCreateLoading ||
                !provincesOptions ||
                !districtOptions ||
                !slugsOptions
            )
                return;
            const { images } = data;
            let imagesUrl: string[] = images as string[];
            if (typeof images[0] !== 'string') {
                imagesUrl = await handleUpload(images as File[]);
            }
            const provinceLabel =
                provincesOptions.find(
                    (province) => province.value === data.province
                )?.label || '';

            const districtLabel =
                districtOptions.find(
                    (district) => district.value === data.distinct
                )?.label || '';

            const address = [provinceLabel, districtLabel].join(', ');
            const categoryLabel = slugsOptions.find(
                (slug) => slug.value === data.category
            )?.label;
            const label = [categoryLabel, address].join(' ');

            const dataExclude = _.omit(data, ['username', 'phone']);

            const dataReq = {
                ...dataExclude,
                images: imagesUrl,
                address,
                label,
                type: categoryLabel,
                province: getCityName(provinceLabel),
                distinct: districtLabel,
            };
            createPost(dataReq);
        },
        [isCreateLoading, provincesOptions, districtOptions, slugsOptions]
    );

    const onSubmitUpdate = useCallback(
        async (data: IHandlePost) => {
            const isEqual = _.isEqual(data, dataUpdate);
            const isAllow =
                isEqual ||
                isUpdateLoading ||
                !postId ||
                !provincesOptions ||
                !districtOptions ||
                !slugsOptions;

            if (isAllow) return;

            // Pick out the difference between the new data and current post data
            const differenceValue = _.pickBy(
                data,
                (v, k) =>
                    !_.isEqual(dataUpdate[k as keyof typeof dataUpdate], v)
            );
            const { description, images, province, distinct, category } =
                differenceValue;
            const insertData: Record<string, any> = { ...differenceValue };

            if (description) {
                insertData.description = JSON.stringify([data.description]);
            }
            if (images) {
                insertData.images = JSON.stringify(
                    await handleUpload(data.images as File[])
                );
            }
            if (province || distinct || category) {
                const provinceLabel =
                    provincesOptions?.find(
                        (province) => province.value === data.province
                    )?.label || '';
                const districtLabel =
                    districtOptions?.find(
                        (district) => district.value === data.distinct
                    )?.label || '';
                insertData.address = [provinceLabel, districtLabel].join(', ');
                insertData.province = getCityName(provinceLabel);
                insertData.distinct = districtLabel;
                insertData.type = slugsOptions?.find(
                    (slug) => slug.value === data.category
                )?.label;
            }
            if (insertData?.type || insertData?.address) {
                insertData.label = [insertData.type, insertData.address].join(
                    ' '
                );
            }
            updatePost({ data: insertData, id: postId as string });
        },
        [
            dataUpdate,
            isUpdateLoading,
            postId,
            provincesOptions,
            districtOptions,
            slugsOptions,
        ]
    );

    useEffect(() => {
        if (
            !isUpdating ||
            !districtOptions ||
            !distinctLabelOfPost ||
            !isFirstUpdateData
        )
            return;
        const district = districtOptions.find(
            (item) => item.label === distinctLabelOfPost
        );
        const dataReset = {
            ...dataUpdate,
            distinct: district?.value as string,
        };
        reset(dataReset);
        setDataUpdate(dataReset);
    }, [districtOptions, distinctLabelOfPost]);

    useEffect(() => {
        if (!user) return;
        setValue('username', user.name);
        setValue('phone', user.phone);
    }, [user]);

    useEffect(() => {
        const provinceLabel = provincesOptions?.find(
            (item) => item.value === provinceValue
        )?.label;
        const districtLabel = districtOptions?.find(
            (item) => item.value === distinctValue
        )?.label;
        const cityLabelArr = [districtLabel, provinceLabel].filter(
            (item) => item
        );
        setQueryCoordinate(cityLabelArr.join(', '));
    }, [provinceValue, distinctValue]);

    if (isUpdating && (isResetData || isGetUpdatePost))
        return (
            <div className="grid grid-cols-3 mt-3 pb-3 gap-6 animate-pulse">
                <div className="col-span-2 space-y-8">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
                        <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 max-w-full mb-2.5"></div>
                    </div>
                    <div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
                        <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 max-w-full mb-2.5"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
                        <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 max-w-full mb-2.5"></div>
                    </div>
                    <div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-2.5"></div>
                        <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 max-w-full mb-2.5"></div>
                    </div>
                    <div className="h-40 bg-gray-200 rounded-md dark:bg-gray-700 mb-4 max-w-full"></div>
                </div>
                <div className="col-span-1">
                    <div className="h-80 bg-gray-200 rounded-md dark:bg-gray-700 mb-4 max-w-full"></div>
                </div>
            </div>
        );

    return (
        <>
            <div className="grid grid-cols-3 mt-3 pb-3 gap-6">
                <form
                    className="col-span-2 space-y-8"
                    onSubmit={handleSubmit(
                        type === 'create' ? onSubmitCreate : onSubmitUpdate
                    )}
                >
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-6">
                            Địa chỉ cho thuê
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <InputSelect
                                name="province"
                                control={control}
                                defaultValue={initData['province']}
                                placeholder={'-- Chọn Tỉnh/Thành phố --'}
                                text={'Tỉnh/Thành phố'}
                                options={provincesOptions}
                            />
                            <InputSelect
                                name="distinct"
                                control={control}
                                defaultValue={initData['distinct']}
                                placeholder={'-- Chọn Quận/Huyện --'}
                                text={'Quận/Huyện'}
                                options={districtOptions}
                            />
                        </div>
                        <div className="">
                            <label className="mb-1.5 font-semibold pl-1 flex">
                                Địa chỉ chính xác
                            </label>
                            <div className="w-full h-[38px] rounded-md bg-slate-200 flex items-center px-3">
                                {addressText}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-6">
                            Thông tin mô tả
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-1">
                                <InputSelect
                                    name="category"
                                    control={control}
                                    defaultValue={initData['category']}
                                    placeholder={'-- Chọn loại chuyên mục --'}
                                    text={'Loại chuyên mục'}
                                    options={slugsOptions}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    control={control}
                                    name="title"
                                    text="Tiêu đề"
                                    placeholder=""
                                    id="title"
                                    defaultValue={initData['title']}
                                    type={'text'}
                                    sizeInput="s"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputTextarea
                                    control={control}
                                    name="description"
                                    text="Nội dung"
                                    placeholder="Write your description here..."
                                    id="description"
                                    defaultValue={initData['description']}
                                    minRows={6}
                                    maxRows={12}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    control={control}
                                    name="username"
                                    text="Thông tin liên hệ"
                                    placeholder=""
                                    id="username"
                                    defaultValue={initData['username']}
                                    type={'text'}
                                    sizeInput="s"
                                    disabled
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    control={control}
                                    name="phone"
                                    text="Điện thoại"
                                    placeholder=""
                                    id="phone"
                                    defaultValue={initData['phone']}
                                    type={'text'}
                                    sizeInput="s"
                                    disabled
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    control={control}
                                    name="price"
                                    text="Giá cho thuê (đồng)"
                                    placeholder=""
                                    id="price"
                                    defaultValue={initData['price']}
                                    type={'text'}
                                    sizeInput="s"
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    control={control}
                                    name="area"
                                    text="Diện tích (m2)"
                                    placeholder=""
                                    id="area"
                                    defaultValue={initData['area']}
                                    type={'text'}
                                    sizeInput="s"
                                />
                            </div>
                            <div className="col-span-1">
                                <InputSelect
                                    name="gender"
                                    control={control}
                                    defaultValue={initData['gender']}
                                    placeholder={'-- Chọn đối tượng --'}
                                    text={'Đối tượng'}
                                    options={targetOptions}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Hình ảnh</h3>
                        <p>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
                        <div className="grid grid-cols-1">
                            <div className="col-span-2">
                                <InputFile
                                    name="images"
                                    control={control}
                                    text="Thêm ảnh"
                                    id="file"
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className={`w-full bg-green-600 text-white font-semibold p-2 rounded-sm ${
                            isCreateLoading || isUpdateLoading
                                ? 'opacity-80 cursor-not-allowed'
                                : ''
                        }`}
                    >
                        {isCreating ? (
                            <>{isCreateLoading ? 'Đang tạo ...' : 'Tiếp tục'}</>
                        ) : (
                            <>
                                {isUpdateLoading
                                    ? 'Đang cập nhật ...'
                                    : 'Chỉnh sửa'}
                            </>
                        )}
                    </button>
                </form>
                <div className="col-span-1">
                    {coordinates && (
                        <div className="w-full h-[300px] overflow-hidden mb-4 rounded-sm">
                            <Map
                                position={[
                                    coordinates[0]?.latitude || 0,
                                    coordinates[0]?.longitude || 0,
                                ]}
                            />
                        </div>
                    )}
                    <div className="bg-[#fff3cd] border border-[#ffeeba] text-[#856404] shadow-low rounded-md p-4 ">
                        <h4 className="text-xl font-semibold pb-2">
                            Lưu ý khi đăng tin
                        </h4>
                        <ul className="list-disc pl-4 space-y-1.5 text-sm">
                            {rules.map((rule, index) => {
                                return <li key={index + rule}>{rule}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HandlePost;
