import { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import dynamic from "next/dynamic";
import { wrapper } from "../redux/store";
import Nprogress from "nprogress";
Nprogress.configure({ showSpinner: false, easing: 'ease', speed: 1000, parent: 'html' });
const Navbar = dynamic(()=> import("../components/Navbar"));
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      Nprogress.start();
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      Nprogress.done();
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        {loading && <title>Coders Mart</title>}
        <meta name="description" content="Coders-Mart is an e-commerce webapp made using NEXT JS." />
        <meta name="keywords" content="nextjs, e-commerce, coders-mart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Component {...pageProps} />
      {domLoaded && <ToastContainer />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
