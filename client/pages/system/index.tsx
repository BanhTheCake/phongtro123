import moment from 'moment';
import 'moment/locale/vi';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Cell, Column } from 'react-table';

import { BiMessageSquareEdit } from 'react-icons/bi';
import { CgCloseR } from 'react-icons/cg';

import Select from 'react-select';
import Button from '../../components/global/Button';
import ModalConfirm from '../../components/global/ModalConfirm';
import ModalEdit from '../../components/global/ModalEdit';
import Table from '../../components/global/Table';
import HandlePost from '../../components/system/HandlePost';
import SystemLayout from '../../layouts/SystemLayout';
import {
  handleDeletePostById,
  handleGetOwnerPosts,
} from '../../utils/axios/post.axios';
import getCurrentRoute from '../../utils/helpers/getCurrentRoute';
import Head from 'next/head';
import PATH from '../../constants/path';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const menu = [
  { value: 'public', label: 'Tin chưa hết hạn' },
  { value: 'expire', label: 'Tin đã hết hạn' },
  { value: 'all', label: 'Tin trong hệ thống' },
];

interface PostTable {
  price: string;
  code: string;
  expire: string;
  id: string;
  title: string;
  createdAt: string;
}

const SystemHomePage = () => {
  const router = useRouter();
  const { status } = router.query;
  const [filterValue, setFilterValue] = useState(status || 'all');
  const [isShow, setIsShow] = useState(false);
  const [attrDeleteModal, setAttrDeleteModal] = useState({
    isOpen: false,
    id: '',
  });

  const token = useSelector<RootState>((state) => state.auth.token) as string | undefined

  useEffect(() => {
    if (!filterValue) return;
    router.push({
      pathname: getCurrentRoute(router),
      query: { status: filterValue },
    });
  }, [filterValue]);

  const { mutate: deletePost } = useMutation({
    mutationKey: 'Delete Post By Id',
    mutationFn: handleDeletePostById,
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.log('Xảy ra lỗi ...', err);
    },
  });

  const { data: posts, refetch, isLoading } = useQuery(
    ['Get Owner Posts', filterValue],
    ({ signal }) => handleGetOwnerPosts(signal, filterValue as string),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log('err: ' + err);
      },
      keepPreviousData: true,
      enabled: !!token
    }
  );

  const handleEditPosts = (value: PostTable) => {
    setIsShow(true);
    router.push(
      { pathname: router.pathname, query: { id: value.id } },
      undefined,
      { shallow: true }
    );
  };

  const handleCloseUpdate = () => {
    setIsShow(false);
    router.push({ pathname: router.pathname }, undefined, {
      shallow: true,
    });
  };

  const handleAfterUpdate = () => {
    setIsShow(false);
    router.push({ pathname: router.pathname }, undefined, {
      shallow: true,
    });
    refetch();
  };

  const handleDelete = () => {
    const { id } = attrDeleteModal;
    id && deletePost(id);
    handleCloseDelete();
  };

  const handleOpenDeleteModal = (value: PostTable) => {
    setAttrDeleteModal({ isOpen: true, id: value.id });
  };

  const handleCloseDelete = () => {
    setAttrDeleteModal({ isOpen: false, id: '' });
  };

  const postsTable = useMemo(() => {
    if (!posts) return undefined;
    return posts.map((post) => {
      const { attributes, overview, ...rest } = post;
      return {
        ...rest,
        ...overview,
        ...attributes,
      };
    });
  }, [posts]);

  const postsColumns = useMemo(() => {
    return [
      { Header: 'Mã tin', accessor: 'code' },
      { Header: 'Tiêu đề', accessor: 'title' },
      {
        Header: 'Giá',
        accessor: 'price',
        Cell: ({ value }: Cell) => (value as number).toLocaleString(),
      },
      {
        Header: 'Ngày bắt đầu',
        accessor: 'createdAt',
        Cell: ({ value }: Cell) => moment(value).format('DD/MM/yyyy'),
      },
      {
        Header: 'Ngày hết hạn',
        accessor: 'expire',
        Cell: ({ value }: Cell) => moment(value).format('DD/MM/yyyy'),
      },
      {
        Header: 'Trạng thái',
        Cell: ({ row }: Cell) => {
          const expire = (row.original as PostTable).expire;
          return moment().isSameOrBefore(expire)
            ? 'Chưa hết hạn'
            : 'Hết hạn';
        },
      },
      {
        Header: 'Thao Tác',
        Cell: ({ row }: Cell) => {
          return (
            <p className="flex gap-1.5 items-center">
              <button
                className="text-green-600 hover:opacity-80 transition-all flex"
                onClick={() =>
                  handleEditPosts(row.original as PostTable)
                }
              >
                <BiMessageSquareEdit size={26} />
              </button>
              <button
                className="text-red-600 hover:opacity-80 transition-all flex"
                onClick={() =>
                  handleOpenDeleteModal(
                    row.original as PostTable
                  )
                }
              >
                <CgCloseR size={24} />
              </button>
            </p>
          );
        },
      },
    ];
  }, []) as Column<PostTable>[];

  if (isLoading) {
    return <SystemLayout>
      <Head>
        <title>Quản lý bài viết</title>
        <meta property="og:title" content="posts" key="posts" />
      </Head>
      <section>
        <div className="flex justify-between gap-2 items-center w-full border-b pb-3">
          <h1 className="text-3xl">Quản lý tin đăng</h1>
          <div className="flex gap-2 items-center">
            <Select
              value={menu.find(
                (item) => item.value === filterValue
              )}
              options={menu}
              onChange={(option) => {
                setFilterValue(option?.value || '');
              }}
              placeholder="Lọc theo trạng thái"
            />
            <Button href={PATH.CREATE_NEW_POST} primary className={'py-1.5'}>
              Đăng tin mới
            </Button>
          </div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 max-w-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full mb-3"></div>
        </div>
      </section>
    </SystemLayout>
  }

  return (
    <SystemLayout>
      <Head>
        <title>Quản lý bài viết</title>
        <meta property="og:title" content="posts" key="posts" />
      </Head>
      <section>
        <div className="flex justify-between gap-2 items-center w-full border-b pb-3">
          <h1 className="text-3xl">Quản lý tin đăng</h1>
          <div className="flex gap-2 items-center">
            <Select
              value={menu.find(
                (item) => item.value === filterValue
              )}
              options={menu}
              onChange={(option) => {
                setFilterValue(option?.value || '');
              }}
              placeholder="Lọc theo trạng thái"
            />
            <Button primary className={'py-1.5'}>
              Đăng tin mới
            </Button>
          </div>
        </div>
        <div className="mt-4">
          {postsTable ? (
            <Table data={postsTable} columns={postsColumns} />
          ) : (
            <p className=' text-slate-600'>Bạn chưa đăng tin nào cả ... </p>
          )}
        </div>
      </section>
      <ModalEdit
        isOpen={isShow}
        title="Chỉnh sửa bài đăng"
        onClose={handleCloseUpdate}
      >
        {isShow && (
          <HandlePost type="update" callback={handleAfterUpdate} />
        )}
      </ModalEdit>
      <ModalConfirm
        isOpen={attrDeleteModal.isOpen}
        title={'Are you sure you want to delete this post ?'}
        onClose={handleCloseDelete}
        onAccess={handleDelete}
        acceptText={`Yes, I'm sure`}
        deniedText={'No, cancel'}
      />
    </SystemLayout>
  );
};
export default SystemHomePage;
