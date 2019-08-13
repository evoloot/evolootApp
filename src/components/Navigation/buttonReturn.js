import React from 'react';

const buttonReturn = props => {

    const goBack = () => {
        if(props.data)
            props.history.push(props.data);
        else
            props.history.goBack();

        if(props.gameToDestroy)
            props.gameToDestroy();
    }

    return (
        <React.Fragment>
            <input onClick={goBack} type="checkbox" className="header__checkbox" id="return" />
            <label className="header__nav-button header__nav-button--return" htmlFor="return">
                <span className="header__return">&larr;</span>
            </label>
        </React.Fragment>
    );

};

export default buttonReturn;