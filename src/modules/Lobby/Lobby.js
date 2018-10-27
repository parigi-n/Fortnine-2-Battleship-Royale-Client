import React from 'react';
import ListRoom from './ListRoom';
import Header from '../Header';
import './Lobby.css';

const Lobby = (props) => {
  const datas = [
    {
      id: 1,
      name: 'bitedemerde',
      user: 'Yalap',
    },
    {
      id: 2,
      name: 'blackhammer',
      user: 'Vico',
    },
  ];
  return (
    <div className="Lobby" align="center">
      <Header />
      <ListRoom data={datas} vico="BG" />
    </div>
  );
};

export default Lobby;
