"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/src/components/searchPanel.module.css';
import {
    fetchGenres,
    fetchMoviesByDuration,
    fetchMoviesByKeyword,
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
                results = results.filter(movie =>
                    selectedReleaseYear.some(({ start, end }) =>
                        movie.release_date >= `${start}-01-01` && movie.release_date <= `${end}-12-31`
                    )
                );
            }

            setSearchResults(results);
            setSearchQuery('');

            setShowGenres(false);
            setShowYearOptions(false);
            setShowDurationOptions(false);
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
        const decadeStart = Math.floor(year / 10) * 10;
        const decadeEnd = decadeStart + 9;
        const isSelected = selectedReleaseYear.some(y => y.start === decadeStart && y.end === decadeEnd);
        if (isSelected) {
            setSelectedReleaseYear(prev => prev.filter(y => !(y.start === decadeStart && y.end === decadeEnd)));
        } else {
            setSelectedReleaseYear(prev => [...prev, { start: decadeStart, end: decadeEnd }]);
        }
    };


    const handleDurationChange = (duration) => {
        setSelectedDuration(prev => {
            return prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration];
        });
    };

    const decades = [
        { label: '2020s', start: 2020, end: 2029 },
        { label: '2010s', start: 2010, end: 2019 },
        { label: '2000s', start: 2000, end: 2009 },
        { label: '1990s', start: 1990, end: 1999 },
        { label: '1980s', start: 1980, end: 1989 },
        { label: '1970s', start: 1970, end: 1979 },
        { label: '1960s', start: 1960, end: 1969 },
        { label: '1950s', start: 1950, end: 1959 },
        { label: '1940s', start: 1940, end: 1949 },
        { label: '1930s', start: 1930, end: 1939 },
    ];

    return (
        <div className={styles.panelContainer}>
            <h2 className={styles.panelTitle}>Advanced Search</h2>
            <div className={styles.searchContainer}>
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

            <div className={styles.filtersContainer}>
                <div className={styles.filterRow}>
                    <div className={styles.filterColumn}>
                        <h4 className={styles.filterTitle}>
                            <button
                                className={`${styles.filterButtonLrg} ${selectedGenres.length ? styles.selectedLrg : ''}`}
                                onClick={() => setShowGenres(prev => !prev)}
                            >
                                Genre
                            </button>
                        </h4>
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
                    </div>

                    <div className={styles.filterColumn}>
                        <h4 className={styles.filterTitle}>
                            <button
                                className={`${styles.filterButtonLrg} ${selectedReleaseYear.length ? styles.selectedLrg : ''}`}
                                onClick={() => setShowYearOptions(prev => !prev)}
                            >
                                Release Year
                            </button>
                        </h4>
                        {showYearOptions && (
                            <div className={styles.filters}>
                                {decades.map(decade => (
                                    <button
                                        key={decade.label}
                                        className={`${styles.filterButton} ${selectedReleaseYear.some(y => y.start === decade.start && y.end === decade.end) ? styles.selected : ''}`}
                                        onClick={() => handleYearChange(decade.start)}
                                    >
                                        {decade.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.filterColumn}>
                        <h4 className={styles.filterTitle}>
                            <button
                                className={`${styles.filterButtonLrg} ${selectedDuration.length ? styles.selectedLrg : ''}`}
                                onClick={() => setShowDurationOptions(prev => !prev)}
                            >
                                Duration
                            </button>
                        </h4>
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
                    </div>
                </div>
            </div>

            <div className={styles.resultsContainer}>
                {searchResults.length === 0 ? (
                    <div>
                        <p>Keyword must be entered to perform search.</p>
                        <br/>
                        <p>No movies found.</p>
                    </div>

                ) : (
                    <SearchResultsGrid movies={searchResults}/>
                )}
            </div>
        </div>
    );
};

export default Page;
