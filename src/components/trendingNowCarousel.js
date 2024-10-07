"use client";
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './carousel.module.css';

const TrendingNowCarousel = ({ movies }) => {
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

    if (!movies || movies.length === 0) {
        return <div>No movies available</div>;
    }

    return (
        <div className={styles.carouselContainer}>
            <button className={styles.scrollButton} onClick={scrollLeft}>
                <picture>
                    <img src="/leftArrow.png" alt="Scroll Left" />
                </picture>
            </button>
            <div className={styles.carousel} ref={carouselRef}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.movieItem}>
                        <div className={styles.moviePosterContainer}>
                            <picture>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
                                    {movie.overview.length > 160 ? `${movie.overview.substring(0, 160)}...` : movie.overview}
                                </p>
                                <span className={styles.seeMoreText}>See More</span> {/* Changed to span */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.scrollButton} onClick={scrollRight}>
                <picture>
                    <img src="/rightArrow.png" alt="Scroll Right" />
                </picture>
            </button>
        </div>
    );
};

export default TrendingNowCarousel;
