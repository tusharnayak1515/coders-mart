import React, { Fragment } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Product = dynamic(() => import("./Product"), { ssr: true });
import no_result from "../public/static/images/no_products.png";

import styles from "../styles/products.module.css";

const Products = ({ limit, searchedProducts, categorisedProducts, products }) => {
  return (
    <Fragment>
      {(!searchedProducts && products && limit) && (
        <div className={styles.products}>
          {products?.map((product, index) => {
            if (index < limit) {
              return (
                <Product key={product._id} product={product} index={index} />
              );
            }
            return null;
          })}
        </div>
      )}
      {(!searchedProducts && products && !limit) && (
        <div className={styles.products}>
          {products?.map((product) => {
            return (
              <Product key={product._id} product={product} />
            );
          })}
        </div>
      )}
      {searchedProducts && searchedProducts?.length === 0 ? (
        <div className={styles.no_result}>
          <div className={styles.no_result_img_div}>
            <Image src={no_result} alt="No results found" layout="fill" />
          </div>

          <h3>Sorry,no results found!</h3>
          <p>Please check the spelling or try searching for something else</p>
        </div>
      ) : (
        searchedProducts && (
          <div className={styles.products}>
            {searchedProducts?.map((product, index) => {
              return (
                <Product key={product._id} product={product} index={index} />
              );
            })}
          </div>
        )
      )}

      {categorisedProducts && <div className={styles.products}>
        {categorisedProducts?.map((product) => {
          return (
            <Product key={product._id} product={product} />
          );
        })}
      </div>}
    </Fragment>
  );
};

export default Products;
