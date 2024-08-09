const API_KEY = '7fde000946e5994676831d9b22ee28dd'; // make secret
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

export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};
export const fetchSearchResults = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
};