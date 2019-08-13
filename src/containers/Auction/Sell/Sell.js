import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Part01 from './Part01/Part01';
import Part02 from './Part02/Part02';
import Part03 from './Part03/Part03';
//import Part04 from './Part04/Part04';
//import Part05 from './Part05/Part05';
//import Part06 from './Part06/Part06';
import Part07 from './Part07/Part07';
import Part08 from './Part08/Part08';
import Part09 from './Part09/Part09';
import Part10 from './Part10/Part10';
import Part11 from './Part11/Part11';

class Sell extends Component {

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/evolootApp/auction/sell/part11" component={Part11} />
                    <Route path="/evolootApp/auction/sell/part10" component={Part10} />
                    <Route path="/evolootApp/auction/sell/part09" component={Part09} />
                    <Route path="/evolootApp/auction/sell/part08" component={Part08} />
                    <Route path="/evolootApp/auction/sell/part07" component={Part07} />
                   {/* <Route path="/evolootApp/auction/sell/part06" component={Part06} />
                    <Route path="/evolootApp/auction/sell/part05" component={Part05} />
                    <Route path="/evolootApp/auction/sell/part04" component={Part04} />*/}
                    <Route path="/evolootApp/auction/sell/part03" component={Part03} />
                    <Route path="/evolootApp/auction/sell/part02" component={Part02} />
                    <Route path="/evolootApp/auction/sell/" component={Part01} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Sell;