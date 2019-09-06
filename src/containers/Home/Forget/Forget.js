import React, { Component } from 'react';

import ButtonReturn from '../../../components/Navigation/buttonReturn';
import * as user from '../../../parse/user';

import logoImage from '../../../assets/images/logo.png';

class Forget extends Component {

	componentDidMount() {
		this.reset = document.getElementById('reset');
		this.email = document.getElementById('email');
	}

	/**
	 * Sends an reset password email to the user if an valid/existent email has been provided.
	 * - On sucess or fail, a feedback will be sent to the user on screen.
	 * @param {string} email : string provided in the email text field. 
	 */
	resetPassword = async (email) => {
		const messageValid = document.querySelector('.tv__reset--valid');
		const messageError = document.querySelector('.tv__reset--error');

		if (messageValid) messageValid.parentNode.removeChild(messageValid);
		if (messageError) messageError.parentNode.removeChild(messageError);

		try {
			await user.resetPassword(email);

			this.email.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--valid">A Password Reset E-mail has been sent to you!</span>');
		} catch (err) {
			this.email.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--error">No user found with this e-mail!</span>');
		}
	}

	/**
	 * Functionality collection of the Forget state.
	 * 'Reset' calls the resetPassword() async function.
	 */
	forget = () => {
		if (this.email && this.email.value.trim() !== '') this.resetPassword(this.email.value.trim());
	}

	render() {
		return (

			<div className="opening">

				<ButtonReturn history={this.props.history} />


				<div className="opening__container form">

					<header className="opening__header-box">
						<img src={logoImage} alt="Evoloot Logo" className="logo" />
					</header>

					<main className="opening__main-box opening__main-box--column">
						<div className="form__input-box">
							<label htmlFor="email" className="form__label">Email</label>
							<div className="form__input-field-box">
								<input type="text" name="email" id="email" className="form__input-field" placeholder="myemail@anything.com" autoFocus required />
							</div>
						</div>

					</main>

					<footer className="opening__footer-box">
						<button className="button button__green--small" id="reset"
							onClickCapture={this.forget}>Reset</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Forget;