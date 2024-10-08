"use client";
import styles from './searchResultsGrid.module.css';

const SearchResultsGrid = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <div>No movies found.</div>;
    }

    return (
        <div className={styles.gridContainer}>
            {movies.map(movie => (
                <div key={movie.id} className={styles.movieItem}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.moviePoster}
                    />
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsGrid;
