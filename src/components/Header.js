"use client";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.navLinks}>
                <div className={styles.navItem}>
                    <a href="/">Home</a>
                </div>
                <div className={styles.navItem}>
                    <a href="/about">About</a>
                </div>
            </div>
            <div className={styles.logoContainer}>
                <img src="/FrankiesMoviesLogo.png" alt="Logo" className={styles.logo}/>
            </div>
            <div className={styles.navItem}>
                <a href="/SearchLink">Search</a>
            </div>
            <div className={styles.navItem}>
                <a href="/watchlist">Watchlist</a>
            </div>

        </header>
    );
}
