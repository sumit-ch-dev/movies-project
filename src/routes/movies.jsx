import React, { useState } from "react";
import movies from "../static/movies"
import './movies.css'

const FilterMovies = ({ movies }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        // console.log(event.target.value);
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="filter-movies">
            <div className="input-box">
                <input
                    type="text"
                    placeholder="Search movies"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <MovieList movies={filteredMovies} />
        </div>
    );
}

const MovieList = ({ movies }) => {
    return (
        <ul className="movie-list">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </ul>
    );

}

const MovieCard = ({ movie }) => {
    const addToFavourite = () => {
        console.log(`Added ${movie.title} to favourite`);
    }

    return (
        <li className="movie--card">
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Directed by {movie.director}</p>
                <p>Released in {movie.year}</p>
            </div>
            <button className="btn-primary" onClick={addToFavourite}>Add to favourite</button>
        </li>
    );
}

export default function Movies() {
    return (
        <div className="movies">
            <FilterMovies movies={movies} />
        </div>
    )
}