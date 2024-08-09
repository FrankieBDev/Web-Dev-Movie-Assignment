"use client";
import { useState } from 'react';
import styles from './SearchPanel.module.css';

const SearchPanel = ({ onSearch }) => {
    const [selectedFilter, setSelectedFilter] = useState('keyword');
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        try {
            await onSearch(searchQuery, selectedFilter);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    const getPlaceholderText = () => {
        switch (selectedFilter) {
            case 'genre':
                return 'Search by genre...';
            case 'release_date':
                return 'Search by release date (e.g., 2024)...';
            case 'rating':
                return 'Search by rating (e.g., 5.2)...';
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
                            className={selectedFilter === 'rating' ? styles.selected : styles.filterButton}
                            onClick={() => handleFilterClick('rating')}
                        >
                            Rating
                        </button>
                        <button
                            className={selectedFilter === 'duration' ? styles.selected : styles.filterButton}
                            onClick={() => handleFilterClick('duration')}
                        >
                            Duration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;
