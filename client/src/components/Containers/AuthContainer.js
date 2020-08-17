import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthPage from '../auth/AuthPage';

export const AuthContainer = () => (
  <React.Fragment>
    <Route exact path='/' render={() => <Redirect to='/auth' />} />
    <Route path='/auth' component={AuthPage} />
  </React.Fragment>
);
