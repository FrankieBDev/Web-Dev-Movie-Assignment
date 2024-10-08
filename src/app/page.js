"use client";
import {useState, useEffect} from 'react';
import SearchPanel from '../components/searchPanel';
import TrendingNowCarousel from '../components/trendingNowCarousel';
import Watchlist from '../components/watchlistCarousel';
import {fetchPopularMovies, fetchMoviesByKeyword} from '@/app/services/moviesApi';
import styles from "./page.module.css";
import Link from "next/link";


const Page = () => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            const popularMovies = await fetchPopularMovies();
            setMovies(popularMovies);
            setIsLoading(false);
        };

        fetchMovies();
    }, []);

    const handleSearch = async (searchQuery, selectedFilter) => {
        setIsLoading(true);
        const results = await fetchMoviesByKeyword(searchQuery, selectedFilter);
        setSearchResults(results);
        setIsLoading(false);
    };

    return (
        <div>
            <SearchPanel onSearch={handleSearch}/>
            <p className={styles.advancedSearchLink}>
                <Link href="advancedSearch" className={styles.advancedSearchLink}><strong> Advanced Search </strong></Link>
            </p>
            <h1 className={styles.title}>Trending Now</h1>
            <TrendingNowCarousel movies={movies}/>
            <h1 className={styles.title}>Watchlist</h1>
            <Watchlist movies={movies}/>
        </div>
    );
};

export default Page;