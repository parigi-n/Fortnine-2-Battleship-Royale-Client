import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFetch } from '../../Actions/login';
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

        this.props.fetchCreate(data);
      } else {
        console.log("passwords doesn't match");
      }
    } else {
      console.log('all fields are mendatory');
    }
    event.preventDefault();
  }

  renderRedirect = () => {
    if (this.props.userConnect === true) {
      return <Redirect to='/lobby' />
    }
  }

  render() {
    const {
      email, username, password, confirmpassword,
    } = this.state;
    return (
      <div className="login_form">
      {this.renderRedirect()}
      <p className="error_box">{this.props.hasErrored}</p>
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

const mapStateToProps = (state) => {
  if (state.user.error){
    return {
      hasErrored: "Error : this account already exist",
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
        fetchCreate: (data) => dispatch(createFetch(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
