import { Modal, Form, Input, Image } from 'antd';
import React, { PropsWithChildren, useEffect } from 'react';
import styles from './index.less';

interface ProductItemProps {
  data: any;
}

const ProductItem: React.FC<PropsWithChildren<ProductItemProps>> = (props) => {
  const { data } = props;
  const priceArr = data?.price?.split('.') ?? [0, '00'];
  return (
   <div className={styles.productItem}>
    <div className={styles.productImg}>
      <Image  src={data?.gallery?.[0]} />
    </div>
    <div className={styles.productInfo}>
      <p className={styles.title}>{data?.title} </p>
      <p className={styles.price}><i>$</i><span>{priceArr[0]}.<span className={styles.decimal}>{priceArr[1]}</span></span></p>
    </div>
   </div>
  );
};

export default ProductItem;