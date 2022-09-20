import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';

import styles from "../../../styles/orderDetails.module.css";

const OrderDetails = () => {
  const router = useRouter();
  const { user } = useSelector(state => state.userReducer,shallowEqual);
  const { seller } = useSelector(state => state.sellerReducer,shallowEqual);
  const { order } = useSelector(state => state.orderReducer,shallowEqual);
  const { product } = useSelector(state => state.productReducer,shallowEqual);
  let orderDate = new Date(order?.createdAt);
  let deliveryDate = new Date(order?.date);

  useEffect(() => {
    if(seller) {
      router.replace("/seller/dashboard");
    }
    else if (!seller && !user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className={styles.orderDetailsPage}>
      <Head>
        <title>Order Details</title>
        <meta
        name="description"
        content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content={`nextjs, e-commerce, coders-mart, orders`} />
      </Head>

      <div className={styles.order_id_div}>
        <p>Order ID - {order?._id}</p>
      </div>

      <Link href={`/products/product/${product?._id}`}>
        <div className={styles.order_product_details}>
          <div className={styles.product_flex_div}>
            <h3 className={styles.product_name}>{product?.name}</h3>
            <div className={styles.product_img_div}>
              <Image src={product?.image} alt={product?.name} layout="fill" />
            </div>
          </div>

          <p className={styles.product_seller_name}>Seller: {product?.seller.name}</p>
          <h4 className={styles.product_price}>₹ {product?.price}</h4>
        </div>
      </Link>

      <div className={styles.order_status_div}>
        <div className={styles.status_pair}>
          <p className={styles.order_text}>Order Confirmed</p>
          <p className={styles.order_dates}>{`${orderDate.getDate()}/${orderDate.getMonth()+1}/${orderDate.getFullYear()}`}</p>
        </div>

        <div className={styles.status_pair}>
          <p className={styles.order_text}>Delivery</p>
          <p className={styles.order_dates}>{`${deliveryDate.getDate()}/${deliveryDate.getMonth()+1}/${deliveryDate.getFullYear()}`}</p>
        </div>
        
        <p>Status: {order?.status}</p>
      </div>

      <div className={styles.shipping_details_div}>
        <p className={styles.shipping_head}>Shipping Details</p>
        <div className={styles.destination_div}>
          <h4>{order?.user.name}</h4>
          <p>{order?.destination.street}</p>
          <p>{order?.destination.city}</p>
          <p>{order?.destination.district}</p>
          <p>{order?.destination.state} - {order?.destination.pincode}</p>
          <p>{order?.destination.country}</p>
          <p>Phone number: {order?.user.phone}</p>
          <p>Email ID: {order?.user.email}</p>
        </div>
      </div>

      <div className={styles.order_price_details_div}>
        <p className={styles.shipping_head}>Price Details</p>
        <div className={styles.price_flex_div}>
          <p className={styles.order_price_text}>Price</p>
          <b className={styles.order_price}>₹ {product?.price}</b>
        </div>
      </div>

    </div>
  )
}

export default OrderDetails;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const {params} = context;
    if (cookieObj.cm_user_token) {
      await store.dispatch(actionCreators.getOrder({id: params.oid, token: cookieObj.cm_user_token}));
      await store.dispatch(actionCreators.getProduct(params.pid));
    }
  }
);