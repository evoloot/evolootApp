/* eslint-disable */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Register from './Register/Register';
import CharacterCustomization from './CharacterCustomization/CharacterCustomization';

class Customization extends Component { // this should get out from home fucking folder

  render() {
    return (
      <React.Fragment>
        {/*<CustomizationStep01/>*/}

        <Switch>
          <Route path="/evolootApp/customization/register" component={Register} />
          <Route path="/evolootApp/customization/" component={CharacterCustomization} />
          <Redirect from="/" to="/evolootApp/home" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Customization;