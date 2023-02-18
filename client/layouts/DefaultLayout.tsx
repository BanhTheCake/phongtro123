import React from 'react';
import Head from 'next/head';
import Contact from '../components/public/Contact';
import Header from '../components/public/Header';
import Intro from '../components/public/Intro';


interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
    return (
        <>
            <Head>
                <title>Phongtro123</title>
                <meta property="og:title" content="Home Page" key="title" />
            </Head>
            <div className="bg-background w-full pb-6">
                <Header />
                <div className="pt-[110px] w-[1260px] m-auto px-4">
                    {children}
                    <Intro />
                    <Contact />
                </div>
                <div id='portal'></div>
            </div>
        </>
    );
};

export default DefaultLayout;
