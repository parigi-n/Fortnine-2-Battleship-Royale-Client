import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginFetch } from '../../Actions/login';
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
    const { username, password } = this.state;
    if (username !== '' && password !== '') {
      const data = new FormData();
      data.append('password', password);
      data.append('username', username);

      this.props.fetchLogin(data);
    }
    event.preventDefault();
  }

  renderRedirect = () => {
    if (this.props.userConnect === true) {
      return <Redirect to='/lobby' />
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="login_form">
      {this.renderRedirect()}
      <p className="error_box">{this.props.hasErrored}</p>
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

const mapStateToProps = (state) => {
  if (state.user.error){
    return {
      hasErrored: "Error : Wrong Id or Password please retry",
      userConnect: false,
    };
  } else if ( state.user.id ){
    return {
      hasErrored: "",
      userConnect: true,
    };
  } else {
    return {
      hasErrored: "",
      userConnect: false,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogin: (data) => dispatch(loginFetch(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
