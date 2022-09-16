import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { actionCreators } from "../../redux";
import { wrapper } from "../../redux/store";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";

import styles from "../../styles/editAddress.module.css";

const Editaddress = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer,shallowEqual);
  const { seller, profile } = useSelector(state => state.sellerReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({
    name: profile?.name,
    email: profile?.email,
    phone: profile?.phone ? profile?.phone : "",
    address: {
      street: profile?.address.street ? profile?.address.street : "",
      city: profile?.address.city ? profile?.address.city : "",
      district: profile?.address.district ? profile?.address.district : "",
      state: profile?.address.state ? profile?.address.state : "",
      country: profile?.address.country ? profile?.address.country : "",
      pincode: profile?.address.pincode ? profile?.address.pincode : "",
    },
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      address: { ...userDetails.address, [name]: value },
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { street, city, district, state, country, pincode } =
      userDetails.address;
    if (
      street &&
      street.length > 0 &&
      city &&
      city.length > 0 &&
      district &&
      district.length > 0 &&
      state &&
      state.length > 0 &&
      country &&
      country.length > 0 &&
      pincode &&
      pincode.toString().length === 6
    ) {
      dispatch(actionCreators.editSellerProfile(userDetails));
      router.back();
    } else {
      if (street !== null && street.length <= 0) {
        toast.warn("Street cannot be empty!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (city !== null && city.length <= 0) {
        toast.warn("City cannot be empty!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (district !== null && district.length <= 0) {
        toast.warn("District cannot be empty!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (state !== null && state.length <= 0) {
        toast.warn("State cannot be empty!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (country !== null && country.length <= 0) {
        toast.warn("Country cannot be empty!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (pincode !== null && pincode.toString().length !== 6) {
        toast.warn("Pincode must be of 6 digits!", {
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

  const onBackClick = (e) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    if(user) {
      router.replace("/user/editaddress");
    }
    else if (!seller) {
      router.replace("/seller/login");
    }
  }, [user, seller, router]);

  return (
    <div className={styles.editAddress}>
      <Head>
        <title>Edit Address</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta
          name="keywords"
          content={`nextjs, e-commerce, coders-mart, edit address, ${profile?.name}`}
        />
      </Head>

      <div className={styles.editAddress_top_div}>
        <BiArrowBack className={styles.back_btn} onClick={onBackClick} />
        {/* Logo  */}
        <h3 className={styles.editAddress_head}>Delivery Address</h3>
      </div>

      <form className={styles.editAddress_form_div} onSubmit={onSubmitHandler}>
        <div className={styles.address_pair}>
          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            name="pincode"
            id="pincode"
            placeholder="Pincode (Required)"
            value={userDetails.address.pincode}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.address_pair}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            id="street"
            placeholder="House No., Colony (Required)"
            value={userDetails.address.street}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.address_pair}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City (Required)"
            value={userDetails.address.city}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.address_pair}>
          <label htmlFor="district">District</label>
          <input
            type="text"
            name="district"
            id="district"
            placeholder="District (Required)"
            value={userDetails.address.district}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.address_pair}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            placeholder="State (Required)"
            value={userDetails.address.state}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.address_pair}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country (Required)"
            value={userDetails.address.country}
            onChange={onChangeHandler}
          />
        </div>

        <button className={styles.editAddress_submit_btn}>Save Address</button>
      </form>
    </div>
  );
};

export default Editaddress;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.cm_seller_token) {
      await store.dispatch(actionCreators.sellerProfile(cookieObj.cm_seller_token));
    }
  }
);
