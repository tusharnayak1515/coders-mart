import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/product.module.css";

const Product = ({ product, store }) => {
  return (
    <Link
      href={
        store
          ? `/products/editproduct/${product?._id}`
          : `/products/product/${product._id}`
      }
    >
      <a>
        <div className={styles.product}>
          <div className={styles.product_image}>
            <Image src={product.image} alt={product.name} layout="fill" />
          </div>
          <p className={styles.product_name}>{product.name}</p>
          <p className={styles.product_category}>{product.category[0].toUpperCase()+product.category.slice(1)}</p>
          <h5>₹ {product.price}</h5>
          {store && product?.quantity === 0 ? (
            <p className={styles.no_stock}>Out of stock</p>
          ) : (
            store  && <p className={styles.product_stock}>In Stock: {product?.quantity}</p>
          )}
        </div>
      </a>
    </Link>
  );
};

export default Product;
