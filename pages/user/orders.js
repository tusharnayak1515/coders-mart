import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as cookie from "cookie";
import { actionCreators } from '../../redux';
import { wrapper } from '../../redux/store';
const Order = dynamic(()=> import("../../components/Order"), {ssr: false});

import styles from "../../styles/orders.module.css";

const Orders = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {orders} = useSelector(state=> state.orderReducer,shallowEqual);

  useEffect(()=> {
    if(!user) {
        router.replace("/");
    }
    else {
        dispatch(actionCreators.getAllOrders());
    }
  }, []);

  return (
    <div className={styles.ordersPage}>
        <Head>
            <title>My Orders</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content={`nextjs, e-commerce, coders-mart, orders`} />
        </Head>

        {orders && orders?.length === 0 ? <h3 className={styles.no_orders}>No Orders</h3> : orders?.map((order)=> {
            return <Order key={order._id} order={order} />
        })}
    </div>
  )
}

export default Orders;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const mycookie = context?.req?.headers?.cookie || "";
      const cookieObj = cookie.parse(mycookie);
      if (cookieObj.cm_user_token) {
        await store.dispatch(actionCreators.getAllOrders(cookieObj.cm_user_token));
      }
    }
);