import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
import { shallowEqual, useSelector } from "react-redux";
const Products = dynamic(()=> import("../components/Products"), {ssr: true});
const Footer = dynamic(()=> import("../components/Footer"), {ssr: true});
import AdCarousel from "../components/AdCarousel";

import electronics from "../public/static/images/electronics.jpg";
import eyeware from "../public/static/images/eyewear.jpg";
import books from "../public/static/images/books.jpg";
import clothing from "../public/static/images/clothing.jpg";

import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const {seller} = useSelector(state=> state.sellerReducer,shallowEqual);
  const {products} = useSelector(state=> state.productReducer,shallowEqual);

  useEffect(()=> {
    if(seller) {
      router.replace("/seller/dashboard");
    }
  }, [seller, router]);

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
          <Link href="/products/category/electronics">
            <div className={styles.categoryItem}>
              <div className={styles.imgDiv}>
                <Image src={electronics} alt="Electronics" layout="fill" />
              </div>
              <p>Electronics</p>
            </div>
          </Link>

          <Link href="/products/category/eyeware">
            <div className={styles.categoryItem}>
              <div className={styles.imgDiv}>
                <Image src={eyeware} alt="Eyeware" layout="fill" />
              </div>
              <p>Eyecare</p>
            </div>
          </Link>

          <Link href="/products/category/books">
            <div className={styles.categoryItem}>
              <div className={styles.imgDiv}>
                <Image src={books} alt="Books" layout="fill" />
              </div>
              <p>Books</p>
            </div>
          </Link>

          <Link href="/products/category/clothing">
            <div className={styles.categoryItem}>
              <div className={styles.imgDiv}>
                <Image src={clothing} alt="Clothing" layout="fill" />
              </div>
              <p>Clothing</p>
            </div>
          </Link>
        </div>

        <AdCarousel />
        <div className={styles.heading_div}>
          <h2 className={styles.products_header}>Latest Releases</h2>
          <Link href="/products"><a className={styles.view_all}>View All</a></Link>
        </div>
        <Products products={products} limit={30} />
        <Footer />
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
  await store.dispatch(actionCreators.getallProducts());
  const mycookie = context?.req?.headers?.cookie || "";
  const cookieObj = cookie.parse(mycookie);
  if (cookieObj.cm_user_token) {
    await store.dispatch(actionCreators.getCart(cookieObj.cm_user_token));
  }
});
