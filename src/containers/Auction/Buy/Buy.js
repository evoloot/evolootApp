import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Part01 from './Part01/Part01';
import Part02 from './Part02/Part02';
import Part03 from './Part03/Part03';
import Part04 from './Part04/Part04';

class Buy extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/evolootApp/auction/buy/part04" component={Part04} />
                    <Route path="/evolootApp/auction/buy/part03" component={Part03} />
                    <Route path="/evolootApp/auction/buy/part02" component={Part02} />
                    <Route path="/evolootApp/auction/buy/" component={Part01} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Buy;