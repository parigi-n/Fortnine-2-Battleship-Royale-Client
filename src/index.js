import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRoute from './modules/Router/MainRoute'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><MainRoute /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
