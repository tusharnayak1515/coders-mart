import React from 'react';
import Product from './Product';

import styles from "../styles/allProducts.module.css";

const AllProducts = ({products}) => {
  return (
    <div className={styles.allProducts}>
        {products?.map((product) => {
            return (
                <Product key={product._id} product={product} />
            );
        })}
    </div>
  )
}

export default AllProducts;