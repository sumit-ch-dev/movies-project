import React, { useState } from "react";
import movies from "../static/movies"
import './movies.css'
import localforage from "localforage";

export const FilterMovies = ({ movies, buttonType }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        // console.log(event.target.value);
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast.join(", ").toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.year.toString().includes(searchTerm) ||
        movie.releaseDate.toLowerCase().includes(searchTerm.toLowerCase())
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
            <MovieList movies={filteredMovies} buttonType={buttonType} />
        </div>
    );
}

const MovieList = ({ movies, buttonType }) => {
    return (
        <ul className="movie-list">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} buttonType={buttonType} />
            ))}
        </ul>
    );

}

const MovieCard = ({ movie, buttonType }) => {
    const addToFavourite = () => {
        // add to favourite with localforage
        // dont add a movie twice

        localforage.getItem('favoriteMovies').then((favoriteMovies) => {
            if (favoriteMovies) {
                const movieExists = favoriteMovies.find((favoriteMovie) => favoriteMovie.title === movie.title);
                if (!movieExists) {
                    localforage.setItem('favoriteMovies', [...favoriteMovies, movie])
                }
            } else {
                localforage.setItem('favoriteMovies', [movie])
            }
        })
    }

    const removeFromFavorite = () => {
        // remove from favorite with localforage
        localforage.getItem('favoriteMovies').then((favoriteMovies) => {
            const newFavoriteMovies = favoriteMovies.filter((favoriteMovie) => favoriteMovie.title !== movie.title)
            localforage.setItem('favoriteMovies', newFavoriteMovies)
        })
    }

    const button = buttonType === "remove" ? (
        <button className="btn-primary" onClick={removeFromFavorite}>Remove from favorite</button>
    ) : (
        <button className="btn-primary" onClick={addToFavourite}>Add to favorite</button>
    )

    return (
        <li className="movie--card">
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Directed by {movie.director}</p>
                <p>Released in {movie.year}</p>
                <p>Category: {movie.category}</p>
                <p>Cast: {movie.cast.join(", ")}</p>
                <p>Budget: {movie.budget}</p>
                <p>Release Date: {movie.releaseDate}</p>
            </div>
            {button}
        </li>
    );
}

export default function Movies() {
    return (
        <div className="movies">
            <FilterMovies movies={movies} buttonType="add" />
        </div>
    )
}