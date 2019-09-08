import React from 'react';

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