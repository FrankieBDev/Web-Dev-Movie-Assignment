'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import useWatchlist from '../hooks/useWatchlist';
import styles from './watchlist.module.css';

export default function WatchList() {
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
        router.push(`/movie/${id}`);
    };

    return (
        <div className={styles.watchlistContainer}>
            <h1 className={styles.title}>Watchlist</h1>
            {watchList.length > 0 ? (
                <div className={styles.carouselContainer}>
                    <button className={styles.scrollButton} onClick={scrollLeft}>
                        <img src="/leftArrow.png" alt="Scroll Left"/>
                    </button>
                    <div className={styles.carousel} ref={carouselRef}>
                        {watchList.map((movie) => (
                            <div key={movie.id} className={styles.movieItem}>
                                <div className={styles.moviePosterContainer}>
                                    <img
                                        src={movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : '/path/to/placeholder.jpg'}
                                        alt={movie.title}
                                        className={styles.moviePoster}
                                    />
                                    <div className={styles.movieOverlay}>
                                        <h2 className={styles.movieTitle}>{movie.title}</h2>
                                        <p className={styles.movieDescription}>
                                            {movie.overview
                                                ? movie.overview.length > 100
                                                    ? `${movie.overview.substring(0, 100)}...`
                                                    : movie.overview
                                                : 'No overview available'}
                                            <button
                                                onClick={() => handleSeeMoreClick(movie.id)}
                                                className={styles.seeMoreLink}
                                            >
                                                See More
                                            </button>
                                        </p>
                                    </div>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeFromWatchList(movie.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={styles.scrollButton} onClick={scrollRight}>
                        <img src="/rightArrow.png" alt="Scroll Right"/>
                    </button>
                </div>
            ) : (
                <p className={styles.textW}>No movies in your watchlist.</p>
            )}
        </div>
    );
}
