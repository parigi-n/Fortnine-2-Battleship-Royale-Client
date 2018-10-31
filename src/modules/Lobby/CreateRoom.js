import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
import CustomDialog from '../CustomMaterialUIComponent/CustomDialog';
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

  handleClose = () => {
    this.setState({ open: false });
  }

  renderDialog = () => {
    const { errorMsg, open } = this.state;
    if (open) {
      return <CustomDialog errMsg={errorMsg} open handleClose={this.handleClose} />;
    }
    return '';
  }

  createRoom = (event) => {
    const { name, connected } = this.state;
    this.setState({ open: false });
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
    }
    event.preventDefault();
  }

  redirectPageLobby = () => {
    const { created } = this.state;
    if (created) {
      return <Redirect to="/lobby" />;
    }
    return '';
  }

  render() {
    const { t } = this.props;
    const { name } = this.state;
    return (
      <div className="CreateRoom" align="center">
        <Header />
        <form onSubmit={this.createRoom}>
          {this.redirectPageLobby()}
          <div className="block_fortnine">
            <FormControl>
              <InputLabel htmlFor="component-simple" style={{ color: 'black' }}>{ t('NAME') }</InputLabel>
              <Input name="name" value={name} onChange={this.handleChange} required />
            </FormControl>
          </div>
          <CustomButton type="submit" marginTop={20} text="CREATEROOM" />
        </form>
        {this.renderDialog()}
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
