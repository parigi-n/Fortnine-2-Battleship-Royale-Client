import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
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
      return <Redirect to="/lobby" />;
    }
    // Il faut retourner quelque chose ici
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
            <p className="login_block_text">{t('EMAIL')}</p>
            <input name="email" className="login_input" type="text" value={email} onChange={this.handleChange} required />
            <p style={(!hasErrored) ? { display: 'none' } : { display: 'block' }} className="error_box">{(hasErrored) ? t('ERROR') : ''}</p>
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('USERNAME')}</p>
            <input name="username" className="login_input" type="text" value={username} onChange={this.handleChange} required />
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('PASSWORD')}</p>
            <input name="password" className="login_input" type="password" value={password} onChange={this.handleChange} required />
            <p style={(!errorMatchPwd) ? { display: 'none' } : { display: 'block' }} className="error_box">{(errorMatchPwd) ? errorMessage : ''}</p>
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('C_PASSWORD')}</p>
            <input name="confirmpassword" className="login_input" type="password" value={confirmpassword} onChange={this.handleChange} required />
            <p style={(!errorMatchPwd) ? { display: 'none' } : { display: 'block' }} className="error_box">{(errorMatchPwd) ? errorMessage : ''}</p>
          </div>
          <input className="login_button" type="submit" value="Create" />
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
  fetchCreate: data => dispatch(createFetch(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(translate('CreateAccount')(CreateAccount));
