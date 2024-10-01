"use client";
import styles from "./page.module.css";

export default function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About</h1>

            <div className={styles.logoContainer}>
                <picture>
                    <img src="/FrankiesMoviesLogo.png" alt="Logo" className={styles.logo}/>
                    </picture>
            </div>
            <p className={styles.textA}>
                This page is still under construction.  It is filled with placeholder items for testing purposes.
            </p>
            <p className={styles.textA}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas est
                gravida ipsum fringilla, at tincidunt urna aliquet. Nunc tincidunt sodales pharetra. Aenean et
                condimentum tortor. Ut elementum, risus vitae consectetur interdum, leo elit commodo dui, vel tristique
                nulla magna nec turpis. Quisque sit amet ipsum est. Curabitur non risus molestie, elementum dui nec,
                consequat magna. Vestibulum venenatis sit amet dui a dignissim. Nulla sodales placerat lacinia.
                Phasellus convallis mattis orci, et elementum erat porttitor malesuada. Fusce mollis, sem at tincidunt
                tincidunt, ligula mauris mollis massa, id molestie mi neque et quam. Nulla in turpis vel mi malesuada
                interdum. Aenean id facilisis felis. Integer diam ex, mattis id venenatis ut, malesuada lobortis metus.
                Nullam venenatis quam id ante vehicula, ut consectetur nisi porta. Pellentesque tincidunt pulvinar
                facilisis. Sed ut quam aliquet mauris lacinia tincidunt non ut ipsum.
            </p>
            <p className={styles.textA}>
                Mauris nec ligula ac nunc tincidunt vestibulum. Curabitur et semper risus, eget consequat magna.
                Vivamus nec ipsum tincidunt, maximus dolor ut, pulvinar leo. Cras sodales tellus eu magna imperdiet, a
                semper ligula malesuada. Nunc scelerisque neque turpis, vel convallis ligula pharetra in. Pellentesque
                lobortis
                ultricies est, eget vehicula nulla lobortis non. Duis feugiat tristique placerat.
            </p>
            <p className={styles.textA}>
                Suspendisse potenti. Sed ac magna posuere tortor tempor lacinia sit amet in turpis. Sed mi erat,
                suscipit a eros elementum, fermentum scelerisque nulla. Nullam imperdiet posuere diam et malesuada.
                Aliquam tempus tristique ipsum, et sodales est venenatis nec. Fusce orci justo, iaculis nec dapibus
                sit amet, luctus vel lacus. Nam vestibulum urna id nisl condimentum, auctor suscipit nibh tempor.
                Praesent et sapien vulputate, efficitur sem consequat, pulvinar augue. Cras sapien sapien, tincidunt
                quis feugiat ut, volutpat eget nibh. Morbi faucibus ligula tellus, nec dictum metus congue vitae. Nunc
                nulla
                neque, suscipit ac rhoncus ut, pulvinar et urna. Pellentesque in posuere elit. Duis odio ipsum, congue
                eget erat ac, elementum euismod massa. Nunc at orci posuere, convallis magna et, molestie dui. In
                egestas
                placerat mauris sed iaculis. Ut ligula sem, ultricies vel hendrerit et, pulvinar a felis.

            </p>

        </div>
    );
}