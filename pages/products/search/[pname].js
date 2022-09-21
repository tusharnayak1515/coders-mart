import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';
const Products = dynamic(()=> import("../../../components/Products"), {ssr: true});

import styles from "../../../styles/searchPage.module.css";

const SearchPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {products} = useSelector(state=> state.productReducer,shallowEqual);

  useEffect(()=> {
    dispatch(actionCreators.searchedProducts(router.query.pname));
    return ()=> {
        dispatch(actionCreators.resetSearchedProducts());
    }
  }, [router, dispatch]);

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

        <div className={styles.products_container}>
          <Products searchedProducts={products} /> 
        </div>
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