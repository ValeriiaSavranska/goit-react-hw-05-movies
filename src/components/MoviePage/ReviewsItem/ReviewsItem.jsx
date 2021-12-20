import { useState } from 'react';
import fetchMovies from '../../../services/api';

const API_ENDPOINT = 'get-movie-reviews';

const ReviewsItem = ({ id }) => {
  const [comment, setComment] = useState(() =>
    fetchMovies(API_ENDPOINT, id)
      .then(data => setComment(data.results))
      .catch(error => console.log(error.message)),
  );

  return (
    <ul>
      {comment && comment.length === 0 && (
        <li>We don't have any reviews for this movie</li>
      )}
      {!!comment.length &&
        comment.map(item => (
          <li key={item.id}>
            <h3>Author: {item.author}</h3>
            <p>{item.content}</p>
          </li>
        ))}
    </ul>
  );
};

export default ReviewsItem;
