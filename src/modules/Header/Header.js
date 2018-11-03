import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import io from 'socket.io-client';
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

  disconnect = () => {
    const {
      socket, leaveRoomDispatch, idroom, token, fetchDisconnect,
    } = this.props;
    if (idroom !== '') {
      socket.emit('exitRoom', {}, () => {
        leaveRoomDispatch();
      });
    }
    fetchDisconnect(token);
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
      t, username, token,
    } = this.props;
    return (
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: 'black' }}>
          {this.renderRedirect()}
          <h1 className="App-title">{t('TITLE')}</h1>
          <div className="user-card">
            {
          (username === '' || (username !== '' && token === ''))
            ? <Link to="/createAccount">{t('CREATE')}</Link>
            : <span onKeyPress={this.handleKeyPress} role="button" tabIndex={0} className="link_text" onClick={this.disconnect}>{`${username} ${t('DISCONNECT')}`}</span>
        }
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  idroom: state.user.idroom,
  socket: state.user.socket,
  username: ((state.user.username) ? state.user.username : ''),
  token: state.user.token,
  disconnect: state.user.disconnect,
});

const mapDispatchToProps = dispatch => ({
  leaveRoomDispatch: () => dispatch({ type: 'LEAVE_ROOM' }),
  fetchDisconnect: token => dispatch(disconnectFetch(token)),
});

Header.propTypes = {
  idroom: PropTypes.string,
  fetchDisconnect: PropTypes.func.isRequired,
  socket: PropTypes.instanceOf(io.Socket),
  username: PropTypes.string.isRequired,
  disconnect: PropTypes.bool,
  token: PropTypes.string,
  t: PropTypes.func.isRequired,
  leaveRoomDispatch: PropTypes.func.isRequired,
};

Header.defaultProps = {
  socket: null,
  disconnect: false,
  token: '',
  idroom: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('Header')(Header));
