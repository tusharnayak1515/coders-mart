import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';

import styles from "../styles/notFound.module.css";

const NotFound = () => {
  const router = useRouter();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);

  const onBack = (e)=> {
    e.preventDefault();
    if(user) {
        router.replace("/");
    }
    else if(seller) {
        router.replace("/seller/dashboard");
    }
  }

  return (
    <div className={styles.notFoundPage}>
        <Head>
            <title>Page Not Found</title>
            <meta name="keywords" content="next, next.js, coders-hub, blogs" />
        </Head>

        <div className={styles.notFound_div}>
           <h1>404</h1>
           <h2>Page Not Found</h2>
        </div>
        <button className={styles.notFound_back_btn} onClick={onBack}>Go Back</button>
    </div>
  )
}

export default NotFound;