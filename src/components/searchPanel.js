"use client";
import { useState } from 'react';
import styles from './searchPanel.module.css';
import { fetchMoviesByKeyword, fetchMoviesByGenre, fetchMoviesByReleaseDate, fetchMoviesByDuration } from '@/app/services/moviesApi';
import SearchResultsCarousel from "@/components/searchResultsCarousel";


const SearchPanel = () => {
    const [selectedFilter, setSelectedFilter] = useState('keyword');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        let results = [];
        try { switch (selectedFilter) {
            case 'keyword':
                results = await fetchMoviesByKeyword(searchQuery);
                break;
            case 'genre':
                results = await fetchMoviesByGenre(searchQuery);
                break;
            case 'release_date':
                results = await fetchMoviesByReleaseDate(searchQuery);
                break;
            case 'duration':
                results = await fetchMoviesByDuration(searchQuery);
                break;
            default:
                break;
        }
            setSearchResults(results);
            setSearchQuery('');
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    const getPlaceholderText = () => {
        switch (selectedFilter) {
            case 'genre':
                return 'Search by genre... (e.g. Horror, Comedy...)';
            case 'release_date':
                return 'Search by release date (e.g., 2024)...';
            case 'duration':
                return 'Search by duration (e.g., 120 minutes)...';
            case 'keyword':
            default:
                return 'Search for a movie title...';
        }
    };

    return (
        <div id="search-panel" className={styles.panelContainer}>
            <div className={styles.innerPanel}>
                <h2 className={styles.panelTitle}>Find a Movie</h2>
                <input
                    type="text"
                    placeholder={getPlaceholderText()}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                <div className={styles.filterContainer}>
                    <div className={styles.filters}>
                        <h3 className={styles.panelText}>Filter Results by:</h3>
                        <button
                            className={selectedFilter === 'keyword' ? styles.selected : styles.filterButton}
                            onClick={() => handleFilterClick('keyword')}
                        >
                            Keyword
                        </button>
                        <button
                            className={selectedFilter === 'genre' ? styles.selected : styles.filterButton}
                            onClick={() => handleFilterClick('genre')}
                        >
                            Genre
                        </button>
                        <button
                            className={selectedFilter === 'release_date' ? styles.selected : styles.filterButton}
                            onClick={() => handleFilterClick('release_date')}
                        >
                            Release Date
                        </button>
                        <button
                            className={selectedFilter === 'duration' ? styles.selected : styles.filterButton}
                            onClick={() => handleFilterClick('duration')}
                        >
                            Duration
                        </button>
                    </div>
                </div>
                <div>
                        <SearchResultsCarousel movies={searchResults} />
                </div>
            </div>
        </div>
    );
};


export default SearchPanel;
