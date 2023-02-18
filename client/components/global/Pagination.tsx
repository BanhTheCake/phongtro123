import Link from 'next/link';
import { useRouter } from 'next/router';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import maxNumber from '../../utils/helpers/maxNumber';
import minNumber from '../../utils/helpers/minNumber';
import { IPagination } from '../../utils/interfaces/interfaces';

const Pagination = ({
    pagination,
    display,
}: {
    pagination: IPagination;
    display: number;
}) => {
    const router = useRouter();

    let first = maxNumber(pagination.currentPage - display, 1);
    let last = minNumber(
        pagination.currentPage + display,
        pagination.totalPage
    );

    if (pagination.currentPage === 1) {
        last = minNumber(
            pagination.currentPage + display + 1,
            pagination.totalPage
        );
    }

    if (pagination.currentPage === pagination.totalPage) {
        first = maxNumber(pagination.currentPage - display - 1, 1);
    }

    return (
        <>
            <ul className="flex -space-x-px w-fit">
                <li className="flex">
                    {pagination.isPrevPage ? (
                        <Link
                            href={{
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    page: pagination.prevPage,
                                },
                            }}
                            className="flex items-center justify-center w-[40px] h-[40px] ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                            <GrFormPrevious size={24} />
                        </Link>
                    ) : (
                        <span className="flex items-center justify-center w-[40px] h-[40px] ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-not-allowed select-none opacity-50">
                            <GrFormPrevious size={24} />
                        </span>
                    )}
                </li>
                {first > 1 && (
                    <li className="flex">
                        <span
                            className={`flex items-center justify-center w-[40px] h-[40px] leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                        >
                            ...
                        </span>
                    </li>
                )}
                {Array(pagination.totalPage)
                    .fill(0)
                    .map((_, i) => {
                        if (first <= i + 1 && i + 1 <= last) {
                            return (
                                <li key={i} className="flex">
                                    {pagination.currentPage === i + 1 ? (
                                        <span
                                            className={`flex items-center justify-center w-[40px] h-[40px] leading-tight border-gray-300 
                                            text-blue-600 border bg-blue-50 cursor-pointer select-none }`}
                                        >
                                            {i + 1}
                                        </span>
                                    ) : (
                                        <Link
                                            href={{
                                                pathname: router.pathname,
                                                query: {
                                                    ...router.query,
                                                    page: i + 1,
                                                },
                                            }}
                                            className={`flex items-center justify-center w-[40px] h-[40px] leading-tight text-gray-500 bg-white border border-gray-300 
                                                hover:bg-gray-100 hover:text-gray-700
                                        }`}
                                        >
                                            {i + 1}
                                        </Link>
                                    )}
                                </li>
                            );
                        }
                    })}
                {last < pagination.totalPage && (
                    <li className="flex">
                        <span
                            className={`flex items-center justify-center w-[40px] h-[40px] leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                        >
                            ...
                        </span>
                    </li>
                )}
                <li className="flex">
                    {pagination.isHasNextPage ? (
                        <Link
                            href={{
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    page: pagination.nextPage,
                                },
                            }}
                            className="flex items-center justify-center w-[40px] h-[40px] leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                            <GrFormNext size={24} />
                        </Link>
                    ) : (
                        <span className="flex items-center justify-center w-[40px] h-[40px] leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-not-allowed select-none opacity-50">
                            <GrFormNext size={24} />
                        </span>
                    )}
                </li>
            </ul>
        </>
    );
};

export default Pagination;
