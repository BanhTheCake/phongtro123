import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineHeart, AiOutlineUserAdd } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { IoIosLogIn } from 'react-icons/io';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { RiMenuAddFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PATH from '../../constants/path';
import { setStateData } from '../../features/authSlice';
import { RootState } from '../../redux/store';
import { getDataCurrentUser } from '../../utils/axios/user.axios';
import logout from '../../utils/helpers/logout';
import Logo from '../../assets/img/logo-phongtro.svg';
import Button from '../global/Button';
import Navigate from './Navigate';

const subMenu = [
    {
        id: 1,
        name: 'Đăng tin cho thuê',
        icon: <MdOutlineAddCircleOutline />,
        href: PATH.CREATE_NEW_POST,
    },
    {
        id: 2,
        name: 'Quản lý tin đăng',
        icon: <BiNotepad />,
        href: PATH.SYSTEM,
    },
    {
        id: 3,
        name: 'Thông tin bản thân',
        icon: <AiOutlineUserAdd />,
        href: PATH.UPDATE_INFORMATION,
    },
];

const Header = () => {
    const { isLogin, user } = useSelector<RootState>(
        (state) => state.auth
    ) as RootState['auth'];

    const dispatch = useDispatch();
    const router = useRouter();

    const { isLoading } = useQuery(
        'Get Current User',
        ({ signal }) => getDataCurrentUser(signal),
        {
            enabled: isLogin && !user,
            retry: 0,
            onSuccess: (data) => {
                dispatch(setStateData({ user: data }));
            },
            onError: (err) => {
                logout(() => {
                    router.push(PATH.LOGIN);
                });
                toast.error(err as string);
            },
        }
    );

    return (
        <header className="fixed top-0 w-full z-40">
            <div className="flex justify-between p-4 py-3 bg-background w-[1280px] m-auto h-[70px]">
                <Link className="flex" href={PATH.HOME}>
                    <div className="h-[50px] object-contain flex -ml-3">
                        <Logo className="h-full" />
                    </div>
                </Link>
                {!isLoading && isLogin && user ? (
                    <ul className="flex items-center space-x-3">
                        <li>
                            <Link
                                href={PATH.SYSTEM}
                                className="flex items-center gap-3"
                            >
                                <div className="w-[40px] h-[40px] overflow-hidden rounded-full relative">
                                    <Image
                                        src={
                                            user?.image ??
                                            'https://phongtro123.com/images/default-user.png'
                                        }
                                        alt="Avatar"
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm max-w-[160px] line-clamp-1">
                                        Mã tài khoản: {user.id}
                                    </p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Button icon={<AiOutlineHeart />} href={PATH.HOME}>
                                Yêu thích
                            </Button>
                        </li>
                        <li>
                            <Tippy
                                trigger="click"
                                hideOnClick={true}
                                interactive={true}
                                offset={[0, 5]}
                                render={(attrs) => (
                                    <ul
                                        className="p-3 bg-white shadow-low rounded-md min-w-[180px]"
                                        tabIndex={-1}
                                        {...attrs}
                                    >
                                        {subMenu.map((item) => {
                                            return (
                                                <li key={item.id}>
                                                    <Button
                                                        className="py-1.5 text-primary hover:text-secondary transition-all cursor-pointer"
                                                        icon={item.icon}
                                                        href={item.href}
                                                        place={'start'}
                                                        full
                                                        isUnderline={false}
                                                    >
                                                        {item.name}
                                                    </Button>
                                                </li>
                                            );
                                        })}
                                        <li>
                                            <Button
                                                className="py-1.5 text-primary hover:text-secondary transition-all cursor-pointer w-full !justify-start"
                                                icon={<IoIosLogIn />}
                                                isUnderline={false}
                                                onClick={() =>
                                                    logout(() => {
                                                        router.push(PATH.LOGIN);
                                                    })
                                                }
                                            >
                                                Đăng xuất
                                            </Button>
                                        </li>
                                    </ul>
                                )}
                            >
                                <div>
                                    <Button icon={<RiMenuAddFill />}>
                                        Quản lý tài khoản
                                    </Button>
                                </div>
                            </Tippy>
                        </li>
                        <li>
                            <Button
                                icon={<MdOutlineAddCircleOutline />}
                                primary
                                href={PATH.CREATE_NEW_POST}
                            >
                                Đăng tin mới
                            </Button>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex items-center space-x-3">
                        <li>
                            <Button icon={<AiOutlineHeart />} href={PATH.HOME}>
                                Yêu thích
                            </Button>
                        </li>
                        <li>
                            <Button
                                icon={<AiOutlineUserAdd />}
                                href={PATH.LOGIN}
                            >
                                Đăng nhập
                            </Button>
                        </li>
                        <li>
                            <Button icon={<IoIosLogIn />} href={PATH.REGISTER}>
                                Đăng ký
                            </Button>
                        </li>
                        <li>
                            <Button
                                icon={<MdOutlineAddCircleOutline />}
                                primary
                                href={PATH.CREATE_NEW_POST}
                            >
                                Đăng tin mới
                            </Button>
                        </li>
                    </ul>
                )}
            </div>
            <div className="h-[40px] bg-primary">
                <div className="h-full w-[1280px] m-auto">
                    <Navigate />
                </div>
            </div>
        </header>
    );
};

export default Header;
