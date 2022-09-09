import React from 'react';
import Link from 'next/link';

import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <div className={styles.logoDiv}>
            <h1 className={styles.logo}>Coders-Mart</h1>
        </div>

        <form className={styles.searchDiv}>
            <input type="text" placeholder='Search Products' />
            {/* <button>Search</button> */}
        </form>

        <div className={styles.menuDiv}>
            <Link href="/"><h3>Home</h3></Link>
            <Link href="/profile"><h3>Profile</h3></Link>
            <h3>Logout</h3>
        </div>
    </div>
  )
}

export default Navbar