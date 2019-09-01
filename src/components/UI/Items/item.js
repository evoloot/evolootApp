import React from 'react';

const item = props => (
    <figure className="item-list__box">
        <div className="item-list__box-image">
            <img src={props.picture} alt={props.alt} />
        </div>
        <div className="item-list__box-information">
            <h3 className="header-ellipsed">{props.name}</h3>
            <p className="paragraph">{'CAD$' + props.price.toFixed(2)}</p>
        </div>
        <div className="item-list__box-buttons">
            <button className="button button__green--small" id={props.id} onClick={props.firstButtonFunction}>{props.firstButtonName}</button>
            <button className="button button__green--small" id={props.id} onClick={props.secondButtonFunction}>{props.secondButtonName}</button>
        </div>
    </figure>
);

export default item;