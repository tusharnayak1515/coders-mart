import React from 'react';
import ReactDom from 'react-dom';
import Image from 'next/image';
import loading from "../public/static/images/loading.svg";

import styles from "../styles/loadingSpinner.module.css";

const LoadingSpinner = () => {
  return ReactDom.createPortal(
    <div className={styles.loading_overlay}>
        <div className={styles.loading_modal}>
            <Image src={loading} alt="Loading Spinner" layout='fill' />
        </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default LoadingSpinner;