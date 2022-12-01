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
    <form className='signup_wrapper' id='signup_background' onSubmit={onSignUp}>
      <div >
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label><br></br>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input><br></br>

        <label>First Name</label><br></br>
        <input
          type='text'
          name='firstname'
          onChange={updateFirstName}
          value={firstname}
        ></input><br></br>

        <label>Last Name</label><br></br>
        <input
          type='text'
          name='lastname'
          onChange={updateLastName}
          value={lastname}
        ></input><br></br>

        <label>Email</label><br></br>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input><br></br>

        <label>Password</label><br></br>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input><br></br>

        <label>Repeat Password</label><br></br>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input><br></br>
        <button type='submit'>Sign Up</button>
      </div>
      <div><small>Already on Csárdás? <NavLink to='/login' exact={true}>Login</NavLink></small></div>

    </form>
  );
};

export default SignUpForm;
