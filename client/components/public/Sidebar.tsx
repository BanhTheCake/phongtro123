import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { LIMIT } from '../../constants/var';
import { getAllAreas } from '../../utils/axios/area.axios';
import { getAllSlugs } from '../../utils/axios/category.axios';
import { getNewPosts } from '../../utils/axios/post.axios';
import { getAllPrices } from '../../utils/axios/price.axios';
import SidebarItem from './SidebarItem';
import SidebarPost from './SidebarPost';

const Sidebar = () => {
    const { data: dataSlugs } = useQuery(
        'Get All Slugs',
        ({ signal }) => getAllSlugs(signal),
        {
            onError: (error) => {
                console.log('error ' + error);
            },
        }
    );

    const menuCategory = useMemo(() => {
        return !dataSlugs
            ? []
            : dataSlugs.map((data) => {
                  return {
                      title: data.value,
                      href: data.slug,
                  };
              });
    }, [dataSlugs]);

    const { data: dataPrices } = useQuery(
        'Get All Prices',
        ({ signal }) => getAllPrices(signal),
        {
            onError: (error) => {
                console.log('error ' + error);
            },
        }
    );

    const menuPrices = useMemo(() => {
        return !dataPrices
            ? []
            : dataPrices.map((data) => {
                  const query: Record<string, any> = {
                      minPrice: data.fromValue,
                  };
                  if (data.toValue) {
                      query.maxPrice = data.toValue;
                  }
                  return { title: data.value, query };
              });
    }, [dataPrices]);

    const { data: dataAreas } = useQuery(
        'Get All Areas',
        ({ signal }) => getAllAreas(signal),
        {
            onError: (error) => {
                console.log('error ' + error);
            },
        }
    );

    const menuAreas = useMemo(() => {
        return !dataAreas
            ? []
            : dataAreas.map((data) => {
                  const query: Record<string, any> = {
                      minArea: data.fromValue,
                  };
                  if (data.toValue) {
                      query.maxArea = data.toValue;
                  }
                  return { title: data.value, query };
              });
    }, [dataAreas]);

    const {data: newPosts} = useQuery(['Get New Posts', LIMIT], ({ signal }) => getNewPosts(LIMIT, signal), {
        onError: (error) => {
            console.log('error ' + error);
        }
    })

    return (
        <>
            <SidebarItem title="Danh mục cho thuê" data={menuCategory} />
            <SidebarItem title="Xem theo giá" data={menuPrices} number={2} />
            <SidebarItem
                title="Xem theo diện tích"
                data={menuAreas}
                number={2}
            />
            <SidebarPost data={newPosts} title={'Tin mới đăng'} />
        </>
    );
};

export default Sidebar;
