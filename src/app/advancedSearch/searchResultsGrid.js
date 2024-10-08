"use client";
import { useRouter } from 'next/navigation';
import styles from './searchResultsGrid.module.css';

const SearchResultsGrid = ({ movies }) => {
    const router = useRouter();

    const handleSeeMoreClick = (id) => {
        router.push(`/movies/${id}`);
    };

    if (!movies || movies.length === 0) {
        return <div>No movies found.</div>;
    }

    return (
        <div className={styles.gridContainer}>
            {movies.map(movie => (
                <div key={movie.id} className={styles.movieItem}>
                    <div className={styles.moviePosterContainer}>
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : `MoviePosterUnavailable.png`}
                            alt={movie.title}
                            className={styles.moviePoster}
                        />
                        <div
                            className={styles.movieOverlay}
                            onClick={() => handleSeeMoreClick(movie.id)}
                        >
                            <h3 className={styles.movieTitle}>{movie.title}</h3>
                            <p className={styles.movieDescription}>
                                {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                            </p>
                            <span className={styles.seeMoreText}>See More</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsGrid;
