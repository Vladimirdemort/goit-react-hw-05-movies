import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Cast.module.css';

const MY_KEY = 'bb6fda76db1a0a9cbe1057248af67741';

export default function Cast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MY_KEY}&language=en-US`,
    )
      .then(res => res.json())
      .then(data => setCast(data.cast));
    return () => {};
  }, [movieId]);

  return (
    <>
      <ul className={s.cast}>
        {cast.map(actor => (
          <li key={actor.id} className={s.actor}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
              width={300}
              height={450}
            />
            <h3>{actor.name}</h3>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
