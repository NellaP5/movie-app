import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;

    const res = await fetch(`http://localhost:3000/search?q=${query}`);
    const data = await res.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img  
  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/160x240"} 
  alt={movie.Title} 
/>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default App;