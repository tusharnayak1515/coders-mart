import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { shallowEqual, useSelector } from "react-redux";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
const ReviewForm = dynamic(()=> import("../../components/ReviewForm"));

const AddReviewPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { seller } = useSelector((state) => state.sellerReducer, shallowEqual);
  const { product } = useSelector(
    (state) => state.productReducer,
    shallowEqual
  );

  useEffect(() => {
    if (seller) {
      router.replace("/seller/dashboard");
    } else if (!user) {
      router.replace("/");
    }
  }, [user, seller, router]);

  return (
    <div>
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

      <ReviewForm product={product} />
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
