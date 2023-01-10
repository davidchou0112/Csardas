import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
import Logo from '../../src/components/BackgroundImage/Csardas_logo.jpg'
import ProfileButton from './ProfileButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  if (!user) {
    return (
      <div className='header_wrapper'>
        <div className='header_left'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo' src={Logo} alt='logo' />
          </NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>
            <button id='signup_button' className='splash_nav_right'>Explore</button>
          </NavLink>
          <NavLink to='/tags' exact={true} activeClassName='active'>
            <button id='signup_button' className='splash_nav_right'>Tags</button>
          </NavLink>
        </div>

        <div className='header_right'>
          <a target='_blank' rel='noopener noreferrer' href="https://github.com/davidchou0112">
            <button id='login_button' className='splash_nav_right'>GitHub</button>
          </a>
          <a target='_blank' rel='noopener noreferrer' href="https://www.linkedin.com/in/david-chou-a47026249/">
            <button id='login_button' className='splash_nav_right'>LinkedIn</button>
          </a>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button id='login_button' className='splash_nav_right'>Log In</button>
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <button id='signup_button' className='splash_nav_right'>Sign Up</button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className='header_wrapper'>
      <div className='header_left'>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img className='logo' src={Logo} alt='logo' />
        </NavLink>
        <NavLink to='/' exact={true} activeClassName='active'>
          <button id='signup_button' className='splash_nav_right'>Explore</button>
        </NavLink>
        <NavLink to='/tags' exact={true} activeClassName='active'>
          <button id='signup_button' className='splash_nav_right'>Tags</button>
        </NavLink>
      </div>

      <div className='header_right'>
        <a target='_blank' rel='noopener noreferrer' href="https://github.com/davidchou0112">
          <button id='login_button' className='splash_nav_right'>GitHub</button>
        </a>
        <a target='_blank' rel='noopener noreferrer' href="https://www.linkedin.com/in/david-chou-a47026249/">
          <button id='login_button' className='splash_nav_right'>LinkedIn</button>
        </a>
        <ProfileButton user={user} />
      </div>
    </div>
  );
}

export default NavBar;
