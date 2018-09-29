import React, { Component } from 'react';
import Header from '../Header'
import LoginForm from './LoginForm'
import CreateAccount from './CreateAccount'
import { Switch, Route } from 'react-router-dom'
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="login_page">
        <Header />
        <Route exact path='/createAccount' component={CreateAccount}/>
        <Route exact path='/' component={LoginForm}/>
      </div>
    );
  }
}

export default LoginPage;
