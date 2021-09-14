/* REACT */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* COMPONENTS */
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen} />
        <Route exact path="/auth/register" component={RegisterScreen} />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};
