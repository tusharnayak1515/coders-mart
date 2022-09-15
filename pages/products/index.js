import React from 'react';
import Head from 'next/head';
import { shallowEqual, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';
import { wrapper } from '../../redux/store';
import AllProducts from '../../components/AllProducts';

import styles from "../../styles/allProductsPage.module.css";

const AllProductsPage = () => {
  const {products} = useSelector(state=> state.productReducer,shallowEqual);
  return (
    <div className={styles.allProductsPage}>
      <Head>
        <title>Coders Mart</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content="nextjs, e-commerce, coders-mart" />
      </Head>

      <h1 className={styles.header}>All Products</h1>
      <AllProducts products={products} />
    </div>
  )
}

export default AllProductsPage;

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
    await store.dispatch(actionCreators.getallProducts());
});