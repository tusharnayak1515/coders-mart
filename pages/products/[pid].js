import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../redux/store';
import { actionCreators } from '../../redux';
const Rating = dynamic(()=> import("../../components/Rating"), {ssr: false});
const DeliveryDate = dynamic(()=> import("../../components/DeliveryDate"), {ssr: false});
const Reviews = dynamic(()=> import("../../components/Reviews"), {ssr: false});

import styles from "../../styles/productPage.module.css";

const ProductPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {profile} = useSelector(state=>state.userReducer,shallowEqual);
  const {product} = useSelector(state=>state.productReducer,shallowEqual);
  const {cart} = useSelector(state=>state.cartReducer,shallowEqual);
  const {reviews} = useSelector(state=>state.reviewReducer,shallowEqual);
  const [ratings, setRatings] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  const date = new Date();
  const delivery_date = new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000));

  const addToCart = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.addToCart(product?._id));
  }

  const goToCart = (e)=> {
    e.preventDefault();
    router.push("/user/cart");
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
    for (let i = 0; i < cart?.products.length; i++) {
      if(cart?.products[i]._id === product?._id) {
        counter += 1;
        setIsInCart(true);
      }
    }
    if(counter === 0) {
      setIsInCart(false);
    }
  }, [cart?.products.length]);

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
                <Image src={product?.image} alt={product?.name} layout="fill" />
            </div>

            <div className={styles.product_details_div}>
                <h3 className={styles.product_name}>{product?.name}</h3>
                <p className={styles.product_description}>{product?.description}</p>
                <h2 className={styles.product_price}>₹{product?.price}</h2>
                <p className={styles.deliveryText}>FREE Delivery</p>
                <Rating ratings={ratings} reviews={reviews} />
            </div>
        </div>

        <DeliveryDate delivery_date={delivery_date} />

        <Reviews />

        {profile && <div className={styles.add_to_cart_div}>
          <button onClick={isInCart ? goToCart : addToCart}>{isInCart ? 'Go To Cart' : 'Add To Cart'}</button>
        </div>}
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
    }
    else if(cookieObj.cm_seller_token) {
      await store.dispatch(actionCreators.sellerProfile(cookieObj.cm_seller_token));
    }
});