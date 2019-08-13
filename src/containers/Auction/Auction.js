import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Entrance from './Entrance/Entrance';
import Sell from './Sell/Sell';
import Buy from './Buy/Buy';

class Auction extends Component {

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/evolootApp/auction/buy" component={Buy} />
                    <Route path="/evolootApp/auction/sell" component={Sell} />
                    <Route path="/evolootApp/auction/" component={Entrance} />
                    <Redirect from="/" to="/evolootApp/home" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Auction;