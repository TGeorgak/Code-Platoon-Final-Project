import React from 'react'
import './NavBarCSS.css'
import { Link } from 'react-router-dom'

function NavBar (props){
  return(
    <div id="nav-container">
      <div className="sub-nav-title">COVID APP</div>
      <div className="sub-nav-home-button">
        <Link to="/">HOME</Link>
        </div>
      <div className="sub-nav-login-button">Login</div>
      <div className="sub-nav-signup-button">Signup</div>
    </div>
  )
}

export default NavBar