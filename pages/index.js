import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
const Products = dynamic(()=> import("../components/Products"), {ssr: true});
const Footer = dynamic(()=> import("../components/Footer"), {ssr: true});
const AdCarousel = dynamic(()=> import("../components/AdCarousel"), {ssr: true});

import electronics from "../public/static/images/electronics.jpg";
import eyeware from "../public/static/images/eyewear.jpg";
import books from "../public/static/images/books.jpg";
import clothing from "../public/static/images/clothing.jpg";

import styles from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(actionCreators.getallProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coders Mart</title>
        <meta
          name="description"
          content="Coders-Mart is an e-commerce webapp made using NEXT JS."
        />
        <meta name="keywords" content="nextjs, e-commerce, coders-mart" />
      </Head>

      <main className={styles.main}>
        <div className={styles.categoriesDiv}>
          <div className={styles.categoryItem}>
            <div className={styles.imgDiv}>
              <Image src={electronics} alt="Electronics" layout="fill" />
            </div>
            <p>Electronics</p>
          </div>

          <div className={styles.categoryItem}>
            <div className={styles.imgDiv}>
              <Image src={eyeware} alt="Eyeware" layout="fill" />
            </div>
            <p>Eyecare</p>
          </div>

          <div className={styles.categoryItem}>
            <div className={styles.imgDiv}>
              <Image src={books} alt="Books" layout="fill" />
            </div>
            <p>Books</p>
          </div>

          <div className={styles.categoryItem}>
            <div className={styles.imgDiv}>
              <Image src={clothing} alt="Clothing" layout="fill" />
            </div>
            <p>Clothing</p>
          </div>
        </div>

        <AdCarousel />

        <h2 className={styles.products_header}>Latest Releases</h2>

        <Products limit={30} />

        <Footer />
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
  await store.dispatch(actionCreators.getallProducts());
});
