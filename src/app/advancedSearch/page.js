"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './advancedSearch.module.css';
import { fetchMoviesByKeyword, fetchGenres, fetchMoviesByReleaseDate, fetchMoviesByDuration } from '@/app/services/moviesApi';
import SearchResultsGrid from './searchResultsGrid';

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedReleaseYear, setSelectedReleaseYear] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loadGenres = async () => {
            const genreList = await fetchGenres();
            setGenres(genreList);
        };

        loadGenres();
    }, []);

    useEffect(() => {
        setSearchResults([]);
        setSearchQuery('');
        setSelectedGenres([]);
        setSelectedReleaseYear(null);
        setSelectedDuration(null);
    }, []);

    const handleSearch = async () => {
        let results = [];

        try {
            if (searchQuery.trim()) {
                results = await fetchMoviesByKeyword(searchQuery);
            } else if (selectedDuration) {
                results = await fetchMoviesByDuration(selectedDuration);
            } else {
                return;
            }

            if (selectedGenres.length) {
                results = results.filter(movie =>
                    movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
                );
            }

            if (selectedReleaseYear) {
                const yearResults = await fetchMoviesByReleaseDate(selectedReleaseYear);
                results = results.filter(movie =>
                    yearResults.some(yearMovie => yearMovie.id === movie.id)
                );
            }

            setSearchResults(results);
            setSearchQuery('');
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenres(prev =>
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Advanced Search</h2>
            <div className={styles.filterContainer}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>

            <h3>Filter Results By:</h3>

            <h4>Select Genres:</h4>
            <div className={styles.genreCheckboxes}>
                {genres.map(genre => (
                    <label key={genre.id}>
                        <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre.id)}
                            onChange={() => handleGenreChange(genre.id)}
                        />
                        {genre.name}
                    </label>
                ))}
            </div>

            <h3>Select Release Year:</h3>
            <select value={selectedReleaseYear} onChange={(e) => setSelectedReleaseYear(Number(e.target.value))}>
                <option value="">Any Year</option>
                {[...Array(31).keys()].map(year => {
                    const yearValue = new Date().getFullYear() - year;
                    return (
                        <option key={yearValue} value={yearValue}>{yearValue}</option>
                    );
                })}
            </select>

            <h3>Select Duration:</h3>
            <select value={selectedDuration} onChange={(e) => setSelectedDuration(Number(e.target.value))}>
                <option value="">Any Duration</option>
                <option value="30">30 mins</option>
                <option value="60">60 mins</option>
                <option value="90">90 mins</option>
                <option value="120">120 mins</option>
                <option value="150">150 mins</option>
                <option value="180">180 mins</option>
            </select>

            <div className={styles.resultsContainer}>
                {searchResults.length === 0 ? (
                    <div>No movies found.</div>
                ) : (
                    <SearchResultsGrid movies={searchResults} />
                )}
            </div>
        </div>
    );
};

export default Page;
