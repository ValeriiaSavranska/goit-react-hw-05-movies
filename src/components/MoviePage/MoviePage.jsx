import { useState, lazy, Suspense } from 'react';
import {
  useRouteMatch,
  Link,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import fetchMovies from '../../services/api';
import img from '../../images/404_notfound.png';
import styles from './MoviePage.module.css';

const CastItem = lazy(() =>
  import('./CastItem/CastItem' /* webpackChunkName: "CastItem" */),
);
const ReviewsItem = lazy(() =>
  import('./ReviewsItem/ReviewsItem' /* webpackChunkName: "ReviewsItem" */),
);

const loaderStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const API_ENDPOINT = 'get-movie-details';

const MoviePage = () => {
  const match = useRouteMatch();
  const { url, path } = match;
  const id = match.params.id;

  const location = useLocation();

  const history = useHistory();

  const [movie, setMovie] = useState(() => {
    fetchMovies(API_ENDPOINT, id)
      .then(movieById => {
        setMovie(movieById);
      })
      .catch(error => console.log(error.message));
  });

  const date = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'no info';

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <div className={styles.wrapper}>
      {movie && (
        <>
          <button type="button" onClick={onGoBack} className={styles.btn}>
            <span>&#129044;</span>Go Back
          </button>
          <div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                  : img
              }
              alt={movie.title}
              width="400"
              className={styles.img}
            />
            <div>
              <h1>
                {movie.title} ({date})
              </h1>
              <p>
                User Score: <span>{movie.vote_average * 10}</span>%
              </p>
              <p>
                Overview: <span>{movie.overview}</span>
              </p>
              <p>
                Genres:{' '}
                <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
              </p>
            </div>
          </div>
          <div>
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: location.state?.from },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location.state?.from },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense
              fallback={
                <Loader
                  type="Circles"
                  color="rgba(214, 214, 214, 0.57)"
                  height={100}
                  width={100}
                  timeout={3000}
                  style={{ ...loaderStyle }}
                />
              }
            >
              <Switch>
                <Route path={`${path}/cast`}>
                  <CastItem id={id} />
                </Route>
                <Route path={`${path}/reviews`}>
                  <ReviewsItem id={id} />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
