import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import img from '../../images/404_notfound.png';

const HomePage = lazy(() =>
  import('../HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('../MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MoviePage = lazy(() =>
  import('../MoviePage/MoviePage' /* webpackChunkName: "MoviePage" */),
);

const loaderStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const Main = () => {
  return (
    <main>
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
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:id">
            <MoviePage />
          </Route>
          <Route>
            <img src={img} alt="Not found" />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;
