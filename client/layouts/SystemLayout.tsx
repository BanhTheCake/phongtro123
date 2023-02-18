import Head from "next/head";
import React from "react";
import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";

interface ISystemLayout {
    children: React.ReactNode,
}

const SystemLayout = ({ children }: ISystemLayout) => {
    return (
        <>
            <Head>
                <title>Phongtro123 - system</title>
                <meta property="og:title" content="Home Page" key="title" />
            </Head>
            <div className="bg-background w-full min-h-screen flex flex-col relative">
                <HeaderSystem />
                <div className="pt-[46px] w-[1260px] mx-auto flex flex-1">
                    <SidebarSystem />
                    <div className="p-3 px-4 w-full">
                        {children}
                    </div>
                </div>
                <div id='portal'></div>
            </div>
        </>
    );
};


export default SystemLayout;
