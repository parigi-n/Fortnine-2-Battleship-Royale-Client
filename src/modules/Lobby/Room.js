import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Room extends Component {
  handleJoinRoom = () => {
    const { name } = this.props;
    console.log(`Je rejoins la room ${name}`);
  }

  render() {
    const { name, user } = this.props;
    return (
      <div className="Room">
Nom :
        {name}
        {' '}
Créée par:
        {user}
        {' '}
        <button className="button_fortnine" type="button" onClick={this.handleJoinRoom}>Join</button>
      </div>
    );
  }
}

Room.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default Room;
