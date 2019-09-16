import React from 'react';

const horizontalButton = props => (
    <button className="button button__icon button__green--small" id={props.id}
        onClick={props.click}>
        <img className="button__icon-icon--small" src={props.src} alt={props.alt} />
    </button>
);

export default horizontalButton;