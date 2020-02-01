import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {userReducer} from './reducers/UserReducer'
import { initialState } from 'interfaces/initialState';

const store = createStore(
    userReducer,
    initialState
    )


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));


