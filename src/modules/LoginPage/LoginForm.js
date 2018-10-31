import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import { loginFetch } from '../../Actions/login';
import './LoginPage.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  loginAccount = (event) => {
    const { username, password } = this.state;
    const { fetchLogin } = this.props;
    if (username !== '' && password !== '') {
      const data = new FormData();
      data.append('password', password);
      data.append('username', username);
      fetchLogin(data);
    }
    event.preventDefault();
  }

  renderRedirect = () => {
    const { userConnect } = this.props;
    if (userConnect === true) {
      return <Redirect to="/lobby" />;
    }
    return '';
  }

  render() {
    const {
      username, password,
    } = this.state;
    const { t, hasErrored } = this.props;

    return (
      <div className="login_form">
        {this.renderRedirect()}
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <p className="login_block_text">{ t('USERNAME') }</p>
            <input name="username" className="login_input" type="text" value={username} onChange={this.handleChange} required />
            <p style={(!hasErrored) ? { display: 'none' } : { display: 'block' }} className="error_box">{(hasErrored) ? t('ERROR') : ''}</p>
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('PASSWORD')}</p>
            <input name="password" className="login_input" type="password" value={password} onChange={this.handleChange} required />
          </div>
          <input className="login_button" type="submit" value="Login" />
          <p>
            <Link to="/createAccount">{t('CREATE')}</Link>
          </p>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  fetchLogin: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
  userConnect: PropTypes.bool,
};

LoginForm.defaultProps = {
  hasErrored: false,
  userConnect: false,
};

const mapStateToProps = (state) => {
  if (state.user.error) {
    return {
      hasErrored: true,
      userConnect: false,
    };
  } if (state.user.id) {
    return {
      hasErrored: false,
      userConnect: true,
    };
  }
  return {
    hasErrored: false,
    userConnect: false,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLogin: data => dispatch(loginFetch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('LoginForm')(LoginForm));
