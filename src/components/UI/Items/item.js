import React from 'react';

const item = props => {
    const defaultButtonStyle = "button button__green--small"
    const buttonStyle = props.danger ? defaultButtonStyle+" button__green--small-red" : defaultButtonStyle;

    return (
    <figure className="item-list__box">
        <div className="item-list__box-image">
            <img src={props.picture} alt={props.alt} />
        </div>
        <div className="item-list__box-information">
            <h3 className="normal-title header-ellipsed">{props.name}</h3>
            <p className="paragraph">{'CAD$' + props.price.toFixed(2)}</p>
        </div>
        <div className="item-list__box-buttons">
            <button className={defaultButtonStyle} id={props.id} onClick={props.firstButtonFunction}>{props.firstButtonName}</button>
            <button 
            className={buttonStyle} 
            id={props.id} onClick={props.secondButtonFunction}>{props.secondButtonName}</button>
        </div>
    </figure>
    );
};

export default item;