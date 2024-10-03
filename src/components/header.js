"use client";
import styles from "./header.module.css";
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.navContainer}>
                    <div className={styles.navItem}>
                        <Link href="/">Home</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/about">About</Link>
                    </div>
                </div>
                <div className={styles.logoContainer}>
                    <Link href="/">
                    <picture>
                        <img src="/FrankiesMoviesLogo.png" alt="Site Logo" className={styles.logo}/>
                    </picture>
                    </Link>
                </div>
                <div className={styles.navContainer}>
                    <div className={styles.navItem}>
                        <Link href="/#SearchPanel">Search</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/watchlist">Watchlist</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
