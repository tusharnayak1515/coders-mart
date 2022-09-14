import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import styles from "../styles/adCarousel.module.css";

const AdCarousel = () => {
  const [index, setIndex] = useState(0);

  const carousel_items = [
    "https://pixabay.com/get/g51ebd4cdd063d4b6936639b0a975ba70322ed673a412d5e959cd91dac1e6921150be1d614fe1f0406e16fd545a29d777.jpg",
    "https://pixabay.com/get/gf3afacc02f0b9f043300130f23250d4f17a978fdd6f6529e121cb5a08a1792552871d0d253d39b7857f30b6587f2df68.jpg",
    "https://pixabay.com/get/g785814657d5a88dae97c1141b93c2ead6ffb48a6f04b280834b20bd39de9f871089f9124f29526a314984b61fc663090.jpg",
    "https://pixabay.com/get/g233f20fed2775e8f4dc462294a1914d4ea2910392b9cbefb35716b61921722a6e6d0d18eb29bb9871ef71b5ffe4a91af.jpg",
    "https://pixabay.com/get/g8309001dd01db0ecf9666b1e013d758c82975fbb05784cf59c158c393cdf4724a725b6160d5b07e5d84b7738d1d1fb61.jpg",
  ];
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
