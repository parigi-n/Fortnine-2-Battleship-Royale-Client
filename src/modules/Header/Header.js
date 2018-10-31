import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { disconnectFetch } from '../../Actions/login';
import './Header.css';

class Header extends Component {
  renderRedirect = () => {
    const { disconnect } = this.props;
    if (disconnect === true) {
      return <Redirect to="/" />;
    }
    return '';
  }

  handleKeyPress = (event) => {
    const {
      token, fetchDisconnect,
    } = this.props;
    if (event.key === 'Enter') {
      fetchDisconnect(token);
    }
  }

  render() {
    const {
      t, username, token, fetchDisconnect,
    } = this.props;
    return (
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: 'black' }}>
          {this.renderRedirect()}
          <h1 className="App-title">{t('TITLE')}</h1>
          <div className="user-card">
            {
          (username === '')
            ? <Link to="/createAccount">{t('CREATE')}</Link>
            // Problème ici pour eslint
            : <span onKeyPress={this.handleKeyPress} role="button" tabIndex={0} className="link_text" onClick={() => fetchDisconnect(token)}>{`${username} ${t('DISCONNECT')}`}</span>
        }
          </div>
        </Toolbar>
      </AppBar>
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

Header.propTypes = {
  username: PropTypes.string.isRequired,
  disconnect: PropTypes.bool,
  token: PropTypes.string,
  t: PropTypes.func.isRequired,
  fetchDisconnect: PropTypes.func.isRequired,
};

Header.defaultProps = {
  disconnect: false,
  token: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('Header')(Header));
