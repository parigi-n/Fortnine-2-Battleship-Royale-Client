import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './modules/Router/MainRoute';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><MainRoute /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
