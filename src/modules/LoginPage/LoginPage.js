import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';
import './LoginPage.css';

const LoginPage = () => (
  <div className="login_page">
    <Route exact path="/createAccount" component={CreateAccount} />
    <Route exact path="/" component={LoginForm} />
  </div>
);

export default LoginPage;
