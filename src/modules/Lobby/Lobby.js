import React, { Component } from 'react';
import { translate } from 'react-translate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';
import getRoomFetch from '../../Actions/room';
import Room from './Room';
import Header from '../Header';
import './Lobby.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { token } = this.props;
    getRoomFetch(token, (arrayRooms) => {
      this.setState({ datas: arrayRooms });
    });
  }

  render() {
    const { datas } = this.state;
    const { t } = this.props;
    if (!datas) {
      return (
        <div className="Lobby" align="center">
          <Header />
          <CircularProgress className="center" size={100} style={{ color: grey[900] }} />
        </div>
      );
    }
    if (datas.length > 0) {
      return (
        <div className="Lobby" align="center">
          <Header />
          {datas.map(it => <Room key={it.id} name={it.name} user={it.roomOwner.username} />)}
          <Link to="/createRoom"><button className="button_fortnine" type="button">{ t('ADDROOM') }</button></Link>
        </div>
      );
    }
    return (
      <div className="Lobby" align="center">
        <Header />
        <p>{ t('NOROOM') }</p>
        <Link to="/createRoom"><button className="button_fortnine" type="button" onClick={this.addNewRoom}>{ t('ADDROOM') }</button></Link>
      </div>
    );
  }
}

Lobby.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
};

Lobby.defaultProps = {
  token: '',
};

const mapStateToProps = state => ({
  username: state.user.username,
  token: state.user.token,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(translate('Lobby')(Lobby));
