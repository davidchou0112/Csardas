// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../src/store/session';
import { NavLink, useHistory } from 'react-router-dom';
// import EditSpotFormModal from '../EditSpot';

// import { useSelector } from 'react-redux';
// import CreateSpotFormModal from '../CreateSpotFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);


    // const sessionUser = useSelector(state => state.session.user);

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


    // const sessionUser = useSelector(state => state.session.user);
    // let sessionLinks
    // if (sessionUser) {
    //     sessionLinks = (
    //         <div>
    //             <CreateSpotFormModal />
    //         </div>
    //     );
    // }

    if (!user.username) {
        return 'Refresh'
    } else {
        return (
            <>
                <button className='profile-button' onClick={openMenu}>
                    <i className='fas fa-user-circle' />
                </button>

                {showMenu && (
                    <ul className='profile-dropdown'>

                        <p className='options'>
                            {user.username}
                        </p>

                        <p className='options'>
                            {user.email}
                        </p>

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
                            <NavLink to='/users/userId/images/upload' exact={true} activeClassName='active'>
                                <button className='profileButtons'>
                                    Post an Image
                                </button>
                            </NavLink>
                        </p>

                        <p className='options'>
                            <button className='profileButtons' onClick={logout}>Log Out</button>
                        </p>
                    </ul>
                )}
            </>
        );
    }


}

export default ProfileButton;