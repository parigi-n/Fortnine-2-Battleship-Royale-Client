import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TranslatorProvider } from 'react-translate';
import thunk from 'redux-thunk';
import en from './translate/en';
import MainRoute from './modules/Router/MainRoute';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<BrowserRouter><Provider store={store}><TranslatorProvider translations={en}><MainRoute /></TranslatorProvider></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
