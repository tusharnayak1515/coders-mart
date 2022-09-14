import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import carousel1 from "../public/static/images/carousel1.jpg";
import carousel2 from "../public/static/images/carousel2.jpg";
import carousel3 from "../public/static/images/carousel3.jpg";
import carousel4 from "../public/static/images/carousel4.jpg";
import carousel5 from "../public/static/images/carousel5.jpg";

import styles from "../styles/adCarousel.module.css";

const AdCarousel = () => {
  const [index, setIndex] = useState(0);

  const carousel_items = [carousel1,carousel2,carousel3,carousel4,carousel5];
  const length = carousel_items.length;

  const [myArr,setMyArr] = useState([...carousel_items]);

  const updateIndex = useCallback(
    (newIndex) => {
      setIndex(newIndex);
    },
    [length]
  );

  useEffect(() => {
    const changeSlide = setInterval(() => {
      updateIndex(index + 1);
    }, 2500);
    setMyArr([...myArr, myArr[index]]);
    return () => {
        if(changeSlide) {
            clearInterval(changeSlide);
        }
    };
  }, [length, updateIndex, index]);

  return (
    <div className={styles.adCarousel}>
        <div className={styles.slider_container} style={{transform: `translateX(-${index*100}%)`}}>
            {myArr.map((n, i) => {
                return (
                    <div className={styles.slider_div} key={i}>
                        <Image src={n} alt="Carousel" layout="fill" />
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default AdCarousel;
