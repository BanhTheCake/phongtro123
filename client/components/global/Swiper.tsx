import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import _ from 'lodash';

interface ISwiperProps {
    images: string[];
}

const SwiperComponent = ({ images }: ISwiperProps) => {

    const [prevImages, setPrevImages] = useState(images)
    const isEqual = useMemo(() => {
        return _.isEqual(prevImages, images)
    }, [images, prevImages])

    useEffect(() => {
        if (!isEqual) {
            setPrevImages(images)
        }
    }, [images, prevImages])


    const nextRef = useRef(null);
    const prevRef = useRef(null);
    return (
        <>
            <div className="w-full h-[300px] relative rounded-t-md overflow-hidden bg-black">
                {isEqual && images &&
                    images.length > 0 &&
                    <Swiper
                        className="h-full"
                        slidesPerView={1}
                        loop
                        navigation={{
                            prevEl: prevRef?.current,
                            nextEl: nextRef?.current,
                        }}
                        pagination={{
                            type: 'fraction',
                            bulletClass: 'bg-red',
                        }}
                        modules={[Navigation, Pagination]}
                    >
                        {images.map((image, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="relative m-auto h-full">
                                        <Image
                                            src={image}
                                            alt={''}
                                            fill
                                            sizes="100vw"
                                            className="object-contain"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                }
                <button
                    ref={prevRef}
                    className={
                        'absolute top-[50%] z-10 translate-y-[-50%] left-4 bg-opacity-80 bg-white flex p-2 rounded-full'
                    }
                >
                    <GrFormPrevious size={30} />
                </button>
                <button
                    ref={nextRef}
                    className={
                        'absolute top-[50%] z-10 translate-y-[-50%] right-4 bg-opacity-80 bg-white flex p-2 rounded-full'
                    }
                >
                    <GrFormNext size={30} />
                </button>
            </div>
        </>
    );
};

export default SwiperComponent;
