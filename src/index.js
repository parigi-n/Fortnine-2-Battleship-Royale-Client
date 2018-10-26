import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import MainRoute from './modules/Router/MainRoute';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<BrowserRouter><Provider store={store}><MainRoute /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
