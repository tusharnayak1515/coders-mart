import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';
import { toast } from 'react-toastify';
const Rating = dynamic(()=> import("../../../components/Rating"), {ssr: false});
const DeliveryDate = dynamic(()=> import("../../../components/DeliveryDate"), {ssr: false});
const Reviews = dynamic(()=> import("../../../components/Reviews"), {ssr: false});
const CartButtonDiv = dynamic(()=> import("../../../components/CartButtonDiv"), {ssr: false});

import styles from "../../../styles/productPage.module.css";

const ProductPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.userReducer,shallowEqual);
  const {product} = useSelector(state=>state.productReducer,shallowEqual);
  const {cart} = useSelector(state=>state.cartReducer,shallowEqual);
  const {reviews} = useSelector(state=>state.reviewReducer,shallowEqual);
  const [ratings, setRatings] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  const addToCart = (e)=> {
    e.preventDefault();
    if(!user) {
      toast.warn("You need to be logged in to perform this task!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      dispatch(actionCreators.addToCart(product?._id));
    }
  }

  const goToCart = (e)=> {
    e.preventDefault();
    if(!user) {
      toast.warn("You need to be logged in to perform this task!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      router.push("/user/cart");
    }
  }

  useEffect(()=> {
    let total = 0;
    reviews?.forEach((review)=> {
        total += review.ratings;
    });
    let avg = (total/reviews?.length).toFixed(1);
    setRatings(avg);
  }, [reviews?.length]);

  useEffect(()=> {
    let counter = 0;
    if(user) {
      for (let i = 0; i < cart?.products.length; i++) {
        if(cart?.products[i]._id === product?._id) {
          counter += 1;
          setIsInCart(true);
        }
      }
      if(counter === 0) {
        setIsInCart(false);
      }
    }
  }, [user, cart?.products.length]);

  useEffect(()=> {
    return ()=> {
      dispatch(actionCreators.resetProduct());
    }
  }, []);

  return (
    <div className={styles.productPage}>
        <Head>
          <title>{product?.name}</title>
          <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
          />
          <meta name="keywords" content={`nextjs, e-commerce, coders-mart, ${product?.name}`} />
        </Head>

        <div className={styles.product_topDiv}>
          <div className={styles.product_img_div}>
            {product && <Image src={product?.image} alt={product?.name} layout="fill" />}
          </div>

          <div className={styles.product_details_div}>
            <h3 className={styles.product_name}>{product?.name}</h3>
            <p className={styles.product_description}>{product?.description}</p>
            {product?.size && <h3 className={styles.product_size}>Size: <span>{product?.size}</span></h3>}
            <h2 className={styles.product_price}>₹{product?.price}</h2>
            <h3 className={styles.product_quantity}>Hurry! Only {product?.quantity} left!</h3>
            <p className={styles.deliveryText}>FREE Delivery</p>
            <Rating ratings={ratings} reviews={reviews} />
          </div>
        </div>

        <DeliveryDate />

        <Reviews />

        {user && <CartButtonDiv isInCart={isInCart} addToCart={addToCart} goToCart={goToCart} />}
    </div>
  )
}

export default ProductPage;

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
    const {params} = context;
    await store.dispatch(actionCreators.getProduct(params.pid));
    await store.dispatch(actionCreators.getAllReviews(params.pid));
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.cm_user_token) {
      await store.dispatch(actionCreators.userProfile(cookieObj.cm_user_token));
      await store.dispatch(actionCreators.getCart(cookieObj.cm_user_token));
      await store.dispatch(actionCreators.getAllOrders(cookieObj.cm_user_token));
    }
    else if(cookieObj.cm_seller_token) {
      await store.dispatch(actionCreators.sellerProfile(cookieObj.cm_seller_token));
    }
});