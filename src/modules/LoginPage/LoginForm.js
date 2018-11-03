import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
import { loginFetch } from '../../Actions/login';
import './LoginPage.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    const { username } = this.props;
      this.state = {
      username: username,
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
    const { userConnect, token } = this.props;
    if (userConnect === true && token !== '') {
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
            <FormControl error={!(!hasErrored)}>
              <InputLabel htmlFor={(!hasErrored) ? 'component-simple' : 'component-error-text'} style={{ color: 'black' }}>{ t('USERNAME') }</InputLabel>
              <Input name="username" value={username} onChange={this.handleChange} required />
              <FormHelperText style={(!hasErrored) ? { display: 'none' } : { display: 'block' }} id="component-error-text">{(hasErrored) ? t('ERROR') : ''}</FormHelperText>
            </FormControl>
          </div>
          <div className="login_block">
            <FormControl>
              <InputLabel htmlFor="component-simple" style={{ color: 'black' }}>{ t('PASSWORD') }</InputLabel>
              <Input name="password" value={password} onChange={this.handleChange} type="password" required />
            </FormControl>
          </div>
          <CustomButton type="submit" text="LOGIN" />
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
  username: PropTypes.string,
  fetchLogin: PropTypes.func.isRequired,
  token: PropTypes.string,
  hasErrored: PropTypes.bool,
  userConnect: PropTypes.bool,
};

LoginForm.defaultProps = {
  token: '',
  username: '',
  hasErrored: false,
  userConnect: false,
};

const mapStateToProps = (state) => {
  if (state.user.error_login) {
    return {
      token: state.user.token,
      hasErrored: true,
      userConnect: false,
    };
  } if (state.user.id) {
    return {
      token: state.user.token,
      username: state.user.username,
      hasErrored: false,
      userConnect: true,
    };
  }
  return {
    token: state.user.token,
    hasErrored: false,
    userConnect: false,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLogin: data => dispatch(loginFetch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('LoginForm')(LoginForm));
