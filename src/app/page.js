"use client";
import {useState, useEffect} from 'react';
import SearchPanel from '../components/searchPanel';
import TrendingNowCarousel from '../components/trendingNowCarousel';
import {fetchPopularMovies, fetchMoviesByKeyword} from '@/app/services/moviesApi';
import styles from "./page.module.css";


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
            <h1 className={styles.title}>Trending Now</h1>
            <TrendingNowCarousel movies={movies}/>
        </div>
    );
};

export default Page;