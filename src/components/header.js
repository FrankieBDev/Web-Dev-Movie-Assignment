"use client";
import { useState } from 'react';
import styles from "./header.module.css";
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoContainer}>
                    <Link href="/" onClick={toggleMenu}>
                        <picture>
                            <img src="/FrankiesMoviesLogo.png" alt="Site Logo" className={styles.logo}/>
                        </picture>
                    </Link>
                </div>
                <div className={`${styles.navContainer} ${isMenuOpen ? styles.open : ''}`}>
                    <div className={styles.navItem}>
                        <Link href="/" onClick={toggleMenu}>Home</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/about" onClick={toggleMenu}>About</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/advancedSearch" onClick={toggleMenu}>Search</Link>
                    </div>
                    <div className={styles.navItem}>
                        <Link href="/#watchlistSection" onClick={toggleMenu}>Watchlist</Link>
                    </div>
                </div>
            </div>
            <button className={styles.menuToggle} onClick={toggleMenu}>
                ☰
            </button>
        </header>
    );
}
