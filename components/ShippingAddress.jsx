import React from 'react';
import Link from 'next/link';

import styles from "../styles/cart.module.css";

const ShippingAddress = ({profile}) => {
  return (
    <div className={styles.location_div}>
        <div className={styles.user_location}>
            <p className={styles.user_name_pincode}>
                Deliver to: <span>{profile?.name.substring(0, 10)}...,</span>
                <b>{profile?.address.pincode}</b>
            </p>
            <p className={styles.street_details}>
                {profile?.address?.street?.substring(0, 30)}...
            </p>
        </div>

        <Link href="/user/editaddress">
            <button className={styles.change_address_btn}>Change</button>
        </Link>
    </div>
  )
}

export default ShippingAddress