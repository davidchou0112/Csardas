import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  if (!user) {
    return (
      <div className='header_wrapper'>
        <div className='header_left'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>

        <div className='header_right'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className='header_wrapper'>

      <div className='header_left'>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>


      <div className='header_right'>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>

        <LogoutButton />
      </div>

    </div>
  );
}

export default NavBar;
