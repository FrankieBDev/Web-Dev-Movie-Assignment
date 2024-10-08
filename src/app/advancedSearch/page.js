"use client";
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import styles from '/src/components/searchPanel.module.css';
import {
    fetchGenres,
    fetchMoviesByDuration,
    fetchMoviesByKeyword,
    fetchMoviesByReleaseDate
} from '@/app/services/moviesApi';
import SearchResultsGrid from './searchResultsGrid';

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showGenres, setShowGenres] = useState(false);
    const [selectedReleaseYear, setSelectedReleaseYear] = useState([]);
    const [showYearOptions, setShowYearOptions] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState([]);
    const [showDurationOptions, setShowDurationOptions] = useState(false);
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
        setSelectedReleaseYear([]);
        setSelectedDuration([]);
    }, []);

    const handleSearch = async () => {
        let results = [];

        try {
            if (searchQuery.trim()) {
                results = await fetchMoviesByKeyword(searchQuery);
            }

            if (selectedDuration.length) {
                const durationResults = await fetchMoviesByDuration(selectedDuration);
                results = results.concat(durationResults);
            }

            if (selectedGenres.length) {
                results = results.filter(movie =>
                    movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
                );
            }

            if (selectedReleaseYear.length) {
                const yearResults = await Promise.all(selectedReleaseYear.map(year => fetchMoviesByReleaseDate(year)));
                const flatYearResults = yearResults.flat();
                results = results.filter(movie =>
                    flatYearResults.some(yearMovie => yearMovie.id === movie.id)
                );
            }

            setSearchResults(results);
            setSearchQuery('');
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenres(prev => {
            return prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId];
        });
    };

    const handleYearChange = (year) => {
        setSelectedReleaseYear(prev => {
            return prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year];
        });
    };

    const handleDurationChange = (duration) => {
        setSelectedDuration(prev => {
            return prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration];
        });
    };

    return (
        <div className={styles.panelContainer}>
            <h2 className={styles.panelTitle}>Advanced Search</h2>
            <div className={styles.filterContainer}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.searchInput}
                />
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>

            <h3 className={styles.panelSubtitle}>Filter Results By:</h3>

            <div className={styles.filterRow}>
                <h4 className={styles.filterTitle}>
                    <button
                        className={`${styles.filterButtonLrg} ${selectedGenres.length ? styles.selected : ''}`}
                        onClick={() => setShowGenres(prev => !prev)}
                    >
                        Genre
                    </button>
                </h4>
            </div>

            {showGenres && (
                <div className={styles.filters}>
                    {genres.map(genre => (
                        <button
                            key={genre.id}
                            className={`${styles.filterButton} ${selectedGenres.includes(genre.id) ? styles.selected : ''}`}
                            onClick={() => handleGenreChange(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            )}
            <div className={styles.filterRow}>
                <h4 className={styles.filterTitle}>
                    <button
                        className={`${styles.filterButtonLrg} ${selectedReleaseYear.length ? styles.selected : ''}`}
                        onClick={() => setShowYearOptions(prev => !prev)}
                    >
                        Release Year
                    </button>
                </h4>
            </div>

            {showYearOptions && (
                <div className={styles.filters}>
                    {[...Array(31).keys()].map(year => {
                        const yearValue = new Date().getFullYear() - year;
                        return (
                            <button
                                key={yearValue}
                                className={`${styles.filterButton} ${selectedReleaseYear.includes(yearValue) ? styles.selected : ''}`}
                                onClick={() => handleYearChange(yearValue)}
                            >
                                {yearValue}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className={styles.filterRow}>
                <h4 className={styles.filterTitle}>
                    <button
                        className={`${styles.filterButtonLrg} ${selectedDuration.length ? styles.selected : ''}`}
                        onClick={() => setShowDurationOptions(prev => !prev)}
                    >
                        Duration
                    </button>
                </h4>
            </div>

            {showDurationOptions && (
                <div className={styles.filters}>
                    {[30, 60, 90, 120, 150, 180].map(duration => (
                        <button
                            key={duration}
                            className={`${styles.filterButton} ${selectedDuration.includes(duration) ? styles.selected : ''}`}
                            onClick={() => handleDurationChange(duration)}
                        >
                            {duration} mins
                        </button>
                    ))}
                </div>
            )}


            <div className={styles.resultsContainer}>
                {searchResults.length === 0 ? (
                    <div>No movies found.</div>
                ) : (
                    <SearchResultsGrid movies={searchResults}/>
                )}
            </div>
        </div>
    );
};

export default Page;
