import React from 'react';

import styles from "../styles/earningHistory.module.css";

const EarningHistory = ({sale}) => {
  const saleDate = sale?.date;
  let date = new Date(saleDate).getDate();
  let month = new Date(saleDate).getMonth();
  let year = new Date(saleDate).getFullYear();
  
  if(date < 10) {
    date = '0' + date;
  }
  if(month < 10) {
    month = '0' + month;
  }
  if(year < 10) {
    year = '0' + year;
  }

  const formattedTime = `${date}/${month}/${year}`;
  
  return (
    <div className={styles.earning_div}>
      <b>{formattedTime}</b>
      <b className={styles.money}>₹ {sale?.money}</b>
    </div>
  )
}

export default EarningHistory;