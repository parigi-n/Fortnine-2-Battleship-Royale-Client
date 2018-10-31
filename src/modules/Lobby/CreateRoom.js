import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Header from '../Header/Header';
import './CreateRoom.css';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    const tokenCode = token.split(' ')[1];
    this.state = {
      name: '',
      open: false,
    };
    this.socket = io.connect('http://localhost:4242', {
      query: {
        token: tokenCode,
      },
    });
    this.socket.on('error', () => {
    });
    this.socket.on('connect_failed', () => {
    });
    this.socket.on('ready', () => {
      this.setState({ connected: true });
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  createRoom = (event) => {
    const { name, connected } = this.state;
    if (name === '') {
      this.setState({ open: true, errorMsg: 'EMPTY' });
      event.preventDefault();
      return;
    }
    if (connected) {
      this.socket.emit('createRoom', {
        name,
      }, () => {
        this.setState({ created: true });
      });
    } else {
      this.setState({ open: true, errorMsg: 'SERVER' });
      console.log('Connection is not ready yet');
    }
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
    const { name, errorMsg, open } = this.state;
    return (
      <div className="CreateRoom" align="center">
        <Header />
        <form onSubmit={this.createRoom}>
          {this.redirectPageLobby()}
          <div className="block_fortnine">
            <p className="block_text_fortnine">{t('NAME')}</p>
            <input name="name" className="input_fortnine" type="text" value={name} onChange={this.handleChange} />
          </div>
          <input className="button_fortnine" type="submit" value={t('CREATEROOM')} />
        </form>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t('OOPS')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t(errorMsg)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {t('OK')}
            </Button>
          </DialogActions>
        </Dialog>
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
