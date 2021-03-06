import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NavBar } from "../components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link'
export const API_URL = "https://api.mkurien.com";
import { HABIT_BOOK_LINK, NUDGE_BOOK_LINK } from "./learning_spanish";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>mkurien.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
        <h1 className={styles.landingpageheader}>
          Kurious?
        </h1>
        </header>

        <div className={styles.grid}>
        <Link href="/baby_name_recommender">
            <a className={styles.card}>
              <h2>✨ Baby Name Recommender &rarr;</h2>
              <p> Use a machine learning trained model to recommend names based on your tastes!.</p>
            </a>
          </Link>

          <Link href="/sailing_licence">
            <a className={styles.card}>
              <h2> ⛵ From zero to skipper &rarr;</h2>
              <p> Everything you need to become a licenced skipper - get ready to
                rent boats and sail the high seas!</p>
            </a>
          </Link>

          <Link href="/learning_spanish">
            <a className={styles.card}>
              <h2>🇪🇸 Learning Spanish in my free time &rarr;</h2>
              <p>I made learning as easy and automated as possible - by building
                a habit and using defaults.</p>
            </a>
          </Link>

          <Link href="/spanish_slang">
            <a className={styles.card}>
              <h2> Sound like a native &rarr;</h2>
              <p> Here are some Spanish phrases, slang and mild insults you&#39;d only
                learn if you spend time with native speakers.</p>
            </a>
          </Link>          
          
          <Link href="/changelog">
            <a className={styles.card}>
              <h2> Changelog &rarr;</h2>
              <p> Checkout the incremental updates I am making to this site.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
          <p>mkurien.com v2.2
          <a href="https://twitter.com/mshokk">🐦 Follow me</a>
          </p>
          
      </footer>
    </div>
  )
}

export default Home
