const API_KEY = '61e2735d71b7e3847b723f570f360fd1';
const BASE_URL = 'https://api.themoviedb.org/3/';

const fetchMovies = async (endpoint, info) => {
  if (endpoint === 'get-trending') {
    const response = await fetch(
      `${BASE_URL}trending/movie/day?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  }

  if (endpoint === 'search-movies') {
    const response = await fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${info}&page=1`,
    );
    const data = await response.json();
    return data;
  }

  if (endpoint === 'get-movie-details') {
    const response = await fetch(`${BASE_URL}movie/${info}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  }

  if (endpoint === 'get-movie-credits') {
    const response = await fetch(
      `${BASE_URL}movie/${info}/credits?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  }

  if (endpoint === 'get-movie-reviews') {
    const response = await fetch(
      `${BASE_URL}movie/${info}/reviews?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  }
};

export default fetchMovies;
