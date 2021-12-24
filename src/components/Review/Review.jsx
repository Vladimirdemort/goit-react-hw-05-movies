import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const MY_KEY = 'bb6fda76db1a0a9cbe1057248af67741';

export default function Review() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${MY_KEY}&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(data => setReviews(data.results));
    return () => {};
  }, [movieId]);
  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }
  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
