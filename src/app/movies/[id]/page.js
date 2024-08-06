"use client";
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/moviesApi';

const MovieDetails = ({ params }) => {
    const { id } = params;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);
        };

        fetchDetails();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Vote Average:</strong> {movie.vote_average}</p>
            <p><strong>Vote Count:</strong> {movie.vote_count}</p>
            <p><strong>Popularity:</strong> {movie.popularity}</p>
        </div>
    );
};

export default MovieDetails;
