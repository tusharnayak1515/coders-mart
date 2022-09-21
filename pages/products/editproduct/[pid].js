import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';
const ProductForm = dynamic(()=> import("../../../components/ProductForm"))

import styles from "../../../styles/addProduct.module.css";

const EditProduct = () => {
  const router = useRouter();
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);
  const {product} = useSelector(state=> state.productReducer,shallowEqual);

  useEffect(()=> {
    if(!seller) {
      router.replace("/seller/login");
    }
  }, [seller, router]);

  return (
    <div className={styles.addProduct}>
        <Head>
            <title>Edit Product</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content="nextjs, e-commerce, coders-mart, edit product" />
        </Head>

        <ProductForm product={product} />
    </div>
  )
}

export default EditProduct;

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
    const {params} = context;
    await store.dispatch(actionCreators.getProduct(params.pid));
});