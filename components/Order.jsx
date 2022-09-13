import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

import styles from "../styles/order.module.css";

const Order = ({ order }) => {
  const router = useRouter();

  const onOrderClick = (e,p)=> {
    e.preventDefault();
    router.push(`/user/${order._id}/${p}`);
  }

  return (
    <div className={styles.order}>
      {order.products.map((p, index) => {
        let date = new Date();
        return (
          <div className={styles.orderItem} key={p._id+index+date.getTime()}>
            <div className={styles.orderItem_img_div}>
              <Image src={p.image} alt={p.name} layout="fill" />
            </div>

            <div className={styles.order_status}>
                <p>Status: {order.status}</p>
                <p>{p.name}</p>
            </div>
            
            <FaAngleRight className={styles.order_action_btn} onClick={(e)=> onOrderClick(e,p._id)} />
          </div>
        );
      })}
    </div>
  );
};

export default Order;
