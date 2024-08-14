"use client";
import {useState, useEffect} from 'react';
import SearchPanel from '../components/SearchPanel';
import TrendingNowCarousel from '../components/TrendingNowCarousel';
import {fetchPopularMovies, fetchSearchResults} from '@/app/services/moviesApi';
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
        const results = await fetchSearchResults(searchQuery, selectedFilter);
        setSearchResults(results);
        setIsLoading(false);
    };

    return (
        <div>
            <h1 className={styles.title}>Trending Now</h1>
            <TrendingNowCarousel movies={movies}/>
            <SearchPanel onSearch={handleSearch}/>
        </div>
    );
};

export default Page;