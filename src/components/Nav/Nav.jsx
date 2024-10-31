import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  console.log("user Roles in", user.Roles)

  return (
    // main nav 
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
        
          <>
          {/* Link to the home page */}
            <Link className="navLink" to="/user">
              Home
            </Link>
         
            {/* Link to the info page */}
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            {/* Conditional rendering based on user role */}
            {user.Roles===0 ? (

            // Link to the driver dashboard if user role is driver (0)
            <Link className="navLink" to="/driver-dashboard">
              Driver Dashboard 
            </Link>
            ): ( 
              // Link to the dispatcher dashboard if user role is dispatcher
          
              <Link className="navLink" to="/dispatcher-dashboard">
                Dispatcher Dashboard
              </Link>
            )}
        

            <LogOutButton className="navLink" />
          </>
        )}
        {/* Link to the about page, always visible */}
        
        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
    
  );
}

export default Nav;
