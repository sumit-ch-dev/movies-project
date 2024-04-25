import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Root from './routes/root.jsx'
import Profile from './routes/profile.jsx'
import Register from './routes/register.jsx'
import Movies from './routes/movies.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <Movies />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/movies/:id',
        element: <div>Movie</div>
      }
    ]
  }

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
