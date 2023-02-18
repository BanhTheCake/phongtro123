import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiNotepad, BiMessageSquareDetail } from 'react-icons/bi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import PATH from '../../constants/path';
import { RootState } from '../../redux/store';
import getCurrentRoute from '../../utils/helpers/getCurrentRoute';
import logout from '../../utils/helpers/logout';
import Button from '../global/Button';

const subMenu = [
    {
        id: 1,
        name: 'Quản lý tin đăng',
        icon: <BiNotepad />,
        href: PATH.SYSTEM,
    },
    {
        id: 2,
        name: 'Đăng tin cho thuê',
        icon: <MdOutlineAddCircleOutline />,
        href: PATH.CREATE_NEW_POST,
    },
    {
        id: 3,
        name: 'Thông tin bản thân',
        icon: <AiOutlineUserAdd />,
        href: PATH.UPDATE_INFORMATION,
    },
    {
        id: 4,
        name: 'Liên hệ',
        icon: <BiMessageSquareDetail />,
        href: PATH.CONTACT,
    },
];

const SidebarSystem = () => {
    const user = useSelector<RootState>(
        (state) => state.auth.user
    ) as RootState['auth']['user'];

    const router = useRouter();
    const handleLogout = () => {
        logout(() => {
            router.push(PATH.HOME);
        });
    };

    return (
        <div className="w-[240px] flex-shrink-0 p-4 bg-[white] sticky top-[46px] h-[calc(100vh-46px)]">
            <Link href={PATH.HOME} className="flex item-center gap-2.5">
                <div className="w-[50px] h-[50px] relative rounded-full">
                    <Image
                        src={
                            user?.image ??
                            'https://phongtro123.com/images/default-user.png'
                        }
                        alt="Default"
                        fill
                        sizes="100vw"
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <p className="font-semibold text-lg">
                        {user?.name || 'BanhTheDefault'}
                    </p>
                    <p className="text-sm">{user?.phone || '...'}</p>
                </div>
            </Link>
            <div className="flex gap-2">
                <Button
                    href={PATH.CREATE_NEW_POST}
                    custom
                    customBg="#ffc107"
                    customText="black"
                    full
                    className="mt-6 py-1.5"
                >
                    Đăng tin
                </Button>
                <Button
                    primary
                    full
                    className="mt-6 py-1.5"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Button>
            </div>
            <ul className="w-full mt-4 space-y-1">
                {subMenu.map((item) => {
                    const isActive = getCurrentRoute(router) === item.href;
                    return (
                        <li key={item.id}>
                            <Button
                                place="start"
                                isUnderline={false}
                                full
                                icon={item.icon}
                                className={`hover:bg-[#f1f1f1] transition-all duration-100 ${isActive ? 'bg-[#f1f1f1]' : ''
                                    }`}
                                href={item.href}
                            >
                                {item.name}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SidebarSystem;
