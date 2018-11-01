import React, { Component } from 'react';
import { translate } from 'react-translate';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
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
    this.state = { open: false, errorMsg: '' };
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleJoinRoom = () => {
    const {
      id, joinRoomDispatch, idroom, socket,
    } = this.props;
    this.setState({ open: false });
    if (!idroom) {
      socket.emit('joinRoom', {
        id,
      }, (result) => {
        if (result.success) {
          joinRoomDispatch(id);
        } else this.setState({ open: true, errorMsg: 'FULL' });
      });
    } else {
      this.setState({ open: true, errorMsg: 'BUSY' });
    }
  }

  renderDialog = () => {
    const { errorMsg, open } = this.state;
    if (open) {
      return <CustomDialog errMsg={errorMsg} open={open} handleClose={this.handleClose} />;
    }
    return <CustomDialog errMsg={errorMsg} open={false} handleClose={this.handleClose} />;
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
  socket: PropTypes.instanceOf(io.Socket),
  idroom: PropTypes.string,
  joinRoomDispatch: PropTypes.func.isRequired,
  roomname: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  playerList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  socket: state.user.socket,
  idroom: state.user.idroom,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  joinRoomDispatch: idroom => dispatch(joinRoom(idroom)),
});

Room.defaultProps = {
  socket: null,
  idroom: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(translate('Room')(Room));
