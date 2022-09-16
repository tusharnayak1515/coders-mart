import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
import { toast } from "react-toastify";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import styles from "../../styles/addReviewPage.module.css";

const AddReviewPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { seller } = useSelector((state) => state.sellerReducer, shallowEqual);
  const { product } = useSelector(
    (state) => state.productReducer,
    shallowEqual
  );
  const [stars, setStars] = useState(Array(5).fill(0));
  const [val, setVal] = useState(undefined);
  const [reviewDetails, setReviewDetails] = useState({
    ratings: 0,
    review: "",
    productId: router.query.pid,
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
    const { ratings, review } = reviewDetails;
    if (
      ratings > 0 &&
      ratings <= 5 &&
      (review.trim() === "" || (review.length >= 5 && review.length <= 100)) &&
      product
    ) {
      dispatch(actionCreators.addReview(reviewDetails));
      router.replace(`/products/product/${router.query.pid}`);
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

  useEffect(() => {
    if (seller) {
      router.replace("/seller/dashboard");
    } else if (!user) {
      router.replace("/");
    }
  }, [user, seller, router]);

  return (
    <div className={styles.addReviewPage}>
      <Head>
        <title>Add Review</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta
          name="keywords"
          content={`nextjs, e-commerce, coders-mart, add review, reviews`}
        />
      </Head>

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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddReviewPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params } = context;
    if (params.pname !== "") {
      await store.dispatch(actionCreators.getProduct(params.pid));
    }
  }
);
