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

export const fetchMovieCast = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        const data = await response.json();
        return data.cast.map(castMember => castMember.name);
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        return [];
    }
};


export const fetchMoviesByKeyword = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by keyword:', error);
        return [];
    }
};


export const fetchMoviesByGenre = async (genreName) => {
    try {
        const genreResponse = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const genreData = await genreResponse.json();

        const genre = genreData.genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
        if (!genre) {
            return [];
        }

        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return [];
    }
};

export const fetchMoviesByReleaseDate = async (year) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by release date:', error);
        return [];
    }
};

export const fetchMoviesByDuration = async (duration) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_runtime.lte=${duration}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by duration:', error);
        return [];
    }
};
