import React, { Component } from 'react';
import { translate } from 'react-translate';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import grey from '@material-ui/core/colors/grey';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
import getRoomFetch from '../../Actions/room';
import addSocket from '../../Actions/socket';
import Room from './Room';
import './Lobby.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { token, addSocketDispatch, socket } = this.props;
    if (token !== '') {
      const tokenCode = token.split(' ')[1];
      if (!socket) {
        const socketTmp = io.connect('http://188.166.50.184:4242', {
          query: {
            token: tokenCode,
          },
        });
        socketTmp.on('error', () => {
        });
        socketTmp.on('connect_failed', () => {
        });
        socketTmp.on('ready', () => {
          addSocketDispatch(socketTmp);
        });
      }
    }
  }

  componentDidMount() {
    const { token } = this.props;
    if (token !== '') {
      getRoomFetch(token, (arrayRooms) => {
        this.setState({ datas: arrayRooms });
      });
    }
  }

  redirection = () => {
    const { idroom, token } = this.props;
    if (token === '') return <Redirect to="/" />;
    if (idroom !== '') return <Redirect to="/gameRoom" />;
    return '';
  }

  render() {
    const { datas } = this.state;
    const { t } = this.props;
    if (!datas) {
      return (
        <div className="Lobby" align="center">
          { this.redirection() }
          <CircularProgress className="center" size={100} style={{ color: grey[900] }} />
        </div>
      );
    }
    return (
      <div className="Lobby" align="center">
        { this.redirection() }
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>{t('TABNAMEROOM')}</CustomTableCell>
                <CustomTableCell numeric>{t('TABOWNER')}</CustomTableCell>
                <CustomTableCell numeric>{t('TABCURCONNECT')}</CustomTableCell>
                <CustomTableCell numeric>{t('TABOPTIONS')}</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map(it => (
                <Room
                  key={it.id}
                  id={it.id}
                  roomname={it.name}
                  user={it.roomOwner.username}
                  playerList={it.playerList}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Link style={{ textDecoration: 'none' }} to="/createRoom"><CustomButton marginTop={20} text="ADDROOM" /></Link>
        <div>
          <IconButton aria-label="Delete" onClick={() => { window.location.reload(); }}>
            <SvgIcon>
              <path d="M9 13.5c-2.49 0-4.5-2.01-4.5-4.5S6.51 4.5 9 4.5c1.24 0 2.36.52 3.17 1.33L10 8h5V3l-1.76 1.76C12.15 3.68 10.66 3 9 3 5.69 3 3.01 5.69 3.01 9S5.69 15 9 15c2.97 0 5.43-2.16 5.9-5h-1.52c-.46 2-2.24 3.5-4.38 3.5z" />
            </SvgIcon>
          </IconButton>
        </div>
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
  addSocketDispatch: socket => dispatch(addSocket(socket)),
});

Lobby.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
  idroom: PropTypes.string,
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
  addSocketDispatch: PropTypes.func.isRequired,
};

Lobby.defaultProps = {
  socket: null,
  idroom: '',
  token: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(translate('Lobby')(Lobby));
