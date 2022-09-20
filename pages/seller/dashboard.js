import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
const EarningHistory = dynamic(
  () => import("../../components/EarningHistory"),
  { ssr: true }
);

import money from "../../public/static/images/money.webp";
import sales from "../../public/static/images/sales.webp";
import inStock from "../../public/static/images/in_stock.png";
import outOfStock from "../../public/static/images/out_of_stock.webp";

import styles from "../../styles/dashboard.module.css";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { seller, profile } = useSelector(
    (state) => state.sellerReducer,
    shallowEqual
  );
  const { products } = useSelector(
    (state) => state.productReducer,
    shallowEqual
  );
  const [in_stock, setIn_stock] = useState(0);
  const [out_of_stock, setOut_of_stock] = useState(0);

  useEffect(() => {
    if (user) {
      router.replace("/");
    } else if (!seller) {
      router.replace("/seller/login");
    } else {
      dispatch(actionCreators.sellerProfile());
      dispatch(actionCreators.getStore());
      let available = 0;
      let unavailable = 0;
      for (let i = 0; i < products?.length; i++) {
        if (products[i]?.quantity > 0) {
          available += 1;
        } else {
          unavailable += 1;
        }
      }
      setIn_stock(available);
      setOut_of_stock(unavailable);
    }
  }, [user, seller, router, profile?.sold, products?.length, dispatch]);

  return (
    <div className={styles.dashboardPage}>
      <Head>
        <title>Seller Dashboard</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta
          name="keywords"
          content="nextjs, e-commerce, coders-mart, seller dashboard"
        />
      </Head>

      <div className={styles.analytics_container}>
        <div className={styles.analytics_div}>
          <div className={styles.left_div}>
            <h3>Total Earnings</h3>
            <b>₹ {profile?.earning}</b>
          </div>

          <div className={styles.right_div}>
            <Image src={money} alt="Earnings" layout="fill" />
          </div>
        </div>

        <div className={styles.analytics_div}>
          <div className={styles.left_div}>
            <h3>Products Sold</h3>
            <b>{profile?.sale.length}</b>
          </div>

          <div className={styles.right_div}>
            <Image src={sales} alt="Total Sales" layout="fill" />
          </div>
        </div>

        <Link href="/seller/store">
          <div className={`${styles.analytics_div} ${styles.my_store}`}>
            <div className={styles.left_div}>
              <h3>Products in stock</h3>
              <b>{in_stock}</b>
            </div>

            <div className={styles.right_div}>
              <Image src={inStock} alt="Products in stock" layout="fill" />
            </div>
          </div>
        </Link>

        <div className={styles.analytics_div}>
          <div className={styles.left_div}>
            <h3>Products out of stock</h3>
            <b>{out_of_stock}</b>
          </div>

          <div className={styles.right_div}>
            <Image src={outOfStock} alt="Products out of stock" layout="fill" />
          </div>
        </div>
      </div>

      <div className={styles.earning_history_div}>
        <h3>Sales History</h3>
        <div className={styles.top_div}>
          <b>Date</b>
          <b>Earning</b>
        </div>

        {profile && [...profile?.sale].reverse().map((sale, index) => {
          return <EarningHistory key={index} sale={sale} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.cm_seller_token) {
      await store.dispatch(actionCreators.sellerProfile(cookieObj.cm_seller_token));
      await store.dispatch(actionCreators.getStore(cookieObj.cm_seller_token));
    }
  }
);
