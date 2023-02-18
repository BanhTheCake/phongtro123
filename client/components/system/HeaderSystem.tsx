import Link from 'next/link';
import React from 'react';
import PATH from '../../constants/path';
import Navigate from '../public/Navigate';

const HeaderSystem = () => {
    return (
        <header className="bg-primary fixed top-0 left-0 right-0 flex z-50 flex">
            <div className="w-[1260px] m-auto bg-primary h-[46px] flex items-center px-4 flex-shrink-0">
                <h1 className="text-white font-bold w-[200px] flex-shrink-0 text-lg">
                    <Link href={PATH.HOME}>Phongtro123.com</Link>
                </h1>
                <Navigate />
            </div>
        </header>
    );
};

export default HeaderSystem;
