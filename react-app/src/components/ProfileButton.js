// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../src/store/session';
import { NavLink, useHistory } from 'react-router-dom';
import './NavBar.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };

    if (!user.username) {
        return 'Refresh'
    } else {
        return (
            <>
                <button className='profile-button' onClick={openMenu}>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />
                    <span class="material-symbols-outlined">
                        density_medium
                    </span>
                </button>

                {showMenu && (
                    <ul className='profile-dropdown'>
                        <div>
                            <p className='options'>
                                {user.username}<br></br>
                                {user.email}
                            </p>
                        </div>

                        {/* <p className='options' >
                            <NavLink to='/current' >
                                <button className='profileButtons'>
                                    My Images
                                </button>
                            </NavLink>
                        </p>

                        <p className='options' >
                            <NavLink to='/my-reviews' >
                                <button className='profileButtons'>
                                    My Reviews
                                </button>
                            </NavLink>
                        </p> */}

                        <p className='options' >
                            <NavLink to={`/users/${user.id}/images/upload`} exact={true} activeClassName='active'>
                                <button className='profileButtons'>
                                    Post an Image
                                </button>
                            </NavLink><br></br>

                            <button className='profileButtons' onClick={logout}>Log Out</button>
                        </p>
                    </ul>
                )}
            </>
        );
    }


}

export default ProfileButton;