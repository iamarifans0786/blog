import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head><title>Blog</title></Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
