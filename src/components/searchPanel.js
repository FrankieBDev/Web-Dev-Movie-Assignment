"use client";
import { useState } from 'react';
import styles from './searchPanel.module.css';
import { fetchMoviesByKeyword } from '@/app/services/moviesApi';
import SearchResultsCarousel from "@/components/searchResultsCarousel";

const SearchPanel = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        try {
            const results = await fetchMoviesByKeyword(searchQuery);
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

    return (
        <div id="search-panel" className={styles.panelContainer}>
            <div className={styles.innerPanel}>
                <h2 className={styles.panelTitle}>Quick Search</h2>
                <input
                    type="text"
                    placeholder="Search for a movie title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                <div>
                    <SearchResultsCarousel movies={searchResults} />
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;
