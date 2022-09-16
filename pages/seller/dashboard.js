import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import styles from "../../styles/dashboard.module.css";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {seller, profile} = useSelector(state=> state.sellerReducer,shallowEqual);

  useEffect(()=> {
    if(user) {
        router.replace("/");
    }
    else if(!seller) {
        router.replace("/seller/login");
    }
  }, [user, seller, router]);

  return (
    <div className={styles.dashboardPage}>
        <Head>
            <title>Seller Dashboard</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content="nextjs, e-commerce, coders-mart, seller dashboard" />
        </Head>
        Dashboard
    </div>
  )
}

export default Dashboard