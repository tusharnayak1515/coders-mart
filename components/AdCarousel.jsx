import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import slide1 from "../public/static/images/slide1.jpg";
import slide2 from "../public/static/images/slide2.jpg";
import slide3 from "../public/static/images/slide3.webp";
import slide4 from "../public/static/images/slide4.jpg";
import slide5 from "../public/static/images/slide5.jpg";

import styles from "../styles/adCarousel.module.css";

const AdCarousel = () => {
  const [index, setIndex] = useState(0);

  const carousel_items = [slide1,slide2,slide3,slide4,slide5];
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
