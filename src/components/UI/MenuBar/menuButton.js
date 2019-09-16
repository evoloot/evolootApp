import React from 'react';

const menuButton = props => (
    <button className="button button__menu" onClick={props.click} id={props.id}>{props.children}</button>
);

export default menuButton;