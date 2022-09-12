import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from "../styles/product.module.css";

const Product = ({product,index}) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className={`${styles.product} ${index %2 === 0 ? styles.producteven : styles.productodd}`}>
        <div className={styles.product_image}>
            <Image src={product.image} alt={product.name} layout="fill" />
        </div>
        <p>{product.name}</p>
      </div>
    </Link>
    
  )
}

export default Product