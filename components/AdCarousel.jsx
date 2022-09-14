import React from 'react';
import Image from 'next/image';
import carousel1 from "../public/static/images/carousel1.jpeg";

import styles from "../styles/adCarousel.module.css";

const AdCarousel = () => {
  return (
    <div className={styles.adCarousel}>
        <div className={styles.slider_div}>
            <Image src={carousel1} alt="Carousel" layout='fill'/>
        </div>
        {/* {[0,1,2,3,4].map((n)=> {
            return <Image key={n} src={carousel1} alt="Carousel" height="30px" width="100px" />
        })} */}
    </div>
  )
}

export default AdCarousel;