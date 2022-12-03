import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrors([])
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else return setErrors(['Passwords must be the same.'])
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} id='signup_background'>
      <div className='login_wrapper' >
        <div className='login_display'>
          <div className='login_display'>
            <div id='signup_error'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>

            <label id='white_me'>User Name</label><br></br>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input><br></br>

            <label id='white_me'>First Name</label><br></br>
            <input
              type='text'
              name='firstname'
              onChange={updateFirstName}
              value={firstname}
            ></input><br></br>

            <label id='white_me'>Last Name</label><br></br>
            <input
              type='text'
              name='lastname'
              onChange={updateLastName}
              value={lastname}
            ></input><br></br>

            <label id='white_me'>Email</label><br></br>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input><br></br>

            <label id='white_me'>Password</label><br></br>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input><br></br>

            <label id='white_me'>Repeat Password</label><br></br>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input><br></br><br></br>
            <div id='button_position'>
              <button id='submit' type='submit'>Sign Up</button>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
