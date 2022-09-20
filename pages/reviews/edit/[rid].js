import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';
const ReviewForm = dynamic(()=> import("../../../components/ReviewForm"));

const EditReviewPage = () => {
  const router = useRouter();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);
  const {review} = useSelector(state=> state.reviewReducer,shallowEqual);

  useEffect(()=> {
    if(seller) {
        router.replace("/seller/dashboard");
    }
    else if(!user) {
        router.replace("/");
    }
  }, [seller, user, router]);

  return (
    <div>
      <Head>
          <title>Edit Review</title>
          <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
          />
          <meta
          name="keywords"
          content={`nextjs, e-commerce, coders-mart, edit review, reviews`}
          />
      </Head>

      <ReviewForm review={review} />
    </div>
  )
}

export default EditReviewPage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const mycookie = context?.req?.headers?.cookie || "";
      const cookieObj = cookie.parse(mycookie);
      const { params } = context;
      if (params.rid !== "" && cookieObj.cm_user_token) {
        await store.dispatch(actionCreators.getReview({id: params.rid, token: cookieObj.cm_user_token}));
      }
    }
);