import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoUserButton = (e) => {
    setEmail('yoru@aa.io');
    setPassword('password');
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    // <div>
    <form onSubmit={onLogin}>
      <div className='login_wrapper' id='login_background'>
        <div id='error'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label id='white_me' htmlFor='email'>Email</label><br></br>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          /><br></br><br></br>
          <label id='white_me' htmlFor='password'>Password</label><br></br>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          /><br></br><br></br>
          <div id='button_position'>
            <button id='submit' type='submit' onClick={demoUserButton}>Demo User</button><br></br>
            <button id='submit' type='submit'>Login</button>
          </div>
        </div>
        {/* <div id='white_me'><small>Not on Csárdás? <NavLink to='/sign-up' exact={true}>Create an account</NavLink></small></div> */}
      </div>
    </form>

  );
};

export default LoginForm;
