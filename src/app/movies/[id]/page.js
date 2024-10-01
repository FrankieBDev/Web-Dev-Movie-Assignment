"use client";
import {useEffect, useState} from 'react';
import {fetchMovieDetails, fetchGenres, fetchMovieCast} from '../../services/moviesApi';
import styles from "./page.module.css";
import useWatchlist from "@/app/hooks/useWatchlist";

const MovieDetails = ({params}) => {
    const {id} = params;
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [cast, setCast] = useState([]);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { saveToWatchList, removeFromWatchList, isMovieInWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
            const movieData = await fetchMovieDetails(id);
            const genresData = await fetchGenres();
            const castData = await fetchMovieCast(id);
            setMovie(movieData);
            setGenres(genresData);
            setCast(castData);
            const isWatchlisted = await isMovieInWatchlist(movieData.id);
            setIsInWatchlist(isWatchlisted);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchDetails();
    }, [id, isMovieInWatchlist]);

    if (!movie) return <p>Loading...</p>;

    const genreMap = genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});

    const movieGenres = movie.genres && movie.genres.length > 0
        ? movie.genres.map(genre => genreMap[genre.id] || 'Unknown').join(', ')
        : 'Unknown';

    const movieCast = cast.length > 0 ? cast.slice(0, 5).join(', ') : 'Unknown';

    const roundedRating = Math.round(movie.vote_average);

    const handleWatchlistClick = () => {
        if (isInWatchlist) {
            removeFromWatchList(movie.id);
        } else {
            saveToWatchList(movie.id);
        }
        setIsInWatchlist(!isInWatchlist);
    };

    return (
        <div className={styles.movieInfoContainer}>
            <div className={styles.moviePosterContainer}>
                <picture>
                    <img
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : '/MoviePosterUnavailable.png'}
                        alt={movie.title}
                        className={styles.image}
                    />
                </picture>
            </div>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.watchlistContainer}>
                <picture>
                    <img
                        src={isInWatchlist ? "/ClickedHeartCat.png" : "/HeartCat.png"}
                        alt={isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                        title={isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                        className={styles.watchlistImage}
                        onClick={handleWatchlistClick}
                        style={{cursor: 'pointer'}}
                    />
                </picture>
                        <p className={styles.watchlistText}>
                            <strong>{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}</strong></p>

            </div>
            <div className={styles.date}>
                <p className={styles.subTitle}><strong>Release Date:</strong>
                    <br/> {new Date(movie.release_date).toLocaleDateString('en-GB')}</p>
            </div>
            <div className={styles.rating}>
                <p className={styles.subTitle}><strong>Rating:</strong> <br/> {roundedRating}</p>
            </div>
            <div className={styles.genre}>
                <p className={styles.subTitle}><strong>Genre:</strong> <br/> {movieGenres}</p>
            </div>
            <div className={styles.duration}>
                <p className={styles.subTitle}><strong>Duration:</strong> <br/> {movie.runtime} minutes</p>
            </div>
            <div className={styles.cast}>
                <p className={styles.subTitle}><strong>Cast:</strong> <br/> {movieCast}</p>
            </div>
            <div className={styles.overview}>
                <p className={styles.subTitle}><strong>Overview:</strong><br/> {movie.overview}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
