import { useEffect, useState} from 'react';
import SearchIcon from './search.svg' ;
import MovieCard from './MovieCard';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=68c3fca';

const App =() => {
  const [movies, setMovies] = useState();
  const [searchMovie, setSearchMovie] = useState('') ;

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);

  }

  useEffect(() => {
    searchMovies('superman');
  }, []);

  return (
    <div className='app'>
      <h1>MovieWorld</h1>

      <div className='search'>
        <input 
          placeholder='Search for movies'
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchMovie)}
        />
      </div>

      {
        movies?.length > 0 
        ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }

      

    </div>
  );
}

export default App;
