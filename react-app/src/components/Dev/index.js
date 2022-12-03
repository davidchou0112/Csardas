import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'
// import Logo from '../../BackgroundImage/BackgroundImage1.jpg'
// import linkedin from '../../BackgroundImage/BackgroundImage1.jpg'

const Dev = () => {
    return (
        <div id='dev_title'>
            <h1 id="dev_title">Thanks for visiting Csárdás!</h1>
            <h2>Get connect with me:</h2>
            {/* <div>
                <a href="https://github.com/davidchou0112">
                    <img className="social-icon" src={Logo} alt='loading' />
                </a>
                <a href="https://www.linkedin.com/in/david-chou-a47026249/">
                    <img className="social-icon-li" src={linkedin} alt='loading' />
                </a>
            </div> */}
        </div>
    )
}
export default Dev;