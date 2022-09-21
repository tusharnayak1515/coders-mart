import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';
import Image from 'next/image';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import styles from "../styles/cartProduct.module.css";

TimeAgo.addLocale(en);

const CartProduct = ({product}) => {
  const dispatch = useDispatch();
  const timeAgo = new TimeAgo('en-US');
  const date = new Date();
  const delivery_date = new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000));

  const removeFromCart = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.removeFromCart(product?._id));
  }

  return (
    <div className={styles.cartProductDetails}>
        <div className={styles.cartProduct}>
            <div className={styles.cartProduct_img_div}>
              <Image src={product?.image} alt={product?.name} layout="fill" />
            </div>

            <div className={styles.product_info_div}>
              <p className={styles.cartProduct_name}>{product?.name}</p>
              <p className={styles.cartProduct_description}>{product?.description.substring(0,25)}...</p>
              {product?.size && <p className={styles.cartProduct_size}>Size: <span>{product?.size}</span></p>}
              <p className={styles.cartProduct_price}>₹ {product?.price}</p>
              <p className={styles.cartProduct_delivery}>Delivery <span>{timeAgo.format(delivery_date)}</span></p>
            </div>
        </div>

        <div className={styles.remove_product_div}>
          <button className={styles.remove_product_btn} onClick={removeFromCart}>Remove</button>
        </div>
    </div>
  )
}

export default CartProduct