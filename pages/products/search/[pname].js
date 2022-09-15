import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';
const Products = dynamic(()=> import("../../../components/Products"));

import styles from "../../../styles/searchPage.module.css";

const SearchPage = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state=> state.productReducer,shallowEqual);

  // useEffect(()=> {
  //   return ()=> {
  //       dispatch(actionCreators.resetSearchedProducts());
  //   }
  // }, []);

  return (
    <div className={styles.searchPage}>
        <Head>
            <title>Coders Mart</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content={`nextjs, e-commerce, coders-mart`} />
        </Head>
        <Products searchedProducts={products} /> 
    </div>
  )
}

export default SearchPage;

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
    const {params} = context;
    if(params.pname !== "") {
        await store.dispatch(actionCreators.searchedProducts(params.pname));
    }
});