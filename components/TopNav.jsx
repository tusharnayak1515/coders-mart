import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux";
import { IoMdSearch } from "react-icons/io";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserAlt, FaThLarge } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

import styles from "../styles/topnav.module.css";

const TopNav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { seller } = useSelector((state) => state.sellerReducer, shallowEqual);
  const { cart } = useSelector((state) => state.cartReducer, shallowEqual);
  const [name, setName] = useState("");

  const onNameChange = (e)=> {
    e.preventDefault();
    setName(e.target.value);
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(actionCreators.logout());
  };

  const onSearch = (e)=> {
    e.preventDefault();
    if(name !== "") {
      router.push(`/products/search/${name}`)
    }
  }

  if (
    router.pathname === "/user/editprofile" ||
    router.pathname === "/seller/editprofile" ||
    router.pathname === "/user/editaddress" ||
    router.pathname === "/seller/editaddress"
  ) {
    return null;
  }

  return (
    <div className={styles.topnav}>
      <div className={styles.logoDiv}>
        <Link href={user ? "/" : "/seller/dashboard"}>
          <h2 className={styles.logo}>CodersMart</h2>
        </Link>

        <form className={styles.searchDiv} onSubmit={onSearch}>
          <input type="text" placeholder="Search Products" value={name} onChange={onNameChange} />
          <button className={styles.searchIcon}><IoMdSearch /></button>
        </form>
        
        <div className={styles.menuDiv}>
          {user && (
            <div className={`${styles.cart_icon}`}>
              <Link href="/user/cart"><a className={styles.cart_count}>{cart ? cart?.products.length : 0}</a></Link>
              <Link href="/user/cart">
                <a>
                  <BsFillCartFill className={styles.menu_icons} />
                </a>
              </Link>
            </div>
          )}
          {user && (
            <Link href="/user/profile">
              <a>
                <FaUserAlt className={styles.menu_icons} />
              </a>
            </Link>
          )}
          {!user && !seller && (
            <Link href="/user/login">
              <a className={styles.menu_icons} style={{fontSize: "1.5rem"}}>Login</a>
            </Link>
          )}
          {seller && (
            <Link href="/seller/dashboard">
              <a>
                <FaThLarge className={styles.menu_icons} />
              </a>
            </Link>
          )}
          {seller && (
            <Link href="/products/addproduct">
              <a>
                <IoMdAdd className={styles.menu_icons} />
              </a>
            </Link>
          )}
          {seller && (
            <Link href="/seller/profile">
              <a>
                <FaUserAlt className={styles.menu_icons} />
              </a>
            </Link>
          )}
          {(user || seller) && (
            <a onClick={onLogout}>
              <RiShutDownLine className={`${styles.menu_icons} ${styles.logout_btn}`} />
            </a>
          )}
        </div>
      </div>

      <form className={styles.searchDiv} onSubmit={onSearch}>
        <input type="text" placeholder="Search Products" value={name} onChange={onNameChange} />
        <button className={styles.searchIcon}><IoMdSearch /></button>
      </form>
    </div>
  );
};

export default TopNav;
