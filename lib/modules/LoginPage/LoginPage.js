import React, { Component } from 'react';
import Header from '../Header';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';
import { Switch, Route } from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'login_page' },
      React.createElement(Header, null),
      React.createElement(Route, { exact: true, path: '/createAccount', component: CreateAccount }),
      React.createElement(Route, { exact: true, path: '/', component: LoginForm })
    );
  }
}

export default LoginPage;