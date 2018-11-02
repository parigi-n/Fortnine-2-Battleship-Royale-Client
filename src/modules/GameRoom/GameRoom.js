import React, { Component } from 'react';
import { translate } from 'react-translate';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Countdown from 'react-countdown-now';
import { BeatLoader } from 'react-spinners';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
import './GameRoom.css';

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      duration: 0,
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('roundStart', (data) => (this.handleSocket(data, 1)));
    socket.on('roundEnd', (data) => {
      console.log(data);
    });
    socket.on('gameEnd', (data) => {
      console.log(data);
    });
  }

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

  playSignClick = (sign) => {
    const { socket } = this.props;
    socket.emit('playSign', {
      sign: sign,
    });
  }

  handleSocket = (data, phase) => {
    this.setState({ duration: (data.duration - 2), phase });
  }

  render() {
    const { t } = this.props;
    const { phase, duration } = this.state;
    return (
      <div className="GameRoom">
        { this.redirectLobby() }
        <p className="LogDisplay">
          {(phase === 0) ? <span>{t('WAITING')}</span> : '' }
          {(phase === 1) ? <span>{t('WAITOPPONENT')}</span> : '' }
        </p>

        {(phase === 1)
          ? (
            <div className="btn_container">
              <div>
                <p>
                  {t('CHOOSE')}
                  {' '}
                  <Countdown date={Date.now() + (duration * 1000)} />
                </p>
                <CustomButton marginTop={20} text="ROCK" click={() => { this.playSignClick('rock'); }} />
                <CustomButton marginTop={20} text="PAPER" click={() => { this.playSignClick('paper'); }} />
                <CustomButton marginTop={20} text="SCISSORS" click={() => { this.playSignClick('scissors'); }} />
              </div>
            </div>
          )
          : ''}
        {(phase === 0)
          ? (
            <div className="Wait">
              <BeatLoader
                sizeUnit="px"
                size={15}
                color="black"
                loading
              />
            </div>
          )
          : ''}
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
