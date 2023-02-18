import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { useForm } from 'react-hook-form';
import Input from '../components/global/Input';
import InputTextarea from '../components/global/InputTextarea';
import Button from '../components/global/Button';
import { contactSchema, IContactSchema } from '../utils/validation/contact.validation';
import Head from 'next/head';
import PATH from '../constants/path';

const ContactPage = () => {
    const { control, handleSubmit, reset } = useForm<IContactSchema>({
        resolver: yupResolver(contactSchema),
    });

    const onSubmit = (data: IContactSchema) => {
        console.log('data: ', data);
        reset({})
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Liên hệ</title>
                <meta property="og:title" content="contact" key="contact" />
            </Head>
            <section className="mt-4">
                <h1 className="text-3xl font-semibold">
                    Liên hệ với chúng tôi
                </h1>
                <div className="mt-4 grid grid-cols-2 gap-6">
                    <div className="col-span-1 bg-gradient-to-tr from-cyan-500 to-blue-500 p-6 rounded-2xl text-white text-lg space-y-2.5 h-fit">
                        <p className="text-xl font-semibold">
                            Thông tin liên hệ
                        </p>
                        <p>
                            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng
                            cảm ơn vì đã lựa chọn PhongTro123.Com
                        </p>
                        <p>
                            <span className="font-semibold mr-1.5">
                                Điện thoại :
                            </span>
                            <span>0917 686 101</span>
                        </p>
                        <p>
                            <span className="font-semibold mr-1.5">
                                Email :
                            </span>
                            <span>banhTheCake@gmail.com</span>
                        </p>
                        <p>
                            <span className="font-semibold mr-1.5">Zalo :</span>
                            <span>0917 686 101</span>
                        </p>
                        <p>
                            <span className="font-semibold mr-1.5">
                                Viber :
                            </span>
                            <span>0917 686 101</span>
                        </p>
                        <p>
                            <span className="font-semibold mr-1.5">
                                Địa chỉ :
                            </span>
                            <span>
                                LD-06.04, Toà nhà Lexington Residence, Số 67 Mai
                                Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
                            </span>
                        </p>
                    </div>
                    <form className="col-span-1 bg-white p-6 rounded-md shadow-low" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className='text-2xl font-semibold mb-3'>Liên hệ trực tuyến</h3>
                        <Input
                            control={control}
                            name={'name'}
                            defaultValue={''}
                            id={'name'}
                            placeholder={''}
                            text={'Họ tên của bạn'}
                            type={'text'}
                            sizeInput={'s'}
                        />
                        <Input
                            control={control}
                            name={'phone'}
                            defaultValue={''}
                            id={'phone'}
                            placeholder={''}
                            text={'Số điện thoại'}
                            type={'text'}
                            sizeInput={'s'}
                        />
                        <InputTextarea
                            control={control}
                            defaultValue={''}
                            id={'text'}
                            minRows={6}
                            maxRows={10}
                            name={'text'}
                            placeholder={''}
                            text={'Nội dung'}
                        />
                        <Button
                            href={PATH.CONTACT}
                            secondary
                            full
                            isUnderline={false}
                            className={
                                'font-semibold hover:bg-blue-700 transition-all'
                            }
                        >
                            Liên hệ
                        </Button>
                    </form>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default ContactPage;
