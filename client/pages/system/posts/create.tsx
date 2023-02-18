import React from 'react';
import SystemLayout from '../../../layouts/SystemLayout';
import Contact from '../../../components/public/Contact';
import HandlePost from '../../../components/system/HandlePost';
import Head from 'next/head';

const CreatePostPage = () => {
    return (
        <SystemLayout>
            <Head>
                <title>Tạo bài viết mới</title>
                <meta property="og:title" content="create new post" key="create new post" />
            </Head>
            <section className="p-4 w-full">
                <h1 className="text-3xl font-semibold py-3 border-b border-slate-300">
                    Đăng tin mới
                </h1>
                <HandlePost type='create' />
                <Contact />
            </section>
        </SystemLayout>
    );
};

export default CreatePostPage;
