import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginFetch } from '../../Actions/login';
import { translate } from "react-translate";
import './LoginPage.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
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
    const { t } = this.props;

    if (username !== '' && password !== '') {
      const data = new FormData();
      data.append('password', password);
      data.append('username', username);

      this.props.fetchLogin(data);
    } else {
      this.setState({errorMessage: t('ERROR_FIELD'),});
    }
    event.preventDefault();
  }

  renderRedirect = () => {
    if (this.props.userConnect === true) {
      return <Redirect to='/lobby' />
    }
  }

  render() {
    const { username, password, errorMessage } = this.state;
    const { t } = this.props;

    return (
      <div className="login_form">
      {this.renderRedirect()}
      <p className="error_box">{(this.props.hasErrored)? t("ERROR") : errorMessage}</p>
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <p className="login_block_text">{ t("USERNAME") }</p>
            <input name="username" className="login_input" type="text" value={username} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">{t("PASSWORD")}</p>
            <input name="password" className="login_input" type="password" value={password} onChange={this.handleChange} />
          </div>
          <input className="login_button" type="submit" value="Login" />
          <p>
            <Link to="/createAccount">{t("CREATE")}</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.user.error){
    return {
      hasErrored: true,
      userConnect: false,
    };
  } else if ( state.user.id ){
    return {
      hasErrored: false,
      userConnect: true,
    };
  } else {
    return {
      hasErrored: false,
      userConnect: false,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogin: (data) => dispatch(loginFetch(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate("LoginForm")(LoginForm));
