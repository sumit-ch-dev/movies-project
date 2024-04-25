import { useState } from "react"
import localforage from "localforage"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        if (email) {
            localforage.setItem('email', email)
            navigate('/')
        }
    }


    return (
        <div className="register">
            <h1>Register</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
    )
}