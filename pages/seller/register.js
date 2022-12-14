import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import { toast } from "react-toastify";

import styles from "../../styles/login_register.module.css";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.sellerReducer, shallowEqual);
  const [sellerDetails, setSellerDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSellerDetails({ ...sellerDetails, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = sellerDetails;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if (
      name.length >= 3 &&
      name.length <= 25 &&
      emailRegex.test(email) === true &&
      passwordRegex.test(password) === true &&
      /\s/.test(password) === false
    ) {
      dispatch(actionCreators.sellerRegister(sellerDetails));
    } else if (emailRegex.test(email) === false) {
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
        <title>Register</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content="nextjs, e-commerce, coders-mart" />
      </Head>

      <h3 className={styles.head}>Join and grow with us as a seller!</h3>
      <form className={styles.form_div} onSubmit={onSubmitHandler}>
        <div className={styles.input_div}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={sellerDetails.name}
            onChange={onChangeHandler}
          />
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

          <div className={styles.flex_div}>
            <p className={styles.otherText} style={{ alignSelf: "flex-end" }}>
              Old User?{" "}
              <Link href="/seller/login">
                <span className={styles.otherLink}>Login</span>
              </Link>
            </p>

            <p className={styles.otherRole}>
              Shop with Us?{" "}
              <Link href="/user/register">
                <span className={styles.otherLink}>Register</span>
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

export default Register;
