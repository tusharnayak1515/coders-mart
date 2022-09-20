import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
const PasswordModal = dynamic(()=> import("../../components/PasswordModal"));
import { toast } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';

import styles from "../../styles/editProfile.module.css";

const Editprofile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, profile} = useSelector(state=> state.userReducer,shallowEqual);
  const { seller } = useSelector(state => state.sellerReducer,shallowEqual);
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
        pincode: profile?.address.pincode ? profile?.address.pincode : ""
    }
  });

  const [show, setShow] = useState(false);

  const onChangeHandler = (e)=> {
    e.preventDefault();
    const {name, value} = e.target;
    setUserDetails({...userDetails, [name]: value});
  }

  const passwordChangeClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const onSubmitHandler = (e)=> {
    e.preventDefault();
    const {name, email} = userDetails;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if((name.length >= 3 && name.length <= 25) && emailRegex.test(email)) {
        dispatch(actionCreators.editUserProfile(userDetails));
        router.back();
    }
    else {
        if(name.length < 3 || name.length > 25) {
            toast.warn("Name must be of minimum 3 and maximum 25 characters!", {
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
            toast.warn("Enter a valid email!", {
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
  }

  const onBackClick = (e)=> {
    e.preventDefault();
    router.back();
  }

  useEffect(() => {
    if(seller) {
      router.replace("/seller/editprofile");
    }
    else if (!seller && !user) {
      router.replace("/");
    }
  }, [user, seller, router]);

  return (
    <div className={styles.editProfilePage}>
        <Head>
            <title>Edit Profile</title>
            <meta
            name="description"
            content="Coders-Mart is an e-commerce webapp made using NEXT JS."
            />
            <meta name="keywords" content={`nextjs, e-commerce, coders-mart, edit profile, ${profile?.name}`} />
        </Head>

        {show && <PasswordModal setShow={setShow} />}
        <div className={styles.editProfile_top_div}>
            <div className={styles.back_btn_div}>
                <BiArrowBack className={styles.back_btn} onClick={onBackClick} />
                {/* Logo */}
            </div>

            <div className={styles.dpDiv}>
                <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt='Profile' layout='fill' />
            </div>
        </div>

        <form className={styles.editProfile_form_div} onSubmit={onSubmitHandler}>
            <div className={styles.edit_pair}>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' id='name' placeholder='Name' value={userDetails.name} onChange={onChangeHandler} />
            </div>

            <div className={styles.edit_pair}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' placeholder='Email ID' value={userDetails.email} onChange={onChangeHandler} />
            </div>

            <div className={styles.edit_pair}>
                <label htmlFor="phone">Mobile Number</label>
                <input type="number" name='phone' id='phone' placeholder='Phone' value={userDetails.phone} onChange={onChangeHandler} />
            </div>

            <button className={styles.editProfile_submit_btn}>Submit</button>
        </form>

        <div className={styles.editProfile_bottom_div}>
            <h3 className={styles.actions} onClick={passwordChangeClick}>Change Password</h3>
        </div>
    </div>
  )
}

export default Editprofile;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const mycookie = context?.req?.headers?.cookie || "";
      const cookieObj = cookie.parse(mycookie);
      if (cookieObj.cm_user_token) {
        await store.dispatch(actionCreators.userProfile(cookieObj.cm_user_token));
      }
    }
);