import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginAccount = this.loginAccount.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  loginAccount(event) {
    const { email, password } = this.state;
    if (email !== '' && password !== '') {
      console.log(`Login request send email : ${email} password : ${password}`);
    }
    event.preventDefault();
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login_form">
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <p className="login_block_text">Email</p>
            <input name="email" className="login_input" type="text" value={email} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">Password</p>
            <input name="password" className="login_input" type="password" value={password} onChange={this.handleChange} />
          </div>
          <input className="login_button" type="submit" value="Login" />
          <p>
            <Link to="/createAccount">Create your account</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
