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
      victory: '',
      winner: '',
      myScore: 0,
      opponentScore: 0,
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    if (socket) {
      socket.on('roundStart', data => (this.handleStart(data)));
      socket.on('roundEnd', data => (this.handleEndRound(data)));
      socket.on('gameEnd', data => (this.handleEndGame(data)));
    }
  }

  redirectLobby = () => {
    const { idroom, token } = this.props;
    if (token === '') return <Redirect to="/" />;
    if (idroom === '') return <Redirect to="/lobby" />;
    return '';
  }

  handleClick = () => {
    const { leaveRoomDispatch, socket } = this.props;
    socket.emit('exitRoom', {}, () => {
      leaveRoomDispatch();
    });
  }

  playSignClick = (sign) => {
    const { socket } = this.props;
    socket.emit('playSign', {
      sign,
    },
    () => (this.handlePlay(2)));
  }

  handleStart = (data) => {
    this.setState({
      duration: (data.duration - 2),
      phase: 1,
      victory: '',
      winner: '',
      myScore: 0,
      opponentScore: 0,
    });
  }

  handlePlay = (newPhase) => {
    const { phase } = this.state;
    if (newPhase > phase) {
      this.setState({ phase: newPhase });
    }
  }

  handleEndRound = (data) => {
    const { id } = this.props;
    const { myScore, opponentScore } = this.state;

    let newScore;
    if (!data.winner) {
      this.setState({ phase: 3, victory: 'tie' });
    } else if (data.winner.userId === id) {
      newScore = myScore + 1;
      this.setState({ myScore: newScore, phase: 3, victory: 'true' });
    } else {
      newScore = opponentScore + 1;
      this.setState({ opponentScore: newScore, phase: 3, victory: 'false' });
    }
  }

  handleEndGame = (data) => {
    const { id } = this.props;

    if (!data.winner) {
      this.setState({ phase: 4, winner: 'tie' });
    } else if (data.winner.userId === id) {
      this.setState({ phase: 4, winner: 'true' });
    } else {
      this.setState({ phase: 4, winner: 'false' });
    }
  }

  render() {
    const { t } = this.props;
    const {
      phase, duration, victory, myScore, opponentScore, winner,
    } = this.state;
    return (
      <div className="GameRoom">
        { this.redirectLobby() }
        <p className="LogDisplay">
          {(phase === 0) ? <span className="border">{t('WAITING')}</span> : '' }
          {(phase === 1) ? (
            <span className="border">
              {t('CHOOSE')}
              <Countdown date={Date.now() + (duration * 1000)} />
            </span>
          ) : '' }
          {(phase === 2) ? <span className="border">{t('WAITOPPONENT')}</span> : '' }
        </p>

        {(phase === 1)
          ? (
            <div className="btn_container">
              <div>
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
        <div>
          {(phase === 4)
            ? (
              <p>
                {(winner === 'true') ? t('VICTORY') : '' }
                {(winner === 'false') ? t('DEFEAT') : '' }
                {(winner === 'tie') ? t('DRAW') : '' }
              </p>
            )
            : (
              <p>
                {(victory === 'true') ? t('WON') : '' }
                {(victory === 'false') ? t('LOST') : '' }
                {(victory === 'tie') ? t('TIE') : '' }
              </p>
            )
        }
          {(victory !== '')
            ? (
              <p>
                {(phase === 4) ? t('FINALSCORE') : t('SCORE')}
                {' '}
                {myScore}
                {' '}
                {opponentScore}
              </p>
            )
            : ''
            }
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
  id: state.user.id,
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
  id: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

GameRoom.defaultProps = {
  socket: null,
  token: '',
  idroom: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('GameRoom')(GameRoom));
