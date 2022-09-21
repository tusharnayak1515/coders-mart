import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { actionCreators } from '../redux';

import styles from "../styles/review.module.css";

const ReviewItem = ({review}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, profile} = useSelector(state=>state.userReducer,shallowEqual);
  const {seller} = useSelector(state=>state.sellerReducer,shallowEqual);
  const [title, setTitle] = useState("");

  const isLiked = review.likes.includes(profile?._id);

  const onMenuClick = (e)=> {
    e.preventDefault();
    router.push(`/reviews/edit/${review._id}`);
  }

  const onLike = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.likeReview(review?._id));
  }

  const onUnLike = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.unlikeReview(review?._id));
  }

  useEffect(()=> {
    if(review.ratings >=1 && review.ratings < 2) {
      setTitle("Horrible");
    }
    else if(review.ratings >=2 && review.ratings < 3) {
      setTitle("Terrific");
    }
    else if(review.ratings >=3 && review.ratings < 4) {
      setTitle("Delightful");
    }
    else if(review.ratings >=4 && review.ratings <= 5) {
      setTitle("Awesome");
    }
  }, [review.ratings]);

  return (
    <div className={styles.review}>
      <div className={styles.review_top_div}>
        <div className={styles.rating_box}>
            <h5>{review.ratings}</h5>
            <AiFillStar className={styles.star_icon} />
        </div>
        <h4>{title}</h4>
      </div>

      <p className={styles.reviewText}>{review.review}</p>

      <div className={styles.flex_div}>
        <span className={styles.review_user_name}>{review.user.name}</span>
        {(user && !seller) && <div className={styles.review_actions_div}>
          <AiFillLike className={styles.review_action_icons} onClick={onLike} style={{color: isLiked ? "#244d61" : "grey"}} />
          <span className={styles.review_likes_count}>{review.likes.length}</span>
          <AiFillDislike className={styles.review_action_icons} onClick={onUnLike} />
          {profile?._id === review.user._id && <BsThreeDotsVertical className={styles.review_action_icons} onClick={onMenuClick} />}
        </div>}
      </div>
    </div>
  )
}

export default ReviewItem;