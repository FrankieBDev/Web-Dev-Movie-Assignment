'use client';

import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/moviesApi';

export default function useWatchlist() {
    const [watchList, setWatchList] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedWatchlist = localStorage.getItem('watchList');
            return storedWatchlist ? JSON.parse(storedWatchlist) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('watchList', JSON.stringify(watchList));
        }
    }, [watchList]);

    const saveToWatchList = async (movieId) => {
        const movie = await fetchMovieDetails(movieId);
        setWatchList((oldWatchlist) => {
            const isAlreadyInWatchlist = oldWatchlist.some((item) => item.id === movieId);
            if (!isAlreadyInWatchlist) {
                return [...oldWatchlist, movie];
            }
            return oldWatchlist;
        });
    };

    const removeFromWatchList = (movieId) => {
        setWatchList((oldWatchlist) => oldWatchlist.filter(item => item.id !== movieId));
    };

    const isMovieInWatchlist = (movieId) => {
        return watchList.some((item) => item.id === movieId);
    };

    return {
        watchList,
        saveToWatchList,
        removeFromWatchList,
        isMovieInWatchlist,
    };
}
