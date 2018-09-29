import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';
import './LoginPage.css';

const LoginPage = () => (
  <div className="login_page">
    <Header />
    <Route exact path="/createAccount" component={CreateAccount} />
    <Route exact path="/" component={LoginForm} />
  </div>
);

export default LoginPage;
