import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { disconnectFetch } from '../Actions/login';
import './LoginPage/LoginPage.css';

class Header extends Component {
  renderRedirect = () => {
    if (this.props.disconnect === true) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="App-header">
        {this.renderRedirect()}
        <h1 className="App-title">{t('TITLE')}</h1>
        <div className="user-card">
          {
          (this.props.username === '')
            ? <Link to="/createAccount">{t('CREATE')}</Link>
            : <span onClick={() => this.props.fetchDisconnect(this.props.token)}>{`${this.props.username} ${t('DISCONNECT')}`}</span>
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: ((state.user.username) ? state.user.username : ''),
  token: state.user.token,
  disconnect: state.user.disconnect,
});

const mapDispatchToProps = dispatch => ({
  fetchDisconnect: token => dispatch(disconnectFetch(token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(translate('Header')(Header));
