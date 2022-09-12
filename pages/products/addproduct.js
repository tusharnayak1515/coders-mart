import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const ProductForm = dynamic(()=> import("../../components/ProductForm"))

import styles from "../../styles/addProduct.module.css";

const AddProduct = () => {
  return (
    <div className={styles.addProduct}>
        <Head>
            <title>Add Product</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content="nextjs, e-commerce, coders-mart, add product" />
        </Head>

        <ProductForm />
    </div>
  )
}

export default AddProduct;