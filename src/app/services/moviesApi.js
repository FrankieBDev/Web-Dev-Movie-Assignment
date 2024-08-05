const API_KEY = '7fde000946e5994676831d9b22ee28dd';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};