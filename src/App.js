import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


// main -> functional component

// 4bab53e6 ->API KEY
const API_URL = 'http://www.omdbapi.com?apikey=4bab53e6';
// const movie = {
//     "Title": "Spiderman",
//     "Year": "1990",
//     "imdbID": "tt0100669",
//     "Type": "movie",
//     "Poster": "N/A"
// }
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []); //useEffect -> accepts a  callback function & an empty dependency array. -> if we only want to call the useEffect hook at the start.
    return (


        <div className='app'>
            <div className='heading'>
                <h1>MOVFLIX</h1>
            </div>

            <div className='search'>
                <input placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)} />
                <img src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>

    )
}

export default App;

// every component should be exported , so that they can be called by  other files.