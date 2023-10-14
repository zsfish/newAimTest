import { Modal, Form, Input, Image, Empty } from 'antd';
import React, { PropsWithChildren, useEffect } from 'react';
import cx from 'classnames';
import ProductItem from '../ProductItem/ProductItem';
import styles from './index.less';

interface ProductListProps {
  data: any;
  isMobile: boolean;
}

const ProductList: React.FC<PropsWithChildren<ProductListProps>> = (props) => {
  const { data, isMobile } = props;
  const priceArr = data?.price?.split('.') ?? [0, '00'];
  return (
   <div className={cx(styles.productList, isMobile ? styles.mobileProduct : '')}>
    {
      data?.length > 0 ? data?.map((el: Record<string, any>) => <ProductItem  key={el.entity_id} data={el} />)
      : 
      <Empty
        imageStyle={{ height: 60 }}
        description={
          <span>
          Data Not Found
          </span>
        }
      >
      </Empty>
    }
    
   </div>
  );
};

export default ProductList;