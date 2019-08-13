import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Intro from './Intro/Intro';
import Login from './Login/Login';
import Forget from './Forget/Forget';

class Home extends Component {


    render() {
        return (
            <React.Fragment>
                <Switch>
                   <Route path="/evolootApp/home/login" component={Login} />
                   <Route path="/evolootApp/home/forget" component={Forget} />
                    <Route path="/evolootApp/home" component={Intro} />
                    <Redirect from="/" to="/evolootApp/home" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Home;