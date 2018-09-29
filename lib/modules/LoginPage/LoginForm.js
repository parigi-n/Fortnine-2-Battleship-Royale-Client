import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginAccount = this.loginAccount.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  loginAccount(event) {
    if (this.state.email !== '' && this.state.password !== '') {
      console.log("Login request send email : " + this.state.email + " password : " + this.state.password);
    } else {}
    event.preventDefault();
  }

  render() {
    return React.createElement(
      'div',
      { className: 'login_form' },
      React.createElement(
        'form',
        { onSubmit: this.loginAccount },
        React.createElement(
          'div',
          { className: 'login_block' },
          React.createElement(
            'p',
            { className: 'login_block_text' },
            'Email'
          ),
          React.createElement('input', { name: 'email', className: 'login_input', type: 'text', value: this.state.email, onChange: this.handleChange })
        ),
        React.createElement(
          'div',
          { className: 'login_block' },
          React.createElement(
            'p',
            { className: 'login_block_text' },
            'Password'
          ),
          React.createElement('input', { name: 'password', className: 'login_input', type: 'password', value: this.state.password, onChange: this.handleChange })
        ),
        React.createElement('input', { className: 'login_button', type: 'submit', value: 'Login' }),
        React.createElement(
          'p',
          null,
          'Create your account ',
          React.createElement(
            Link,
            { to: '/createAccount' },
            'here'
          )
        )
      )
    );
  }
}

export default LoginForm;