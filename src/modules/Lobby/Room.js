import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Room extends Component {
  constructor(props) {
    super(props);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
  }

  handleJoinRoom() {
    const { name } = this.props;
    console.log(`Je rejoins la room ${name}`);
  }

  render() {
    const { name, user, id } = this.props;
    return (
      <div className="Room">
Nom :
        {name}
        {' '}
Créée par:
        {user}
        {' '}
Id user:
        {id}
        <button className="join_button" type="button" onClick={this.handleJoinRoom}>Join</button>
      </div>
    );
  }
}

Room.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Room;
