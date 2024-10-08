"use client";
import { useState } from 'react';
import styles from './advancedSearch.module.css';
import { fetchMoviesByKeyword, fetchMoviesByGenre, fetchMoviesByReleaseDate, fetchMoviesByDuration } from '@/app/services/moviesApi';
import SearchResultsGrid from './searchResultsGrid';

const Page = () => {
    const [selectedFilter, setSelectedFilter] = useState('keyword');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        let results = [];
        try {
            switch (selectedFilter) {
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

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Advanced Search</h2>
            <div className={styles.filterContainer}>
                <h3>Filter Results by:</h3>
                <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}
                        className={styles.filterSelect}>
                    <option value="keyword">Keyword</option>
                    <option value="genre">Genre</option>
                    <option value="release_date">Release Date</option>
                    <option value="duration">Duration</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search for a ${selectedFilter}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>

            {/*<div className={styles.filterContainer}>*/}
            {/*    <div className={styles.filters}>*/}
            {/*        <h3 className={styles.panelText}>Filter Results by:</h3>*/}
            {/*        <button*/}
            {/*            className={selectedFilter === 'keyword' ? styles.selected : styles.filterButton}*/}
            {/*            onClick={() => handleFilterClick('keyword')}*/}
            {/*        >*/}
            {/*            Keyword*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            className={selectedFilter === 'genre' ? styles.selected : styles.filterButton}*/}
            {/*            onClick={() => handleFilterClick('genre')}*/}
            {/*        >*/}
            {/*            Genre*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            className={selectedFilter === 'release_date' ? styles.selected : styles.filterButton}*/}
            {/*            onClick={() => handleFilterClick('release_date')}*/}
            {/*        >*/}
            {/*            Release Date*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            className={selectedFilter === 'duration' ? styles.selected : styles.filterButton}*/}
            {/*            onClick={() => handleFilterClick('duration')}*/}
            {/*        >*/}
            {/*            Duration*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.resultsContainer}>
                <SearchResultsGrid movies={searchResults}/>
            </div>
        </div>
    );
};

export default Page;
