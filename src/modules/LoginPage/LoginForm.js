import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  setUser from '../../Actions/login'
import './LoginPage.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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
    const { dispatch } = this.props;
    const { username, password } = this.state;
    if (username !== '' && password !== '') {
      const data = new FormData();
      data.append('password', password);
      data.append('username', username);
      //dispatch(setUser('1111', 4, 'sze@gmail.com', 'JeanMifan'));

      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.headers.get('authorization');
        }
        throw new Error('Network response was not ok.');
      }).then((tokenAuth) => {
        fetch('http://localhost:3000/users/me', {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: tokenAuth,
          },
        }).then((response) => {
          console.log(response);
        });
      }).catch((error) => {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    }
    event.preventDefault();
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="login_form">
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <p className="login_block_text">Username</p>
            <input name="username" className="login_input" type="text" value={username} onChange={this.handleChange} />
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

export default connect()(LoginForm);
