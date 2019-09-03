import React, { Component } from 'react';

import * as user from '../../../parse/user';
import * as db from '../../../parse/DB';
import * as userCharacter from '../../../parse/userCharacter';
import { DailyManager } from "../../../xpengine/dailies";
import { MilestoneManager } from "../../../xpengine/milestones";

import ButtonReturn from '../../../components/Navigation/buttonReturn';
import Input from '../../../components/UI/input';
import Popup from '../../../components/UI/popup';
//import buttonImage from '../../../assets/images/continue.png';

class Register extends Component {

    state = {
        registerStep: 0,
        registerForm: null,
        formIsValid: false,
        formPart01IsValid: false,
        formPart02IsValid: false,
        formPart03IsValid: false,
        popup: null
    }

    componentDidMount() {
        const registerForm = {
            username: this.createFormElement('input', { type: 'text', placeholder: 'Your Username', id: 'Username' }, { required: true }),
            firstName: this.createFormElement('input', { type: 'text', placeholder: 'Your First Name', id: 'First Name' }, { required: true }),
            lastName: this.createFormElement('input', { type: 'text', placeholder: 'Your Last Name', id: 'Last Name' }, { required: true }),
            birthday: this.createFormElement('input', { type: 'date', placeholder: 'mm/dd/yyyy', id: 'Birth Date' }, { required: true }),

            email: this.createFormElement('input', { type: 'email', placeholder: 'Your Email', id: 'Email' }, { required: true, emailFormat: true }),
            confirmEmail: this.createFormElement('input', { type: 'email', placeholder: 'myemail@something.com', id: 'Confirm Email' }, { required: true, emailFormat: true, confirm: 'Email' }),
            password: this.createFormElement('input', { type: 'password', placeholder: 'Your Password', id: 'Password' }, { required: true }),
            confirmPassword: this.createFormElement('input', { type: 'password', placeholder: 'banana9', id: 'Confirm Password' }, { required: true, confirm: 'Password' }),

            postalCode: this.createFormElement('input', { type: 'text', placeholder: 'Your Postal Code', id: 'Postal Code' }, { required: true }),
            country: this.createFormElement('input', { type: 'text', placeholder: 'Your Country', id: 'Country' }, { required: true }),
            province: this.createFormElement('input', { type: 'text', placeholder: 'Your Province', id: 'Province' }, { required: true }),
            city: this.createFormElement('input', { type: 'text', placeholder: 'Your City', id: 'City' }, { required: true }),
            addressStreet: this.createFormElement('input', { type: 'text', placeholder: 'Your Street', id: 'Street' }, { required: true }),
            addressNumber: this.createFormElement('input', { type: 'number', placeholder: '123', id: 'Nº' }, { required: true }),
        }

        this.setState({
            registerForm: registerForm
        })
    }

    /**
     * @param {string} elementType e.g.: "input"
     * @param {Object} elementConfig e.g.: In case of text inputs: {type:"text", placeholder:"Your Name"}
     * @param {Object} validationParams e.g.: {required: true, minSize: 5, ...}
     * @param {string} value e.g.: "Alfred"
     */
    createFormElement = (elementType, elementConfigParams, validationParams = {}, value = '') => {
        switch (elementType) {
            case ('input'):
                return {
                    elementType: elementType,
                    elementConfig: {
                        type: elementConfigParams.type,
                        placeholder: elementConfigParams.placeholder,
                        id: elementConfigParams.id
                    },
                    value: value,
                    validation: validationParams,
                    valid: false,
                    touched: false
                }
            case ('select'):
                return {
                    elementType: 'select',
                    elementConfig: {
                        /*
                        options: [
                            { value: 'none', displayValue: '-- Select --' },
                        ]
                        */
                    },
                    value: 'none',
                    validation: {},
                    valid: false
                }
            default:
                return -1
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true; // starts as valid

        // depends on which rules we have
        if (rules.required)
            isValid = value.trim() !== '' && isValid; // basically checking if field value is empty or filled with white spaces

        // another example
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;

        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;

        if (rules.emailFormat)
            isValid = /\w+@\w+\.\w{2,}/ig.test(value) && isValid;

        if (rules.confirm) ////HERE
            isValid = (value === document.getElementById(rules.confirm).value) && isValid;

        // passing 'isValid' to all the verifications will make sure that if
        // it gets reproved in one of them, it won't pass in any other.
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // Here order form is cloned superficially
        const updatedRegisterForm = { ...this.state.registerForm };
        // And down here its objects are deeply cloned, for safely changing 'value'
        const updatedFormElement = { ...updatedRegisterForm[inputIdentifier] };

        updatedFormElement.value = event.target.value; // so the value is updated here
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.touched = true;

        updatedRegisterForm[inputIdentifier] = updatedFormElement; // and then updated to the cloned form


        const updatedRegisterFormKeys = Object.keys(updatedRegisterForm);

        let formIsValid = true;
        let formPart01IsValid = true;
        let formPart02IsValid = true;
        let formPart03IsValid = true;

        for (let inputIdentifier in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid; // :D, remember if one is false, everything is!
        }

        updatedRegisterFormKeys.slice(0, 4).forEach(inputIdentifier => {
            formPart01IsValid = updatedRegisterForm[inputIdentifier].valid && formPart01IsValid; // :D, remember if one is false, everything is!
        });
        updatedRegisterFormKeys.slice(4, 8).forEach(inputIdentifier => {
            formPart02IsValid = updatedRegisterForm[inputIdentifier].valid && formPart02IsValid; // :D, remember if one is false, everything is!
        });
        updatedRegisterFormKeys.slice(8).forEach(inputIdentifier => {
            formPart03IsValid = updatedRegisterForm[inputIdentifier].valid && formPart03IsValid; // :D, remember if one is false, everything is!
        });

        this.setState({
            registerForm: updatedRegisterForm,
            formIsValid: formIsValid,
            formPart01IsValid: formPart01IsValid,
            formPart02IsValid: formPart02IsValid,
            formPart03IsValid: formPart03IsValid
        });
    }

    renderInputs = () => {
        const accumulator = [];

        for (let input in this.state.registerForm) {
            accumulator.push(
                <Input
                    key={input}
                    label={this.state.registerForm[input].elementType}
                    elementType={this.state.registerForm[input].elementType}
                    elementConfig={this.state.registerForm[input].elementConfig}
                    value={this.state.registerForm[input].value}
                    invalid={!this.state.registerForm[input].valid}
                    shouldValidate={this.state.registerForm[input].validation}
                    touched={this.state.registerForm[input].touched}
                    changed={event => this.inputChangedHandler(event, input)}
                    required />
            );
        }

        return accumulator;
    }

    continueRegister = () => {
        this.setState(prevState => {
            return {
                registerStep: ++prevState.registerStep
            }
        });
    }

    backRegister = () => {
        this.setState(prevState => {
            return {
                registerStep: --prevState.registerStep
            }
        });
    }

    closePopup = () => {
        this.setState({
            popup: null
        });
    }

    registerHandler = event => {
        event.preventDefault();

        this.setState({ loading: true });

        const registerForm = {};

        for (let formElementIdentifier in this.state.registerForm) {
            registerForm[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }

        if ((registerForm.email !== registerForm.confirmEmail) && (registerForm.password !== registerForm.confirmPassword))
            this.setState({
                popup: <Popup type="message" click={this.closePopup}>
                    <p className="paragraph" style={{ marginBottom: '2rem', fontSize: '3rem' }}>Something is wrong with your email and password!</p>
                </Popup>
            });
        else if (registerForm.email !== registerForm.confirmEmail)
            this.setState({
                popup: <Popup type="message" click={this.closePopup}>
                    <p className="paragraph" style={{ marginBottom: '2rem', fontSize: '3rem' }}>Something is wrong with your email!</p>
                </Popup>
            });
        else if (registerForm.password !== registerForm.confirmPassword)
            this.setState({
                popup: <Popup type="message" click={this.closePopup}>
                    <p className="paragraph" style={{ marginBottom: '2rem', fontSize: '3rem' }}>Something is wrong with your password!</p>
                </Popup>
            });
        else
            this.saveData(registerForm);

    }

    /** 
     * Saves the user information.
     * - Saves user data to the database if the information provided is valid.
     * @param {Map<any>} inputFields 
     */
    saveData = async (data) => {

        try {
            const response = await user.signUpUser(
                data.username,
                data.email,
                data.password,
                {
                    postalCode: data.postalCode,
                    country: data.country,
                    province: data.province,
                    city: data.city,
                    street: data.addressStreet,
                    number: data.addressNumber
                }
            );

            db.postCustomer({
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: new Date(data.birthday),
                user: response
            });

            userCharacter.saveUserAvatar(response);
            this.initializeUserData(response);

            this.props.history.replace('/evolootApp/home');

        } catch (err) {
            console.log(err);
        }
    }

    /** 
     * Initializes database user tables with information upon creation
     * of user character.
     * @param {Parse.Object} parseUser
     * @memberof SceneCustomization
     */
    initializeUserData = parseUser => {
        MilestoneManager.initializeUserMilestones(parseUser);
        DailyManager.initializeUserDailies(parseUser);
    }

    render() {
        let registerFormPart = <p>Nothing to see here! :D</p>;

        if (this.state.registerForm) {
            const inputs = this.renderInputs();

            switch (this.state.registerStep) {
                case (1): registerFormPart = (
                    <div className="form">
                        {inputs.slice(4, 8)}
                        <button className="button button__green--small" onClick={this.backRegister}>Back</button>
                        <button className="button button__green--small" onClick={this.continueRegister} disabled={!this.state.formPart02IsValid}>Continue</button>
                    </div>
                );
                    break;
                case (2): registerFormPart = (
                    <form className="form" onSubmit={this.registerHandler}>
                        {inputs.slice(8)}
                        <button className="button button__green--small" onClick={this.backRegister}>Back</button>
                        <button className="button button__green--small" onClick={() => console.log('register')} disabled={!this.state.formPart03IsValid}>Register</button>
                    </form>
                );
                    break;
                default: registerFormPart = (
                    <div className="form">
                        {inputs.slice(0, 4)}
                        <button className="button button__green--small" onClick={this.continueRegister} disabled={!this.state.formPart01IsValid}>Continue</button>
                    </div>
                );
            }
        }

        return (
            <div>
                <ButtonReturn history={this.props.history} />

                {this.state.popup}

                <div className="opening opening--no-background-color">
                    {registerFormPart}
                </div>
            </div>
        );
    }
}

export default Register;