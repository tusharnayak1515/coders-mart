import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { actionCreators } from "../../redux";
import { wrapper } from "../../redux/store";
const CartProduct = dynamic(() => import("../../components/CartProduct"), {
  ssr: false,
});
import empty_bag from "../../public/static/images/empty_cart.jpeg";

import styles from "../../styles/cart.module.css";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const { seller } = useSelector(state => state.sellerReducer,shallowEqual);
  const { cart } = useSelector((state) => state.cartReducer, shallowEqual);
  const [orderDetails, setOrderDetails] = useState({
    products: [],
    destination: profile?.address,
  });
  const [price, setPrice] = useState(0);

  const placeOrder = (e) => {
    e.preventDefault();
    dispatch(actionCreators.placeOrder(orderDetails));
    router.push("/user/orders");
  };

  useEffect(() => {
    if(seller) {
      router.replace("/seller/dashboard");
    }
    else if (!seller && !user) {
      router.replace("/");
    }
    else {
      dispatch(actionCreators.getCart());
    }
  }, [user, seller, router, dispatch]);

  useEffect(() => {
    let p = 0;
    for (let i = 0; i < cart?.products.length; i++) {
      p += cart?.products[i].price;
    }
    setPrice(p);
  }, [cart?.products.length]);

  useEffect(() => {
    let myProducts = [];
    for (let i = 0; i < cart?.products.length; i++) {
      myProducts.push(cart?.products[i]._id);
    }
    setOrderDetails({ ...orderDetails, products: myProducts });
  }, [cart?.products.length]);

  return (
    <div
      className={styles.cartPage}
      style={{
        backgroundColor:
          cart?.products.length === 0 ? "white" : "rgb(235, 235, 235)",
      }}
    >
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta
          name="keywords"
          content={`nextjs, e-commerce, coders-mart, cart`}
        />
      </Head>

      {cart?.products.length !== 0 && (
        <div className={styles.location_div}>
          <div className={styles.user_location}>
            <p className={styles.user_name_pincode}>
              Deliver to: <span>{profile?.name.substring(0, 10)}...,</span>
              <span>{profile?.address.pincode}</span>
            </p>
            <p className={styles.street_details}>
              {profile?.address.street.substring(0, 30)}...
            </p>
          </div>

          <Link href="/user/editaddress">
            <button className={styles.change_address_btn}>Change</button>
          </Link>
        </div>
      )}

      {cart?.products.length === 0 ? (
        <div className={styles.empty_cart}>
          <div className={styles.empty_bag_img_div}>
            <Image src={empty_bag} alt="Empty Cart" layout="fill" />
          </div>

          <h3>Your cart is empty!</h3>
          <p>There is nothing in your cart. Let&apos;s add some products.</p>
        </div>
      ) : (
        <div className={styles.products_container}>
          {cart?.products.map((product, index) => {
            return <CartProduct key={index} product={product} />;
          })}
        </div>
      )}

      {cart?.products.length !== 0 && (
        <div className={styles.placeOrder_div}>
          <h2>₹ {price}</h2>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.cm_user_token) {
      await store.dispatch(actionCreators.userProfile(cookieObj.cm_user_token));
      await store.dispatch(actionCreators.getCart(cookieObj.cm_user_token));
    }
  }
);
