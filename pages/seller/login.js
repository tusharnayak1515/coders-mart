import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import { toast } from "react-toastify";

import styles from "../../styles/login_register.module.css";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.sellerReducer, shallowEqual);
  const [sellerDetails, setSellerDetails] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSellerDetails({ ...sellerDetails, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {email,password} = sellerDetails;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (
      emailRegex.test(email) === true &&
      /\s/.test(password) === false &&
      password.length > 0
    ) {
      dispatch(actionCreators.sellerLogin(sellerDetails));
    }
    else if (emailRegex.test(email) === false) {
      toast.warn("Enter a valid email!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.warn("Password cannot be empty and must not contain any spaces!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (seller) {
      router.replace("/seller/dashboard");
    }
  }, [seller, router]);

  return (
    <div className={styles.login_register}>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content="nextjs, e-commerce, coders-mart" />
      </Head>

      <h3 className={styles.head}>Log in to track your sales &amp; earnings!</h3>
      <form className={styles.form_div} onSubmit={onSubmitHandler}>
        <div className={styles.input_div}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={sellerDetails.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={sellerDetails.password}
            onChange={onChangeHandler}
          />

          <Link href="/seller/forgotpassword">
            <p className={styles.forgot_password}>Forgot Password?</p>
          </Link>

          <div className={styles.flex_div}>
            <p className={styles.otherText}>
              New Seller?{" "}
              <Link href="/seller/register">
                <span className={styles.otherLink}>Register</span>
              </Link>
            </p>

            <p className={styles.otherText}>
              Login as User?{" "}
              <Link href="/user/login">
                <span className={styles.otherLink}>Login</span>
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.btn_div}>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
