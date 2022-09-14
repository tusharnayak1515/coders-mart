import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from "../styles/product.module.css";

const Product = ({product}) => {
  return (
    <Link href={`/products/${product._id}`}>
      <a>
        <div className={styles.product}>
          <div className={styles.product_image}>
              <Image src={product.image} alt={product.name} layout="fill" />
          </div>
          {/* {product.name.length < 15 ? <p className={styles.product_name}>{product.name}</p> : <p className={styles.product_name}>{product.name.substring(0,15)}...</p>} */}
          <p className={styles.product_name}>{product.name}</p>
          <h5>₹ {product.price}</h5>
        </div>
      </a>
    </Link>
    
  )
}

export default Product