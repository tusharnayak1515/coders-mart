import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actionCreators } from '../redux';
import { AiFillStar } from 'react-icons/ai';

import styles from "../styles/reviewForm.module.css";
import { useRouter } from 'next/router';

const ReviewForm = ({product,review}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [stars, setStars] = useState(Array(5).fill(0));
  const [val, setVal] = useState(undefined);
  const [reviewDetails, setReviewDetails] = useState({
    id: review ? review?._id : undefined,
    ratings: review ? review?.ratings : 0,
    review: review ? review?.review : "",
    productId: review ? review?.product : product?._id,
  });

  const onRateClick = (e, value) => {
    e.preventDefault();
    setReviewDetails({ ...reviewDetails, ratings: value });
  };

  const onStarHover = (e, value)=> {
    e.preventDefault();
    setVal(value);
  }

  const onStarBlur = (e)=> {
    e.preventDefault();
    setVal(undefined);
  }

  const onReviewChange = (e) => {
    e.preventDefault();
    setReviewDetails({ ...reviewDetails, review: e.target.value });
  };

  const onReviewSubmit = (e) => {
    e.preventDefault();
    const { ratings, review, productId } = reviewDetails;
    if (
      ratings > 0 &&
      ratings <= 5 &&
      (review.trim() === "" || (review.length >= 5 && review.length <= 100)) &&
      productId
    ) {
        if(review) {
            dispatch(actionCreators.editReview(reviewDetails));
        }
        else {
            dispatch(actionCreators.addReview(reviewDetails));
        }
        router.back();
    } else {
      if (ratings <= 0) {
        toast.warn("Ratings should be minimum 1 and maximum 5!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (
        review.trim() !== "" &&
        (review.length < 5 || review.length > 100)
      ) {
        toast.warn("Review should be of 5 to 100 characters!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!product) {
        toast.warn("Product not found!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const onReviewDelete = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.deleteReview(review?._id));
    router.back();
  }

  return (
    <div className={styles.review_page}>
      <div className={styles.rating_div}>
        <h2 className={styles.rating_header}>Rate this product</h2>
        <div className={styles.stars_div}>
          {stars.map((_, index) => {
            return (
              <AiFillStar
                key={index}
                className={styles.star_icon}
                style={{
                  color: (val || reviewDetails.ratings) > index ? "green" : "grey",
                }}
                onClick={(e) => onRateClick(e, index + 1)}
                onMouseOver={(e)=> onStarHover(e,index+1)}
                onMouseLeave={onStarBlur}
              />
            );
          })}
        </div>
      </div>

      <form className={styles.reviewForm} onSubmit={onReviewSubmit}>
        <div className={styles.pair_div}>
          <h2 className={styles.rating_header}><label htmlFor="review">Review this product</label></h2>
          <textarea name="review" id="review" placeholder="Product Review" value={reviewDetails.review} onChange={onReviewChange} />
        </div>

        <div className={styles.btn_div}>
            <button>Submit</button>
            {review && <button className={styles.delete_btn} onClick={onReviewDelete}>Delete</button>}
        </div>

      </form>

    </div>
  )
}

export default ReviewForm;