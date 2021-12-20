import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

import fetchMovies from '../../services/api';
import img from '../../images/404_notfound.png';

import styles from './MoviesPage.module.css';

const API_ENDPOINT = 'search-movies';

const MoviesPage = () => {
  const [seachMoviesTitle, setSearchMoviesTitle] = useState('');
  const [movieSearchResult, setMovieSearchResult] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { search } = useLocation();
  const { query } = qs.parse(search);

  const handelChange = event => {
    setSearchMoviesTitle(event.currentTarget.value.toLowerCase());
  };

  const handelSubmit = event => {
    event.preventDefault();
    if (seachMoviesTitle.trim() === '') return;

    history.push({
      pathname: '/movies',
      search: `?query=${seachMoviesTitle}`,
    });
  };

  useEffect(() => {
    if (query === undefined) return;
    fetchMovies(API_ENDPOINT, query)
      .then(movies => {
        setMovieSearchResult(movies.results);
      })
      .catch(error => console.log(error.message));
  }, [history, query, seachMoviesTitle]);

  return (
    <>
      <form onSubmit={handelSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="search movies"
          name="seachMoviesTitle"
          value={seachMoviesTitle}
          onChange={handelChange}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>

      <ul className={styles.list}>
        {movieSearchResult &&
          movieSearchResult.map(movie => (
            <li key={movie.id} className={styles.item}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                      : img
                  }
                  alt={movie.title}
                  width="100"
                  className={styles.img}
                />
                <p className={styles.text}>{movie.title}</p>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MoviesPage;
