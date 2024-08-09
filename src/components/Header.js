"use client";
import styles from "./Header.module.css";
import Link from 'next/link';

export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.navLinks}>
                <div className={styles.navItem}>
                    <Link href="/">Home</Link>
                </div>
                <div className={styles.navItem}>
                    <Link href="/about">About</Link>
                </div>
            </div>
            <div className={styles.logoContainer}>
                <img src="/FrankiesMoviesLogo.png" alt="Logo" className={styles.logo}/>
            </div>
                <div className={styles.navItem}>
                    <Link href="/#SearchPanel">Search</Link>
                </div>
                <div className={styles.navItem}>
                    <Link href="/watchlist">Watchlist</Link>
                </div>

        </header>
);
}
