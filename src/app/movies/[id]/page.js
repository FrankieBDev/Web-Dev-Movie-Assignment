"use client";
import { useEffect, useState } from 'react';
import {fetchMovieDetails, fetchGenres, fetchMovieCast} from '../../services/moviesApi';
import styles from "../[id]/page.module.css";

const MovieDetails = ({ params }) => {
    const { id } = params;
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const movieData = await fetchMovieDetails(id);
            const genresData = await fetchGenres();
            const castData = await fetchMovieCast(id);
            setMovie(movieData);
            setGenres(genresData);
            setCast(castData);
        };

        fetchDetails();
    }, [id]);

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

    return (
        <div className={styles.movieInfoContainer}>
            <div className={styles.moviePosterContainer}>
                <img
                    src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/MoviePosterUnavailable.png'}
                    alt={movie.title}
                    className={styles.image}
                    />
            </div>
            <h1 className={styles.title}>{movie.title}</h1>
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