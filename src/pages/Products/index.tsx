import { PageContainer } from '@ant-design/pro-components';
import { Empty, message, Pagination, Spin, Input, ConfigProvider } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRequest, useLocalStorageState, useBoolean, useMemoizedFn, useDebounce, useInfiniteScroll, useSize, useCreation } from 'ahooks';
import { SearchOutlined } from '@ant-design/icons';
import enGB from 'antd/locale/en_GB';
import { queryAccessToken, queryProductsList } from './service';
import AuthForm from './components/AuthForm';
import ProductList from './components/ProductList/index';
import styles from './index.less';


const AccessPage: React.FC = () => {
  const [devToken, setDevToken] = useLocalStorageState<string | undefined>(
    'new-aim-dev-token',
    {
      defaultValue: '',
      serializer: (v) => v ?? '',
      deserializer: (v) => v,
    },
  );
  const [authFormVisible, { setTrue: openAuthForm, setFalse: closeAuthForm }] = useBoolean(false);
  const [productParams, setProductParams] = useState({ page_no: 1, limit: 40 });
  const [hasMore, setHasMore] = useState(false); // 用来移动端查看是否还有更多数据
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState<Array<Record<string, any>>>([]);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, { wait: 300 });
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(window.document.body) as { height: number, width: number};
  const isMobile = useCreation(() => {
    return size?.width <= 768
  }, [size?.width])
  const { run: getAuth } = useRequest(queryAccessToken, {
    manual: true,
    onSuccess: (res) => {
      if (res?.token) {
        setDevToken(res?.token);
        closeAuthForm();
        getProduct(productParams)
      }
    },
    onError: (err: any) => {
      message.error(err?.response?.statusText)
    }
  })
  const { loading, run: getProduct } = useRequest(queryProductsList, {
    manual: true,
    onSuccess: (res: ProductAPI.Result_ProductsInfo__) => {
      setProductList(res?.result || []);
      setTotal(res?.total || 0);
      setHasMore((res?.total ?? 0) > (res?.result?.length ?? 0));
      setProductParams({ page_no: res?.current_page || 1, limit: res?.page_size || 40 });
    },
    onError: (err: any) => {
      console.log('err', err)
      if (err?.response?.status === 401 && devToken) {
        window.localStorage.removeItem('new-aim-dev-token');
        setDevToken('');
      }
      message.error(err?.response?.statusText);
    }
  });

  /**
   * 获取授权
   */
  const confirmAuth = useMemoizedFn((data: ProductAPI.Params_TokenInfo__) => {
    getAuth(data);
  })
  /**
   * 改变页码信息
   */
  const changePagination = useMemoizedFn((page: number, pageSize: number) => {
    setProductParams({ page_no: page, limit: pageSize });
    getProduct({ page_no: page, limit: pageSize });
  })
  /**
   * 设置搜索信息
   */
  const onSearch = useMemoizedFn((e) => {
    setSearchValue(e.target.value);
  })
  /**
   * 滚动加载
   */
  const getLoadMoreList = async () => {
    try {
      const pageList: any = await queryProductsList({ page_no: productParams.page_no + 1, limit: 40 });
      const totalList = [...productList, ...pageList?.result]
      setProductList(totalList)
      setProductParams({ page_no: pageList.current_page, limit: 40 })
      setHasMore(totalList.length <= pageList?.total);
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getProduct({ page_no: 1, limit: 40, keywords: debouncedValue });
  }, [debouncedValue])
  return (
    <PageContainer
      ghost
      header={{
        title: 'Products',
      }}
      className={styles.productContainer}
    >
      <ConfigProvider locale={enGB} theme={{
        token: {
          colorPrimary: '#942ffb',
          colorLink: '#942ffb'
        }

      }}>
        {
          devToken ? <div className={styles.productPage}>
            <div className={styles.topSearch}>
              <div className={styles.searchContainer}>
                <Input placeholder="Search for Products" onChange={onSearch} style={{ width: 200 }} prefix={<SearchOutlined style={{ color: "#942FFB" }} />} />
              </div>
              {!isMobile ? <Pagination
                total={85}
                showTotal={(total) => `Total ${total} items`}
                defaultPageSize={40}
                pageSize={productParams.limit}
                current={productParams.page_no}
                size="small"
                defaultCurrent={1}
                onChange={changePagination}
                pageSizeOptions={[40, 80, 160]}
              /> : null}
            </div>
            {!isMobile ? <Spin spinning={loading}>
              <ProductList data={productList} isMobile={isMobile} />
            </Spin> : <InfiniteScroll
              dataLength={productList.length}
              next={getLoadMoreList}
              hasMore={hasMore}
              height={window.innerHeight - 180}
              loader={<div style={{ textAlign: "center" }}><Spin /></div>}
              endMessage={
                productList.length > 0 && <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div ref={ref} className={styles.mobileList}>
                <ProductList data={productList} isMobile={isMobile} />
              </div>
            </InfiniteScroll>
            }
          </div> : <Empty
            imageStyle={{ height: 60 }}
            description={
              <span>
                Data Not Found, Please  <span className={styles.grantBtn} onClick={openAuthForm}>Grant Access</span> First
              </span>
            }
          >
          </Empty>
        }
        <AuthForm modalVisible={authFormVisible} onCancel={closeAuthForm} onOk={confirmAuth} />
      </ConfigProvider>
    </PageContainer>
  );
};

export default AccessPage;