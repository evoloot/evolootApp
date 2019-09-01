// CardSection.js
import React from 'react';
import { CardElement } from 'react-stripe-elements';

const cardSection = props => (
  <React.Fragment>
    <h3 className="header-primary header-primary--small" 
    style={{marginBottom: '1.5rem',
            fontSize: '3.2rem'}}>Card details</h3>
    <label>
      <CardElement
        style={{ base: { fontSize: '20px' } }}
        onChange={props.change} />
    </label>
  </React.Fragment>
);

export default cardSection;