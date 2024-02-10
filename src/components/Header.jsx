import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <h3>EVA Commerce API</h3>
        <div className="home_header_links">
          <Link to={"/login"}><i class="bi bi-person-fill"></i> Login</Link>
          |
          <Link to={"/"}><i class="bi bi-house-door-fill"></i> Home</Link>
        </div>
      </header>
  )
}

export default Header