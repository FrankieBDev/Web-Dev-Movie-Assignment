"use client";
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>© 2024 Frankie&#39;s Movies. All rights reserved.</p>
                <p>This website uses the TMDB API for movie data, but it is not endorsed or certified by TMDB.</p>
                <p className={styles.easterEgg}>
                    <a href="https://www.youtube.com/shorts/kWQlwtWDJKw" target="_blank" rel="noopener noreferrer">
                        My lecturers said no extra marks for cat videos, but here&#39;s a secret link to a video of my cat because this website is inspired by her!
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;