import React from 'react';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
const ReviewItem = dynamic(()=> import("./ReviewItem"), {ssr: false});

import styles from "../styles/reviews.module.css";

const Reviews = () => {
  const {reviews} = useSelector(state=> state.reviewReducer,shallowEqual);

  return (
    <div className={styles.reviews}>
        <div className={styles.reviews_top_div}>
            <h3 className={styles.reviews_head}>Ratings &amp; Reviews</h3>
            <button className={styles.rate_btn}>Rate Product</button>
        </div>

        {reviews && reviews?.length === 0 ? <p className={styles.no_reviews}>No Reviews</p> : reviews?.map((review)=> {
            return <ReviewItem key={review._id} review={review} />
        })}

    </div>
  )
}

export default Reviews;