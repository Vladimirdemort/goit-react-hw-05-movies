import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  Routes,
  Route,
  NavLink,
  useMatch,
  useNavigate,
} from 'react-router-dom';

const Cast = lazy(() =>
  import('components/Cast/Cast.jsx' /* webpackChunkName: "Cast" */),
);
const Review = lazy(() =>
  import('components/Review/Review.jsx' /* webpackChunkName: "Review" */),
);

const MY_KEY = 'bb6fda76db1a0a9cbe1057248af67741';
export default function MovieDetailView() {
  const { movieId } = useParams();
  const match = useMatch(`/movies/:${movieId}`);

  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (movieId === undefined) {
      return;
    }
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MY_KEY}&language=en-US`,
    )
      .then(res => res.json())
      .then(setMovie);
    return () => {};
  }, [movieId]);

  const { backdrop_path, genres, title, overview, vote_average } = movie;
  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>

      {
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
            alt={title}
            width="200"
          />
          <div>
            <div>
              <h1>{title}</h1>
              <p>User Score:{vote_average}</p>
            </div>
            <div>
              <h2>Overview</h2>
              <p>{overview}</p>
            </div>
            <div>
              <h3>Genres</h3>

              <ul>
                {genres !== undefined &&
                  genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
              </ul>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`/movies/${movieId}/review`}>Reviews</NavLink>
              </li>
            </ul>
            <hr />
            <Suspense>
              <Routes>
                <Route path="/cast" element={<Cast />} />
                <Route path="/review" element={<Review />} />
              </Routes>
            </Suspense>
          </div>
        </>
      }
    </>
  );
}
