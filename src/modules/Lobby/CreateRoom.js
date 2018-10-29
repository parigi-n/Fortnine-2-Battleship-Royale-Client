import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Header from '../Header';
import './CreateRoom.css';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  createRoom = (event) => {
    const { name } = this.state;
    const { token } = this.props;
    const tokenCode = token.split(' ')[1];
    if (name === '') {
      this.setState({ error: true });
      event.preventDefault();
      return;
    }
    const socket = io.connect('http://localhost:4242', {
      query: {
        token: tokenCode,
      },
    });
    socket.on('error', () => {
    });
    socket.on('connect_failed', () => {
    });
    socket.on('ready', () => {
      socket.emit('createRoom', {
        name,
      }, () => {
        this.setState({ created: true });
      });
    });
    event.preventDefault();
  }

  redirectPageLobby = () => {
    const { created } = this.state;
    if (created) {
      return <Redirect to="/lobby" />;
    }
  }

  render() {
    const { t } = this.props;
    const { name, error } = this.state;
    return (
      <div className="CreateRoom" align="center">
        <Header />
        <form onSubmit={this.createRoom}>
          {this.redirectPageLobby()}
          <p className="error_box">{(error) ? t('ERROR') : ''}</p>
          <div className="block_fortnine">
            <p className="block_text_fortnine">{t('NAME')}</p>
            <input name="name" className="input_fortnine" type="text" value={name} onChange={this.handleChange} />
          </div>
          <input className="button_fortnine" type="submit" value={t('CREATEROOM')} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token,
});

const mapDispatchToProps = () => ({});

CreateRoom.propTypes = {
  token: PropTypes.string,
  t: PropTypes.func.isRequired,
};

CreateRoom.defaultProps = {
  token: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('CreateRoom')(CreateRoom));
