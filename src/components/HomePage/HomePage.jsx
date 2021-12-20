import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import fetchMovies from '../../services/api';
import img from '../../images/404_notfound.png';
import styles from './Homepage.module.css';

const API_ENDPOINT = 'get-trending';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(() => {
    fetchMovies(API_ENDPOINT)
      .then(movies => {
        setTrendingMovies(movies.results);
      })
      .catch(error => console.log(error.message));
  });

  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending today</h1>
      <ul className={styles.list}>
        {trendingMovies &&
          trendingMovies.map(movie => (
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
    </div>
  );
};

export default HomePage;
