import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const ReviewItem = dynamic(()=> import("./ReviewItem"), {ssr: false});

import styles from "../styles/reviews.module.css";

const Reviews = () => {
  const router = useRouter();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);
  const {product} = useSelector(state=> state.productReducer,shallowEqual);
  const {reviews} = useSelector(state=> state.reviewReducer,shallowEqual);
  const {orders} = useSelector(state=> state.orderReducer,shallowEqual);
  const [haveBought,setHaveBought] = useState(false);

  const onRate = (e)=> {
    e.preventDefault();
    if(seller && !user) {
      toast.warn("You need to be logged in as a user to rate a product!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(user && !haveBought) {
      toast.warn("You cannot rate a product that you have not purchased!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(!user && !seller) {
      router.replace("/user/login");
      toast.warn("You need to be logged in to rate a product!", {
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
      router.push(`/reviews/${product?._id}`);
    }
  }

  useEffect(()=> {
    for (let i = 0; i < orders?.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        if(orders[i].products[j]._id === product?._id) {
          setHaveBought(true);
          break;
        }
      }
    }
  }, [orders?.length, product?._id]);

  return (
    <div className={styles.reviews}>
        <div className={styles.reviews_top_div}>
          <h3 className={styles.reviews_head}>Ratings &amp; Reviews</h3>
          <button className={styles.rate_btn} onClick={onRate}>Rate Product</button>
        </div>

        {reviews && reviews?.length === 0 ? <p className={styles.no_reviews}>No Reviews</p> : reviews?.map((review)=> {
          return <ReviewItem key={review._id} review={review} />
        })}

    </div>
  )
}

export default Reviews;