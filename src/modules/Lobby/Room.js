import React, { Component } from 'react';
import { translate } from 'react-translate';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { joinRoom } from '../../Actions/room';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Room extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    const tokenCode = token.split(' ')[1];
    this.state = { open: false };
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

  handleClose = () => {
    this.setState({ open: false });
  }

  handleJoinRoom = () => {
    const {
      id, joinRoomDispatch, idroom,
    } = this.props;
    const { connected } = this.state;
    if (connected) {
      if (!idroom) {
        this.socket.emit('joinRoom', {
          id,
        }, (result) => {
          if (result.success) {
            joinRoomDispatch(id);
            console.log(result);
          } else {
            this.setState({ open: true, errorMsg: 'FULL' });
            console.log('Room is already full');
          }
        });
      } else {
        this.setState({ open: true, errorMsg: 'BUSY' });
      }
    } else {
      this.setState({ open: true, errorMsg: 'SERVER' });
    }
  }

  render() {
    const {
      roomname, user, playerList, t,
    } = this.props;
    const { errorMsg, open } = this.state;
    return (
      <TableRow>
        <CustomTableCell>{roomname}</CustomTableCell>
        <CustomTableCell numeric>{user}</CustomTableCell>
        <CustomTableCell numeric>{playerList.map(it => (`${it.username} `))}</CustomTableCell>
        <CustomTableCell numeric><button className="button_fortnine" type="button" onClick={this.handleJoinRoom}>Join</button></CustomTableCell>
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
      </TableRow>
    );
  }
}

Room.propTypes = {
  idroom: PropTypes.string,
  joinRoomDispatch: PropTypes.func.isRequired,
  roomname: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  token: PropTypes.string,
  playerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  idroom: state.user.idroom,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  joinRoomDispatch: idroom => dispatch(joinRoom(idroom)),
});

Room.defaultProps = {
  token: '',
  idroom: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('Room')(Room));
