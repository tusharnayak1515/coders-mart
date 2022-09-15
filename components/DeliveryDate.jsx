import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { FaTruck } from 'react-icons/fa';

import styles from "../styles/deliveryDate.module.css";

TimeAgo.addLocale(en);

const DeliveryDate = () => {
  const timeAgo = new TimeAgo('en-US');
  const {user, profile} = useSelector(state=> state.userReducer,shallowEqual);
  const date = new Date();
  const delivery_date = new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000));

  return (
    <div className={styles.delivery_details_div}>
      {user && <div className={styles.deliver_to}>
        <p>Deliver to: </p>
        {profile?.address.pincode ? <h4 className={styles.user_pincode}>{profile?.address.pincode}</h4> : <button className={styles.add_address}>Add Address</button>}
      </div>}

      <div className={styles.delivery_time_div}>
        <FaTruck className={styles.delivery_icon} />
        <p>Delivery {timeAgo.format(delivery_date)}</p>
      </div>
    </div>
  )
}

export default DeliveryDate;