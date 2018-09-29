import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRoute from './modules/Router/MainRoute';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(React.createElement(
  BrowserRouter,
  null,
  React.createElement(MainRoute, null)
), document.getElementById('root'));
registerServiceWorker();