import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../../redux';
import { wrapper } from '../../../redux/store';
import Products from '../../../components/Products';

import styles from "../../../styles/categorisedProducts.module.css";

const CategorisedProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {products} = useSelector(state=> state.productReducer,shallowEqual);

  useEffect(()=> {
    dispatch(actionCreators.getCategorisedProducts(router.query.cname));

    return ()=> {
      dispatch(actionCreators.resetCategorisedProducts());
    }
  }, [router, dispatch]);

  return (
    <div className={styles.categorisedProductPage}>
      <Head>
        <title>{router.query.cname.charAt(0).toUpperCase()+router.query.cname.slice(1)}</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content="nextjs, e-commerce, coders-mart" />
      </Head>

      <h2 className={styles.header}>{router.query.cname.toUpperCase()}</h2>
      <div className={styles.products_container}>
        <Products categorisedProducts={products} />
      </div>
    </div>
  )
}

export default CategorisedProducts;

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
  const {params} = context;
  if(params.cname !== "") {
    await store.dispatch(actionCreators.getCategorisedProducts(params.cname));
  }
});