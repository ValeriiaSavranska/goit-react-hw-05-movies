import { useState } from 'react';
import fetchMovies from '../../../services/api';
import img from '../../../images/404_notfound.png';

const API_ENDPOINT = 'get-movie-credits';

const CastItem = ({ id }) => {
  const [cast, setCast] = useState(() => {
    fetchMovies(API_ENDPOINT, id)
      .then(data => setCast(data.cast))
      .catch(error => console.log(error.message));
  });

  return (
    <ul>
      {cast && cast.length === 0 && (
        <li>We don't have any information about the actors of this movie</li>
      )}
      {cast &&
        cast.map(item => (
          <li key={item.id}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w300/${item.profile_path}`
                  : img
              }
              alt={item.name}
              width="100"
            />
            <p>{item.name}</p>
            <p>Character: {item.character}</p>
          </li>
        ))}
    </ul>
  );
};

export default CastItem;
