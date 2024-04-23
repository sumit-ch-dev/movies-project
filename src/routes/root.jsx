import { Outlet, Link } from "react-router-dom"

export default function Root() {
    return (
        <>
            <div>
                <ul className="nav">
                    <div>
                        <li><Link to="/">Home</Link></li>
                    </div>
                    <div className="nav-items">
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </div>
                </ul>

                <Outlet />
            </div>
        </>
    )
}