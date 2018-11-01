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
import { joinRoom } from '../../Actions/room';
import './CreateRoom.css';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      open: false,
    };
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

  redirection = () => {
    const { idroom, token } = this.props;
    if (token === '') return <Redirect to="/" />;
    if (idroom !== '') return <Redirect to="/gameRoom" />;
    return '';
  }

  renderDialog = () => {
    const { errorMsg, open } = this.state;
    if (open) {
      return <CustomDialog errMsg={errorMsg} open handleClose={this.handleClose} />;
    }
    return '';
  }

  createRoom = (event) => {
    const { joinRoomDispatch, socket } = this.props;
    const { name } = this.state;
    this.setState({ open: false });
    if (name === '') {
      this.setState({ open: true, errorMsg: 'EMPTY' });
      event.preventDefault();
      return;
    }
    socket.emit('createRoom', {
      name,
    }, (data) => {
      const { id } = data.room;
      if (data.success) {
        joinRoomDispatch(id);
        this.setState({ created: true });
      }
    });
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
        {this.redirection()}
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
  socket: state.user.socket,
  idroom: state.user.idroom,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  joinRoomDispatch: idroom => dispatch(joinRoom(idroom)),
});

CreateRoom.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
  idroom: PropTypes.string,
  token: PropTypes.string,
  joinRoomDispatch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

CreateRoom.defaultProps = {
  socket: null,
  idroom: '',
  token: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('CreateRoom')(CreateRoom));
