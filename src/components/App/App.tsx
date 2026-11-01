import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { getMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { useState } from 'react';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearchSubmit = async (query: string) => {
    setError(false);
    setIsLoading(true);
    setMovies([]);
    try {
      const movies = await getMovies({ query });
      if (movies.results.length === 0) {
        toast.error('No movies found for your request.');
        setIsLoading(false);
        return;
      }
      setMovies(movies.results);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      return error;
    }
  };

  const handleModalOpen = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css['app']}>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid onSelect={handleModalOpen} movies={movies} />
      )}
      {error && <ErrorMessage />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default App;
