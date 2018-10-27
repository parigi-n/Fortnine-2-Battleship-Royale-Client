import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFetch } from '../../Actions/login';
import { translate } from "react-translate";
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
    const { t } = this.props;
    if (email !== '' && username !== '' && password !== '' && confirmpassword !== '') {
      if (password === confirmpassword) {
        const data = new FormData();
        data.append('password', password);
        data.append('username', username);
        data.append('email', email);

        this.props.fetchCreate(data);
      } else {
        this.setState({errorMessage: t('ERROR_PM'),});
      }
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
    const {
      email, username, password, confirmpassword,
    } = this.state;
    const { t } = this.props;

    return (
      <div className="login_form">
      {this.renderRedirect()}
      <p className="error_box">{(this.props.hasErrored)? t("ERROR") : this.state.errorMessage}</p>
        <form onSubmit={this.loginAccount}>
          <div className="login_block">
            <p className="login_block_text">{t('EMAIL')}</p>
            <input name="email" className="login_input" type="text" value={email} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('USERNAME')}</p>
            <input name="username" className="login_input" type="text" value={username} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('PASSWORD')}</p>
            <input name="password" className="login_input" type="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="login_block">
            <p className="login_block_text">{t('C_PASSWORD')}</p>
            <input name="confirmpassword" className="login_input" type="password" value={confirmpassword} onChange={this.handleChange} />
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
        fetchCreate: (data) => dispatch(createFetch(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(translate("CreateAccount")(CreateAccount));
