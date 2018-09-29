import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
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
    const { email, password, confirmpassword } = this.state;
    if (email !== '' && password !== '' && confirmpassword !== '') {
      if (password === confirmpassword) {
        console.log(`Create account request send email : ${email} password : ${password}`);
      } else {
        console.log("passwords doesn't match");
      }
    } else {
      // error you must complete every field
    }
    event.preventDefault();
  }

  render() {
    const { email, password, confirmpassword } = this.state;
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
          <div className="login_block">
            <p className="login_block_text">Confirm password</p>
            <input name="confirmpassword" className="login_input" type="password" value={confirmpassword} onChange={this.handleChange} />
          </div>
          <input className="login_button" type="submit" value="Login" />
          <p>
            <Link to="/">You already have an account login</Link>
          </p>
        </form>
      </div>
    );
  }
}


export default CreateAccount;
