"use client";
import {useEffect, useState} from 'react';
import {fetchMovieDetails, fetchGenres, fetchMovieCast, fetchMovieVideos} from '../../services/moviesApi';
import styles from "./page.module.css";
import useWatchlist from "@/app/hooks/useWatchlist";

const MovieDetails = ({params}) => {
    const {id} = params;
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [cast, setCast] = useState([]);
    const [trailerKey, setTrailerKey] = useState([null]);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const {saveToWatchList, removeFromWatchList, isMovieInWatchlist} = useWatchlist();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const movieData = await fetchMovieDetails(id);
                const genresData = await fetchGenres();
                const castData = await fetchMovieCast(id);
                const trailerData = await fetchMovieVideos(id);

                setMovie(movieData);
                setGenres(genresData);
                setCast(castData);
                setTrailerKey(trailerData);

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
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{movie.title}</h1>
            </div>

            <div className={styles.watchlistInfoContainer}>

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

                <div className={styles.secondaryInfoContainer}>
                    <div className={styles.infoContainer}>
                        <p className={styles.subtitle}><strong>Overview:</strong></p>
                        <p className={styles.infoText}> {movie.overview} </p>
                    </div>
                    <div className={styles.infoContainer}>
                        <p className={styles.subtitle}><strong>Release Date:</strong></p>
                        <p className={styles.infoText}> {new Date(movie.release_date).toLocaleDateString('en-GB')} </p>
                    </div>

                    <div className={styles.infoContainer}>
                        <p className={styles.subtitle}><strong>Rating:</strong></p>
                        <p className={styles.infoText}> {roundedRating} </p>
                    </div>

                    <div className={styles.infoContainer}>
                        <p className={styles.subtitle}><strong>Genre:</strong></p>
                        <p className={styles.infoText}> {movieGenres}</p>
                    </div>

                    <div className={styles.infoContainer}>
                        <p className={styles.subtitle}><strong>Duration:</strong></p>
                        <p className={styles.infoText}> {movie.runtime} minutes </p>
                    </div>

                    <div className={styles.infoContainer}>
                        <p className={styles.subtitle}><strong>Cast:</strong></p>
                        <p className={styles.infoText}> {movieCast} </p>
                    </div>
                </div>

                <div className={styles.watchlistContainer} onClick={handleWatchlistClick}
                     style={{cursor: 'pointer'}}>
                    <picture>
                        <img
                            src={isInWatchlist ? "/ClickedHeartCat.png" : "/HeartCat.png"}
                            alt={isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                            title={isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                            className={styles.watchlistImage}
                        />
                    </picture>
                    <p className={styles.watchlistText}>
                        <strong>{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}</strong></p>
                </div>
            </div>
            <div className={styles.trailerContainer}>
                {trailerKey ? (
                    <iframe
                        className={styles.trailerVideo}
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>No trailer available</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;