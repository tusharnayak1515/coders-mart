import Image from "next/image";
import Link from "next/link";
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
          <Link href={`/user/${order._id}/${p._id}`} key={p._id+index+date.getTime()*Math.random(1,100)}>
            <div className={styles.orderItem}>
              <div className={styles.orderItem_img_div}>
                <Image src={p.image} alt={p.name} layout="fill" />
              </div>

              <b className={styles.order_product_price}>₹ {p.price}</b>
              
              <div className={styles.order_status}>
                  <p>Status: {order.status}</p>
                  <p>{p.name}</p>
              </div>
              
              <FaAngleRight className={styles.order_action_btn} onClick={(e)=> onOrderClick(e,p._id)} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Order;
