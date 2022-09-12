import React from "react";

import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo_div}>
        <h2>Coders-Mart</h2>
      </div>

      <div className={styles.footer_links}>
        <div className={styles.columnDiv}>
          <h4>ABOUT</h4>
          <p>About Us</p>
        </div>

        <div className={styles.columnDiv}>
          <h4>SOCIAL</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>

        <div className={styles.columnDiv}>
          <h4>CONTACT US</h4>
          <p>Infocity Chowk, Bhubaneswar, Odisha, India</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
