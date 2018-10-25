import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess } from '../../Actions/login';
import './LoginPage.css';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
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
    const {
      email, username, password, confirmpassword,
    } = this.state;
    if (email !== '' && username !== '' && password !== '' && confirmpassword !== '') {
      if (password === confirmpassword) {
        const data = new FormData();
        data.append('password', password);
        data.append('username', username);
        data.append('email', email);

        fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          body: data,
        }).then((response) => {
          if (response.ok) {
            return 'Account create';// response.headers.get('authorization');
          }
          throw new Error('Network response was not ok.');
        }).catch((error) => {
          console.log('There has been a problem with your fetch operation: ', error.message);
        });
      } else {
        console.log("passwords doesn't match");
      }
    } else {
      console.log('all fields are mendatory');
    }
    event.preventDefault();
  }

  render() {
    const {
      email, username, password, confirmpassword,
    } = this.state;
    return (
      <div className="login_form">
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <p className="login_block_text">Email</p>
            <input name="email" className="login_input" type="text" value={email} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">Username</p>
            <input name="username" className="login_input" type="text" value={username} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">Password</p>
            <input name="password" className="login_input" type="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">Confirm password</p>
            <input name="confirmpassword" className="login_input" type="password" value={confirmpassword} onChange={this.handleChange} />
          </div>
          <input className="login_button" type="submit" value="Create" />
          <p>
            <Link to="/">You already have an account login</Link>
          </p>
        </form>
      </div>
    );
  }
}


export default connect()(CreateAccount);
