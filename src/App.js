import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Container from './components/Container';
import AppBar from './components/AppBar/AppBar';
import errorImage from './pages/error.jpg';
import MovieDetailView from './components/MovieDetailView/MovieDetailView.jsx';
import './App.css';

const HomePage = lazy(() =>
  import('./pages/HomePage.jsx' /* webpackChunkName: "HomePage" */),
);
const NotFoundView = lazy(() =>
  import('./pages/NotFoundView.jsx' /* webpackChunkName: "NotFoundView" */),
);

const Movies = lazy(() => import('./pages/Movies.jsx'));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense
        fallback={
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailView />} />
          <Route
            path="*"
            element={
              <NotFoundView
                errorImage={errorImage}
                messadge="Ошибка 404: страница не найдена :("
              />
            }
          />
        </Routes>
      </Suspense>

      <ToastContainer />
    </Container>
  );
}
