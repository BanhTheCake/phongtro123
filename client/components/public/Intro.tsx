import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import PATH from '../../constants/path';
import { getAllSlugs } from '../../utils/axios/category.axios';
import Button from '../global/Button';
import Star from '../global/Star';

const text = {
    title: 'Tại sao lại chọn PhongTro123.com?',
    firstDescription:
        'Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: ',
    secondDescription:
        '...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn.',
    attr: [
        { value: '116.998+', name: 'Thành viên' },
        { value: '103.348+', name: 'Tin đăng' },
        { value: '300.000+', name: 'Lượt truy cập/tháng' },
        { value: '2.500.000+', name: 'Lượt xem/tháng' },
    ],
    subTitle: 'Chi phí thấp, hiệu quả tối đa',
    star: 5,
    comment:
        'Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài.',
    authorComment: 'Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)',
    ask: 'Bạn đang có phòng trọ / căn hộ cho thuê?',
    why: 'Không phải lo tìm người cho thuê, phòng trống kéo dài',
};

const Intro = () => {

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
        <div className="mt-6 bg-white shadow-md rounded-md p-10 text-center space-y-5">
            <h2 className="font-semibold text-lg">{text.title}</h2>
            <p className="text-sm ">
                <span>{text.firstDescription}</span>
                {dataSlugs && dataSlugs.length && dataSlugs.map((item) => {
                    return <span key={item.code}><Link href={item.slug} className='text-primary hover:text-secondary font-semibold'>{`${item.value}, `}</Link></span>
                })}
                <span>{text.secondDescription}</span>
            </p>
            <div className='flex justify-around gap-2'>
                {text.attr.map((item) => {
                    return (
                        <div key={item.name}>
                            <p className='font-bold text-xl'>{item.value}</p>
                            <p className='text-sm'>{item.name}</p>
                        </div>
                    );
                })}
            </div>
            <div className='space-y-2'>
                <h3 className='font-semibold text-lg'>{text.subTitle}</h3>
                <Star number={text.star} />
                <p className='text-base italic'>{`"${text.comment}"`}</p>
                <p className='text-sm'>{text.authorComment}</p>
            </div>
            <div className='flex flex-col items-center'>
                <p className='font-semibold text-xl'>{text.ask}</p>
                <p className='text-sm mt-2'>{text.why}</p>
                <Button href={PATH.CREATE_NEW_POST} primary className='px-6 my-4 font-semibold' >Đăng tin ngay</Button>
            </div>
        </div>
    );
};

export default Intro;
