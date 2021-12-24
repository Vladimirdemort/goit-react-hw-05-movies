import PageHeading from '../components/PageHeading/PageHeading';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MY_KEY = 'bb6fda76db1a0a9cbe1057248af67741';

export default function HomePage() {
  const [trends, setTrends] = useState();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${MY_KEY}`)
      .then(res => res.json())
      .then(data => {
        setTrends(data.results);
      });
  }, []);
  console.log(trends);
  return (
    <>
      <PageHeading text="Trending today" />
      <ul>
        {trends &&
          trends.map(trend => (
            <li key={trend.id}>
              <Link to={`/movies/${trend.id}`}>{trend.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
