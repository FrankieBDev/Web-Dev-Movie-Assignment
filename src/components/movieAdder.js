'use client';

import { useState } from 'react';
import { fetchMoviesByKeyword } from '@/app/services/moviesApi';

export default function MovieAdder({ saveToWatchList }) {
    const [movieName, setMovieName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedMovieName = movieName.trim();
        if (trimmedMovieName) {
            const movies = await fetchMoviesByKeyword(trimmedMovieName);
            setSearchResults(movies);
        }
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        saveToWatchList(movie.id);
        setSearchResults([]);
        setMovieName('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="new-movie"
                    type="text"
                    placeholder="Enter movie name"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    required
                />
                <button type="submit">Search Movie</button>
            </form>

            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((movie) => (
                        <li key={movie.id}>
                            {movie.title} ({movie.release_date?.split('-')[0] || 'N/A'})
                            <button onClick={() => handleMovieSelect(movie)}>Add to Watchlist</button>
                        </li>
                    ))}
                </ul>
            )}

            {selectedMovie && <p>Added {selectedMovie.title} to watchlist!</p>}
        </div>
    );
}
