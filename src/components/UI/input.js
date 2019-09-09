import React from 'react';

import sprite from '../../assets/icons/sprite.svg';

const input = props => {
    let inputElement = null;
    let validationError = null;
    let validInput = '';

    if (props.touched)
        validInput = 'form__input-field--valid';

    if (props.invalid && props.shouldValidate && props.touched) {
        validInput = 'form__input-field--invalid';
        validationError = <p className="form__error-message">Please enter a valid value!</p>
    }

    switch (props.elementType) {
        case ('input'): //HERE password and checkbox
            if (props.elementConfig.type === 'password')
                inputElement = (
                    <React.Fragment>
                        <input
                            className={`form__input-field ${validInput}`}
                            {...props.elementConfig}
                            defaultValue={props.value} onChange={props.changed} required={props.required} />
                        <svg className="form__input-icon" id={props.elementConfig.id} onClick={props.alternate}>
                            {props.show ? <use xlinkHref={`${sprite}#icon-eye-blocked`}></use> : <use xlinkHref={`${sprite}#icon-eye`}></use>}
                        </svg>
                    </React.Fragment>
                );
            else
                inputElement = <input
                    className={`form__input-field ${validInput}`}
                    {...props.elementConfig}
                    defaultValue={props.value} onChange={props.changed} required={props.required} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className=""
                {...props.elementConfig}
                defaultValue={props.value} onChange={props.changed} />
            break;
        case ('select'):
            const selectOptions = props.elementConfig.options.map(option => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            });

            inputElement = <select className="" onChange={props.changed}>
                {selectOptions}
            </select>
            break;
        default:
            inputElement = <input
                className={`form__input-field ${validInput}`}
                {...props.elementConfig}
                defaultValue={props.value} onChange={props.changed} />
    }



    return (
        <div className="form__input-box">
            <label className="form__label" htmlFor={props.elementConfig.id}>
                {props.elementConfig.id}
            </label>
            <div className="form__input-field-box">
                {inputElement}
                {validationError}
            </div>
        </div>
    );
}

export default input;

/**
 * import React from 'react';
import { Link } from 'react-router-dom';

import sprite from '../../assets/icons/sprite.svg';
import './toolbar.css';

const toolbar = props => {

    const navLinksListItems = props.toolbarLinks.map(toolbarLink => {
        return (
            <li key={toolbarLink.name} className="navigation__list-item">
                <Link to={toolbarLink.route} className="navigation__link">
                    <svg className="nav-icon">
                        <use xlinkHref={`${sprite}#${toolbarLink.icon}`}></use>
                    </svg> {toolbarLink.name}
                </Link>
            </li>
        );
    });

    return (
        <React.Fragment>
            <h1 className="app-title">
                <figure className="logo-container">
                    <Link to={props.logo.route}>
                        <svg className="logo-icon">
                            <use xlinkHref={`${sprite}#${props.logo.icon}`}></use>
                        </svg>
                        {props.logo.name}
                </Link>
                </figure>
            </h1>
            <nav className="navigation">
                <ol className="navigation__list">
                    {navLinksListItems}
                </ol>
            </nav>
        </React.Fragment>
    );
};

export default toolbar;
 */