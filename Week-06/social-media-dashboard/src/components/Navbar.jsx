import React, { useContext } from 'react' // Update import
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { ThemeContext } from '../contexts/ThemeContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className="bg-purple-700 p-4 text-white flex justify-between">
      <div>
        <Link to="/feed" className="mr-4">Feed</Link>
        <Link to="/profile" className="mr-4">Profile</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <button
          onClick={toggleTheme}
          className="ml-4 bg-transparent border-0 p-0 text-white cursor-pointer"
          aria-label="Toggle theme"
        >
          Theme: {theme}
        </button>
      </div>
    </nav>
  )
}