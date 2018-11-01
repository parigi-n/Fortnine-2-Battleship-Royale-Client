import React, { Component } from 'react';
import { translate } from 'react-translate';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { BeatLoader } from 'react-spinners';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
import './GameRoom.css';

class GameRoom extends Component {
  redirectLobby = () => {
    const { idroom, token } = this.props;
    if (token === '') return <Redirect to="/" />;
    if (idroom === '') return <Redirect to="/lobby" />;
    return '';
  }

  handleClick = () => {
    const { leaveRoomDispatch, socket } = this.props;
    socket.emit('exitRoom', {}, (data) => {
      console.log(data);
      leaveRoomDispatch();
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="GameRoom">
        { this.redirectLobby() }
        <p className="LogDisplay" />

        <div className="btn_container">
          <div>
            <p>{t('CHOOSE')}</p>
            <CustomButton marginTop={20} text="ROCK" />
            <CustomButton marginTop={20} text="PAPER" />
            <CustomButton marginTop={20} text="SCISSORS" />
          </div>
        </div>
        <div className="Wait">
          <BeatLoader
            sizeUnit="px"
            size={15}
            color="black"
            loading
          />
        </div>
        <CustomButton marginTop={20} click={this.handleClick} text="DISCONNECTROOM" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.user.socket,
  idroom: state.user.idroom,
  username: state.user.username,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  leaveRoomDispatch: () => dispatch({ type: 'LEAVE_ROOM' }),
});

GameRoom.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
  leaveRoomDispatch: PropTypes.func.isRequired,
  idroom: PropTypes.string,
  token: PropTypes.string,
  t: PropTypes.func.isRequired,
};

GameRoom.defaultProps = {
  socket: null,
  token: '',
  idroom: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('GameRoom')(GameRoom));
