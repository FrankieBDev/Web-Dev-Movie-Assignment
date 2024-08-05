"use client";
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '/src/app/services/moviesApi.js';
import TrendingNowCarousel from '../components/TrendingNowCarousel';
import styles from "./page.module.css";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await fetchPopularMovies();
                setMovies(movies);
            } catch (error) {
                setError('Failed to fetch movies.');
            } finally {
                setLoading(false);
            }
        };

        getMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending Now</h1>
            <TrendingNowCarousel movies={movies} />
        </div>
    );
}
