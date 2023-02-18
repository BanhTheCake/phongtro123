export interface IResp<T> {
    errCode: number;
    msg: string;
    data: T;
}

export interface IPagination {
    totalPage: number;
    totalItem: number;
    isHasNextPage: boolean;
    isPrevPage: boolean;
    nextPage: number;
    prevPage: number;
    currentPage: number;
    limit: number;
}
