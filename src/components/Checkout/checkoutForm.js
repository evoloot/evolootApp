// CheckoutForm.js
import React from 'react';
import { injectStripe } from 'react-stripe-elements';

import CardSection from './elements/CardSection';

const checkoutForm = props => {

  const handleSubmit = async(event) => {
    event.preventDefault();

    const customer = {
      name: `${props.customerInfo.get('firstName')} ${props.customerInfo.get('lastName')}`,
      address_city: '',
      address_country: '',
      address_state: '',
      address_line1: '',
      address_line2: ''
    }

    if (props.stripe) {
      try {
        const payload = await props.stripe.createToken(customer);

        console.log('[token]', payload);
        props.back();
      } catch(err) {
        console.log(err);
      }
    } else {
      console.log("Stripe.js hasn't loaded yet.");
      props.back();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <figure className="checkout-form__figure">
        <h2 className="header-ellipsed checkout-form__title">{props.currentItem.name}</h2>
        <img className="checkout-form__img" src={props.currentItem.pictures[0].url()} alt={props.currentItem.name}/>
      </figure>
      <CardSection
        change={props.change}
      />
      <button className="button button__green--small" disabled={!props.canPay}>Pay CAD${props.currentItem.price.toFixed(2)}</button>
    </form>
  );
}

export default injectStripe(checkoutForm);