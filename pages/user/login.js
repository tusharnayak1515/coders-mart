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
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {email,password} = userDetails;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (
      emailRegex.test(email) === true &&
      /\s/.test(password) === false &&
      password.length > 0
    ) {
      dispatch(actionCreators.userLogin(userDetails));
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
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

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

      <h3 className={styles.head}>Log in for the best experience</h3>
      <form className={styles.form_div} onSubmit={onSubmitHandler}>
        <div className={styles.input_div}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={onChangeHandler}
          />

          <Link href="/user/forgotpassword">
            <p className={styles.forgot_password}>Forgot Password?</p>
          </Link>

          <p className={styles.otherText}>
            New User?{" "}
            <Link href="/user/register">
              <span className={styles.otherLink}>Register</span>
            </Link>
          </p>
        </div>

        <div className={styles.btn_div}>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
