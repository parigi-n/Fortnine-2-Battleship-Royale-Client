import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './modules/Router/MainRoute';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

ReactDOM.render(<BrowserRouter><Provider store={store}><MainRoute /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
