import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
  handleJoinRoom = () => {
    const { name } = this.props;
    console.log(`Je rejoins la room ${name}`);
  }

  render() {
    const { name, user } = this.props;
    return (
      <TableRow>
        <CustomTableCell>{name}</CustomTableCell>
        <CustomTableCell numeric>{user}</CustomTableCell>
        <CustomTableCell numeric>{user}</CustomTableCell>
        <CustomTableCell numeric><button className="button_fortnine" type="button" onClick={this.handleJoinRoom}>Join</button></CustomTableCell>
      </TableRow>
    );
  }
}

Room.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default Room;
