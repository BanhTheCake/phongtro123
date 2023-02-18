const pagination = ({
  count = 0,
  limit = 0,
  page = 0,
}: {
  count: number;
  limit: number;
  page: number;
}) => {
  const totalPage = Math.ceil(count / limit);
  const isHasNextPage = page + 1 <= totalPage;
  const isPrevPage = page - 1 > 0;
  const nextPage = isHasNextPage ? page + 1 : -1;
  const prevPage = isPrevPage ? page - 1 : -1;

  return {
    totalPage,
    totalItem: count,
    isHasNextPage,
    isPrevPage,
    nextPage,
    prevPage,
    currentPage: page,
    limit: limit,
  };
};

export default pagination;
