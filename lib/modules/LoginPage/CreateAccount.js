import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../LoginPage/LoginPage.css';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: ''
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
    if (this.state.email !== '' && this.state.password !== '' && this.state.confirmpassword !== '') {
      if (this.state.password === this.state.confirmpassword) {
        console.log("Create account request send email : " + this.state.email + " password : " + this.state.password);
      } else {
        //error password and confirmpassword doesn't match
      }
    } else {
        //error you must complete every field
      }
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
        React.createElement(
          'div',
          { className: 'login_block' },
          React.createElement(
            'p',
            { className: 'login_block_text' },
            'Confirm password'
          ),
          React.createElement('input', { name: 'confirmpassword', className: 'login_input', type: 'password', value: this.state.passwordconfirm, onChange: this.handleChange })
        ),
        React.createElement('input', { className: 'login_button', type: 'submit', value: 'Login' }),
        React.createElement(
          'p',
          null,
          'You already have an account login ',
          React.createElement(
            Link,
            { to: '/' },
            'here'
          )
        )
      )
    );
  }
}

export default CreateAccount;