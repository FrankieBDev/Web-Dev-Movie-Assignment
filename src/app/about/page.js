"use client";
import styles from "./page.module.css";

export default function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About</h1>

            <div className={styles.logoContainer}>
                <picture>
                    <img src="/SelinaCircle.png" alt="Logo" className={styles.logo}/>
                    </picture>
            </div>
            <p className={styles.textA}>
                <h2> Welcome to Frankie&#39;s Movies! </h2>
                <br/> <br/>
                This project was developed by Frankie Beckingham as part of the Web Design & Authoring module while
                studying Software Development at Ada College.
            </p>
            <p className={styles.textA}>
                The theme was inspired by my cat, Selina. <br/>
                She is also featured in the bonus cat content located somewhere on the site. <br/>
                See if you can find it!
            </p>
            <p className={styles.textA}>
                Thank you for visiting! <br/> <br/>
                Your feedback is much appreciated.
            </p>

        </div>
    );
}