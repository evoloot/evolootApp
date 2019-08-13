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
	resetPassword = email => {
		const messageValid = document.querySelector('.tv__reset--valid');
		const messageError = document.querySelector('.tv__reset--error');

		if (messageValid) messageValid.parentNode.removeChild(messageValid);
		if (messageError) messageError.parentNode.removeChild(messageError);

		user.resetPassword(email)
			.then(response => {
				this.email.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--valid">A Password Reset E-mail has been sent to you!</span>');
			})
			.catch(err => {
				this.email.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--error">No user found with this e-mail!</span>');
			});
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


			<div className="opening" id="modal">

			<ButtonReturn history={this.props.history} />
			
	
			<div className="tv" id="opening">
	
				<header className="tv__header">
					<img src={logoImage} alt="Evoloot Logo" className="tv__logo" />
				</header>
	
				<div className="tv__body" id="body">
					<div className="form-box">
						<div className="tv__body form-box__login-area" id="body">
							<div className="row">
								<p className="paragraph">Please enter your email address. You will</p>
								<p className="paragraph">receive a link to create a new password.</p>
							</div>
							<div className="row">
								<label htmlFor="email" className="label">E-mail</label>
								<input type="email" name="username" id="email" className="form-box__input" placeholder="" autoFocus required />
							</div>
						</div>
					</div>
				</div>
	
				<footer className="tv__footer" id="footer">
					<div className="form-box__login-area">
						<div className="row">
							<button className="button button__green--submit button__green--submit--enter" id="reset"
							onClickCapture={this.forget}>
								<h2 className="button__green--submit-text button__green--submit--enter-text header-secondary">Reset Password</h2>
							</button>
						</div>
					</div>
				</footer>
			</div>
		</div>
		);
	}
}

export default Forget;