import React from 'react';

import styles from "../styles/profile.module.css";

const GreetUser = ({profile}) => {
  return (
    <h3 className={styles.greet}>Hey! {profile?.name.split(" ")[0]}</h3>
  )
}

export default GreetUser;