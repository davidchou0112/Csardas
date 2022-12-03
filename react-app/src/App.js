import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllImages from './components/Images/allImages';
import SingleImage from './components/Images/singleImage';
import PostImage from './components/PostImage/postImage';
import Dev from './components/Dev';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>


        <Route path='/' exact={true}>
          <AllImages />
        </Route>

        <Route path='/images/:imageId' exact={true}>
          <SingleImage />
        </Route>

        <Route path='/users/:userId/images/upload'>
          <PostImage />
        </Route>

        <Route path='/dev' exact={true}>
          <Dev />
        </Route>



      </Switch>
    </BrowserRouter >
  );
}

export default App;
