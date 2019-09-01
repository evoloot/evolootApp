import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import { parseInitializer } from './parse/index';
import './sass/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

parseInitializer();

const app = (
    <StripeProvider apiKey='pk_test_2j7wM82Y93kG7lbYsgKhCSii003ePsEooo'>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StripeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();