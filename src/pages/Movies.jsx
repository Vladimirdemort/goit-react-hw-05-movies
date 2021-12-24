import PageHeading from 'components/PageHeading/PageHeading';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bb6fda76db1a0a9cbe1057248af67741&language=en-US&query=${query}&page=1&include_adult=true`,
    )
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      });
    setQuery('');
  };
  console.log(movies);
  return (
    <>
      <PageHeading text="Movies" />
      <form onSubmit={onSubmit}>
        <input
          className={''}
          type="text"
          autoomplete="off"
          autoFocus
          placeholder="Search moveis"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={''}>
          <span>Search</span>
        </button>
      </form>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
