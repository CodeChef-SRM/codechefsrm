import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlertState from './context/AlertContext/AlertState';

ReactDOM.render(
    <AlertState>
        <App />
    </AlertState>
    , document.getElementById('root'));