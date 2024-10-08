'use client';

import {useRef} from 'react';
import { useRouter } from 'next/navigation';
import useWatchlist from '../app/hooks/useWatchlist';
import styles from './carousel.module.css';

export default function Watchlist() {
    const { watchList, removeFromWatchList } = useWatchlist();
    const carouselRef = useRef(null);
    const router = useRouter();

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

    const handleSeeMoreClick = (id) => {
        router.push(`/movies/${id}`);
    };

    return (
        <div className={styles.watchlistContainer}>
            {watchList.length > 0 ? (
                <div className={styles.carouselContainer}>
                    <button className={styles.scrollButton} onClick={scrollLeft}>
                        <picture>
                            <img src="/leftArrow.png" alt="Scroll Left"/>
                        </picture>
                    </button>
                    <div className={styles.carousel} ref={carouselRef}>
                        {watchList.map((movie) => (
                            <div key={movie.id} className={styles.movieItem}>
                                <div className={styles.moviePosterContainer}>
                                    <picture>
                                        <img
                                            src={movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : '/path/to/placeholder.jpg'}
                                            alt={movie.title}
                                            className={styles.moviePoster}
                                        />
                                    </picture>
                                    <div
                                        className={styles.movieOverlay}
                                        onClick={() => handleSeeMoreClick(movie.id)}
                                    >
                                        <h2 className={styles.movieTitle}>{movie.title}</h2>
                                        <p className={styles.movieDescription}>
                                            {movie.overview.length > 60 ? `${movie.overview.substring(0, 160)}...` : movie.overview}
                                        </p>
                                        <span className={styles.seeMoreText}>See More</span>
                                    </div>
                                    <div className={styles.removeContainer}>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeFromWatchList(movie.id)}
                                    >
                                        Remove
                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={styles.scrollButton} onClick={scrollRight}>
                        <picture>
                            <img src="/rightArrow.png" alt="Scroll Right"/>
                        </picture>
                    </button>
                </div>
            ) : (
                <p className={styles.textWatchlist}>No movies in your watchlist.</p>
            )}
        </div>
    );
}
