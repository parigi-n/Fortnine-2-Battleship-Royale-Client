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
      errorMessage: '',
      errorMatchPwd: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  loginAccount = (event) => {
    const {
      email, username, password, confirmpassword,
    } = this.state;
    const { t, fetchCreate } = this.props;
    this.setState({
      errorMessage: '',
      errorMatchPwd: false,
    });
    if (email !== '' && username !== '' && password !== '' && confirmpassword !== '') {
      if (password === confirmpassword) {
        const data = new FormData();
        data.append('password', password);
        data.append('username', username);
        data.append('email', email);
        fetchCreate(data);
      } else {
        this.setState({ errorMessage: t('ERROR_PM'), errorMatchPwd: true });
      }
    }
    event.preventDefault();
  }

  renderRedirect = () => {
    const { userConnect } = this.props;
    if (userConnect === true) {
      return <Redirect to="/" />;
    }
    return '';
  }

  render() {
    const {
      email, username, password, confirmpassword, errorMessage,
      errorMatchPwd,
    } = this.state;
    const { t, hasErrored } = this.props;

    return (
      <div className="login_form">
        {this.renderRedirect()}
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <FormControl error={!(!hasErrored)}>
              <InputLabel htmlFor={(!hasErrored) ? 'component-simple' : 'component-error-text'} style={{ color: 'black' }}>{ t('EMAIL') }</InputLabel>
              <Input name="email" id={(!hasErrored) ? 'component-simple' : 'component-error-text'} value={email} onChange={this.handleChange} type="email" required />
              <FormHelperText style={(!hasErrored) ? { display: 'none' } : { display: 'block' }} id="component-error-text">{(hasErrored) ? t('ERROR') : ''}</FormHelperText>
            </FormControl>
          </div>
          <div className="login_block">
            <FormControl>
              <InputLabel htmlFor="component-simple" style={{ color: 'black' }}>{ t('USERNAME') }</InputLabel>
              <Input name="username" value={username} onChange={this.handleChange} required />
            </FormControl>
          </div>
          <div className="login_block">
            <FormControl error={!(!errorMatchPwd)}>
              <InputLabel htmlFor="component-simple" style={{ color: 'black' }}>{ t('PASSWORD') }</InputLabel>
              <Input name="password" value={password} onChange={this.handleChange} type="password" required />
              <FormHelperText style={(!errorMatchPwd) ? { display: 'none' } : { display: 'block' }} id="component-error-text">{(errorMatchPwd) ? errorMessage : ''}</FormHelperText>
            </FormControl>
          </div>
          <div className="login_block">
            <FormControl error={!(!errorMatchPwd)}>
              <InputLabel htmlFor="component-simple" style={{ color: 'black' }}>{ t('C_PASSWORD') }</InputLabel>
              <Input name="confirmpassword" value={confirmpassword} onChange={this.handleChange} type="password" required />
              <FormHelperText style={(!errorMatchPwd) ? { display: 'none' } : { display: 'block' }} id="component-error-text">{(errorMatchPwd) ? errorMessage : ''}</FormHelperText>
            </FormControl>
          </div>
          <CustomButton type="submit" marginTop={20} text="CREATE" />
          <p>
            <Link to="/">{t('LOGIN')}</Link>
          </p>
        </form>
      </div>
    );
  }
}

CreateAccount.propTypes = {
  t: PropTypes.func.isRequired,
  fetchCreate: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
  userConnect: PropTypes.bool,
};

CreateAccount.defaultProps = {
  hasErrored: false,
  userConnect: false,
};

const mapStateToProps = (state) => {
  if (state.user.error_create) {
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
  fetchCreate: data => dispatch(createFetch(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(translate('CreateAccount')(CreateAccount));
