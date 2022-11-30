import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Logo from '../../src/components/BackgroundImage/Csardas_logo.jpg'
import ProfileButton from './ProfileButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user);
  // console.log('this is user', user)

  if (!user) {
    return (
      <div className='header_wrapper'>
        <div className='header_left'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo' src={Logo} alt='logo' />
          </NavLink>
        </div>

        <div className='header_right'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button>Log In</button>
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <button>Sign Up</button>
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
      </div>


      <div className='header_right'>
        {/* <NavLink to='/users/userId/images/upload' exact={true} activeClassName='active'>
          <button>Post an Image</button>
        </NavLink> */}

        <ProfileButton user={user} />

        {/* <LogoutButton /> */}
      </div>

    </div>
  );
}

export default NavBar;
