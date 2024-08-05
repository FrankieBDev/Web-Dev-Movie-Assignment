"use client";
import { useRef } from 'react';
import styles from './TrendingNowCarousel.module.css';

const TrendingNowCarousel = ({ movies }) => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <button className={styles.scrollButton} onClick={scrollLeft}>{"<"}</button>
            <div className={styles.carousel} ref={carouselRef}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.movieItem}>
                        <div className={styles.moviePosterContainer}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className={styles.moviePoster}
                            />
                            <div className={styles.movieOverlay}>
                                <h2 className={styles.movieTitle}>{movie.title}</h2>
                                <p className={styles.movieDescription}>
                                    {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                                    <a href="#" className={styles.seeMoreLink}> See More</a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.scrollButton} onClick={scrollRight}>{">"}</button>
        </div>
    );
};

export default TrendingNowCarousel;

