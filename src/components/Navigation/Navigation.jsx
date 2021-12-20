// import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        className={styles.link}
        to="/"
        activeClassName={styles.active}
        isActive={(match, location) =>
          match?.isExact || location.pathname === match.url
        }
      >
        Home
      </NavLink>
      <NavLink
        className={styles.link}
        to="/movies"
        activeClassName={styles.active}
      >
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
