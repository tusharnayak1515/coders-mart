import React from 'react';

import styles from "../styles/productPage.module.css";

const CartButtonDiv = ({isInCart,goToCart,addToCart}) => {
  return (
    <div className={styles.add_to_cart_div}>
        <button onClick={isInCart ? goToCart : addToCart}>{isInCart ? 'Go To Cart' : 'Add To Cart'}</button>
    </div>
  )
}

export default CartButtonDiv;