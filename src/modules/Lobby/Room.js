import React, { Component } from 'react';
import { translate } from 'react-translate';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomDialog from '../CustomMaterialUIComponent/CustomDialog';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
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
    this.state = { open: false, errorMsg: '' };
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
    this.setState({ open: false });
    if (connected) {
      if (!idroom) {
        this.socket.emit('joinRoom', {
          id,
        }, (result) => {
          if (result.success) {
            joinRoomDispatch(id);
          }
          this.setState({ open: true, errorMsg: 'FULL' });
        });
      } else {
        this.setState({ open: true, errorMsg: 'BUSY' });
      }
    } else {
      this.setState({ open: true, errorMsg: 'SERVER' });
    }
  }

  renderDialog = () => {
    const { errorMsg, open } = this.state;
    if (open) {
      return <CustomDialog errMsg={errorMsg} open={open} handleClose={this.handleClose} />;
    }
    return '';
  }

  render() {
    const {
      roomname, user, playerList,
    } = this.props;
    return (
      <TableRow>
        <CustomTableCell>{roomname}</CustomTableCell>
        <CustomTableCell numeric>{user}</CustomTableCell>
        <CustomTableCell numeric>{playerList.map(it => (`${it.username} `))}</CustomTableCell>
        <CustomTableCell numeric><CustomButton text="JOIN" click={this.handleJoinRoom} /></CustomTableCell>
        {this.renderDialog()}
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
