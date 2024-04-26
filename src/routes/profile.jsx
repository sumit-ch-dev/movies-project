import { useEffect, useState } from "react"
import localforage from "localforage"
import './profile.css'
import { FilterMovies } from "./movies"



const ProfileDetails = ({ user }) => {
    return (
        <div className="profile-details">
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
        </div>
    )
}

const ProfileInfo = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        localforage.getItem('email').then((email) => {
            setUser({ email })
        })
    }, [])

    return (
        // get user info from localforage
        <div>
            <ProfileDetails user={user} />
        </div>
    )
}

const MovieCard = ({ movie }) => {

    const removeFromFavorite = () => {

        localforage.getItem('favoriteMovies').then((favoriteMovies) => {
            const newFavoriteMovies = favoriteMovies.filter((favoriteMovie) => favoriteMovie.title !== movie.title)
            localforage.setItem('favoriteMovies', newFavoriteMovies)
        })
    }

    return (
        <li className="movie--card">
            <div>
                <h2>{movie.title}</h2>
                <p>Directed by {movie.director}</p>
                <p>Cast: {movie.cast.join(", ")}</p>
                <p>Category: {movie.category}</p>
                <p>Year: {movie.year}</p>
                <p>Release Date: {movie.releaseDate}</p>
                {/* remove from favorite */}
                <button className="btn-primary" onClick={removeFromFavorite}>Remove from favorite</button>
            </div>
        </li>
    )
}


const FavoriteMoviesList = ({ favoriteMovies }) => {
    return favoriteMovies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
    ))
}

const FavoriteMovies = () => {


    return (
        <div>
            <h1>Favorite Movies</h1>
            <ul className="movie-list">
                <FavoriteMoviesList favoriteMovies={favoriteMovies} />
            </ul>
        </div>
    )
}


const Profile = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([])

    // rerender the component when favoriteMovies change
    useEffect(() => {
        localforage.getItem('favoriteMovies').then((favoriteMovies) => {
            setFavoriteMovies(favoriteMovies)
        }).catch((error) => {
            console.error(error)
        })
    }, [favoriteMovies])
    return (
        <div className="profile">
            <ProfileInfo />
            <FilterMovies movies={favoriteMovies} buttonType="remove" />
        </div>
    )
}

export default Profile