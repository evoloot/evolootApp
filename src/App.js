import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './containers/Home/Home'
import Customization from './containers/Customization/Customization';
import Map from './containers/Map/Map';
import Auction from './containers/Auction/Auction';
import Profile from './containers/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/evolootApp/home" component={Home} />
          <Route path="/evolootApp/customization" component={Customization} />
          <Route path="/evolootApp/profile" component={Profile} />
          <Route path="/evolootApp/map" component={Map} />
          <Route path="/evolootApp/auction" component={Auction} />
          <Redirect from="/" to="/evolootApp/home" />
        </Switch>
      </div>
    );
  }

}

export default App;
