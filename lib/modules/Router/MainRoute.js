import React from 'react';
import LoginPage from '../LoginPage/LoginPage';
import Lobby from '../Lobby/Lobby.js';
import { Switch, Route } from 'react-router-dom';

const MainRoute = () => React.createElement(
  'main',
  null,
  React.createElement(
    Switch,
    null,
    React.createElement(Route, { exact: true, path: '/lobby', component: Lobby }),
    React.createElement(Route, { path: '/', component: LoginPage })
  )
);

export default MainRoute;