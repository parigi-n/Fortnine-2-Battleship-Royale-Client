import React from 'react';
import PropTypes from 'prop-types';
import Room from './Room';

// Pure Component pour les stateless Component
const ListRoom = (props) => {
  const { data } = props;
  return (
    <div className="ListRoom">
      {data.map(item => <Room key={item.id} name={item.name} id={item.id} user={item.user} />)}
    </div>
  );
};

ListRoom.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListRoom;
