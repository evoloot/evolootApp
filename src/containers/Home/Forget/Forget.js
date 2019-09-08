import React, { Component } from 'react';

import ButtonReturn from '../../../components/Navigation/buttonReturn';
import Input from '../../../components/UI/input';
import * as user from '../../../parse/user';
import { Helper } from '../../../utils/helper';

import logoImage from '../../../assets/images/logo.png';

class Forget extends Component {

	state = {
		registerForm: null,
		formIsValid: false,
	}

	componentDidMount() {
		const registerForm = {
			email: Helper.createFormElement('input', { type: 'email', placeholder: 'email@anything.com', id: 'Email' }, { required: true, emailFormat: true })
		}

		this.setState({
			registerForm: registerForm
		});
	}

	checkValidity = (value, rules) => {
		let isValid = true; // starts as valid

		// depends on which rules we have
		if (rules.required)
			isValid = value.trim() !== '' && isValid; // basically checking if field value is empty or filled with white spaces

		if (rules.emailFormat)
			isValid = /\w+@\w+\.\w{2,}/ig.test(value) && isValid;

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

		let formIsValid = true;

		for (let inputIdentifier in updatedRegisterForm) {
			formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid; // :D, remember if one is false, everything is!
		}

		this.setState({
			registerForm: updatedRegisterForm,
			formIsValid: formIsValid
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

	/**
	 * Sends an reset password email to the user if an valid/existent email has been provided.
	 * - On sucess or fail, a feedback will be sent to the user on screen.
	 * @param {string} email : string provided in the email text field. 
	 */
	resetPassword = async (event) => {
		event.preventDefault();

        const registerForm = {};

        for (let formElementIdentifier in this.state.registerForm) {
            registerForm[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }

		const emailElement = document.getElementById('Email');
		const messageValid = document.querySelector('.tv__reset--valid');
		const messageError = document.querySelector('.tv__reset--error');

		if (messageValid) messageValid.parentNode.removeChild(messageValid);
		if (messageError) messageError.parentNode.removeChild(messageError);

		try {
			await user.resetPassword(registerForm.email);

			emailElement.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--valid">A Password Reset E-mail has been sent to you!</span>');
		} catch (err) {
			emailElement.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--error">No user found with this e-mail!</span>');
		}
	}

	render() {
		let inputs = null;

		if (this.state.registerForm)
			inputs = this.renderInputs();

		return (

			<div className="opening">

				<ButtonReturn history={this.props.history} />


				<div className="opening__container form">

					<header className="opening__header-box">
						<img src={logoImage} alt="Evoloot Logo" className="logo" />
					</header>

					<main className="opening__main-box opening__main-box--column">
						{inputs}
					</main>

					<footer className="opening__footer-box">
						<button className="button button__green--small" id="reset"
							onClick={this.resetPassword} disabled={!this.state.formIsValid}>Reset</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Forget;