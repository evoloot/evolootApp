import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Parse from 'parse';
import environment from './environment';
import './sass/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

Parse.serverURL = environment.serverURL;
Parse.liveQueryServerURL = environment.liveQueryServerURL;
Parse.initialize(
    environment.applicationID,
    environment.javaScriptKey
);

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();