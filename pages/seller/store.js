import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../redux/store';
import { actionCreators } from '../../redux';
const Products = dynamic(()=> import("../../components/Products"));

import styles from "../../styles/store.module.css";

const Store = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);
  const {products, isLoading} = useSelector(state=> state.productReducer,shallowEqual);

  useEffect(()=> {
    if(user) {
      router.replace("/");
    }
    else if(!seller) {
      router.replace("/seller/login");
    }
    else {
      dispatch(actionCreators.getStore());
    }
  }, [user, seller, router, dispatch]);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.storePage}>
        <Head>
            <title>My Store</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content={`nextjs, e-commerce, coders-mart, store`} />
        </Head>

        <h1 className={styles.store_header}>My Store</h1>

        <div className={styles.store_container}>
          <Products products={products} store={true} />
        </div>
    </div>
  )
}

export default Store;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const mycookie = context?.req?.headers?.cookie || "";
      const cookieObj = cookie.parse(mycookie);
      if (cookieObj.cm_seller_token) {
        await store.dispatch(actionCreators.getStore(cookieObj.cm_seller_token));
      }
    }
  );