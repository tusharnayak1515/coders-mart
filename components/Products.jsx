import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
const Product = dynamic(()=> import("./Product"), {ssr: true});

import styles from "../styles/products.module.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.productReducer,shallowEqual);
  return (
    <div className={styles.products}>
      {products &&
        products?.map((product,index) => {
          if(index < 30) {
            return (
              <Product key={product._id} product={product} index={index} />
              );
          }
          return null;
        })}
    </div>
  );
};

export default Products;
