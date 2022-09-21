import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
const ProductForm = dynamic(()=> import("../../components/ProductForm"))

import styles from "../../styles/addProduct.module.css";

const AddProduct = () => {
  const router = useRouter();
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);

  useEffect(()=> {
    if(!seller) {
      router.replace("/seller/login");
    }
  }, [seller, router]);

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