import React, { useEffect} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
import { FaAngleRight, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import styles from "../../styles/profile.module.css";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  const onEditProfileClick = (e)=> {
    e.preventDefault();
    router.push("/user/editprofile");
  }

  const onEditAddressClick = (e)=> {
    e.preventDefault();
    router.push("/user/editaddress");
  }

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  return( 
    <div className={styles.profilePage}>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content={`nextjs, e-commerce, coders-mart, profile, ${profile?.name}`} />
      </Head>

      <div className={styles.profile_top_div}>
        <h3 className={styles.greet}>Hey! {profile?.name.split(" ")[0]}</h3>
        <Link href="/user/orders"><button className={styles.user_orders_btn}>Orders</button></Link>
      </div>

      <div className={styles.account_settings_div}>
        <h3 className={styles.box_head}>Account Settings</h3>

        <div className={styles.profile_flex_div} onClick={onEditProfileClick}>
          <div className={styles.left}>
          <FaUser className={styles.settings_icons} />
            <p>Edit Profile</p>
          </div>

          <FaAngleRight className={styles.settings_action_icons} />
        </div>

        <div className={styles.profile_flex_div} onClick={onEditAddressClick}>
          <div className={styles.left}>
            <MdLocationOn className={styles.settings_icons} />
            <p>Edit Address</p>
          </div>

          <FaAngleRight className={styles.settings_action_icons} />
        </div>
      </div>

      <div className={styles.tc_div}>
        <h3 className={styles.box_head}>Terms &amp; Conditions</h3>

        <div className={styles.profile_flex_div}>
          <div className={styles.left}>
            <CgNotes className={styles.settings_icons} />
            <p>Terms, Policies &amp; Licences</p>
          </div>

          <FaAngleRight className={styles.settings_action_icons} />
        </div>

        <div className={styles.profile_flex_div}>
          <div className={styles.left}>
            <AiOutlineQuestionCircle className={styles.settings_icons} />
            <p>Browse FAQs</p>
          </div>

          <FaAngleRight className={styles.settings_action_icons} />
        </div>
      </div>

      <div className={styles.profile_bottom_div}>
          <button className={styles.logout_btn} onClick={onLogout}>Logout</button>
      </div>
    </div>
  )};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.cm_user_token) {
      await store.dispatch(actionCreators.userProfile(cookieObj.cm_user_token));
    }
  }
);