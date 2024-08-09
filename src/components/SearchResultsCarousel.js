"use client";
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TrendingNowCarousel.module.css';

const SearchResultsCarousel = ({ movies }) => {
    const carouselRef = useRef(null);
    const router = useRouter();  // Correct useRouter hook

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
        return <div>No movies found</div>; // Handle empty state
    }

    return (
        <div className={styles.carouselContainer}>
            <button className={styles.scrollButton} onClick={scrollLeft}>
                <img src="/leftArrow.png" alt="Scroll Left"/>
            </button>
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
                                    <button
                                        onClick={() => handleSeeMoreClick(movie.id)}
                                        className={styles.seeMoreLink}
                                    >
                                        See More
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.scrollButton} onClick={scrollRight}>
                <img src="/rightArrow.png" alt="Scroll Right"/>
            </button>
        </div>
    );
};

export default SearchResultsCarousel;
