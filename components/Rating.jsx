import React from 'react';
import { AiFillStar } from 'react-icons/ai';

import styles from "../styles/productPage.module.css";

const Rating = ({ratings, reviews}) => {
  return (
    <div className={styles.product_rating_div}>
        <div className={styles.product_rating_box}>
            <h5>{ratings}</h5>
            <AiFillStar className={styles.star_icon} />
        </div>

        <p className={styles.rating_count}>{reviews?.length} ratings</p>
    </div>
  )
}

export default Rating;