import React from 'react';
import Link from 'next/link';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { IoMdSearch } from 'react-icons/io';
import { BsFillCartFill } from 'react-icons/bs';
import { FaUserAlt, FaThLarge } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import styles from "../styles/topnav.module.css";

const TopNav = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  return (
    <div className={styles.topnav}>
        <div className={styles.logoDiv}>
            <Link href="/"><h2 className={styles.logo}>Coders-Mart</h2></Link>
            <div className={styles.menuDiv}>
              {user && <Link href="/user/cart"><a><BsFillCartFill className={styles.menu_icons} /></a></Link>}
              {user && <Link href="/user/profile"><a><FaUserAlt className={styles.menu_icons} /></a></Link>}
              {(!user && !seller) && <Link href="/user/login"><a className={styles.menu_icons}>Login</a></Link>}
              {seller && <Link href="/products/addproduct"><a><IoMdAdd className={styles.menu_icons} /></a></Link>}
              {seller && <Link href="/seller/dashboard"><a><FaThLarge className={styles.menu_icons} /></a></Link>}
              {seller && <Link href="/seller/profile"><a><FaUserAlt className={styles.menu_icons} /></a></Link>}
              {(user || seller) && <a onClick={onLogout}><BiLogOut className={styles.menu_icons} /></a>}
            </div>
        </div>

        <form className={styles.searchDiv}>
            <input type="text" placeholder='Search Products' />
            <IoMdSearch className={styles.searchIcon} />
        </form>
    </div>
  )
}

export default TopNav;