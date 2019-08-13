import React, { Component } from 'react';

import * as Auth from '../../../parse/user';
import ButtonReturn from '../../../components/Navigation/buttonReturn';

import logoImage from '../../../assets/images/logo.png';

class Login extends Component {

    componentDidMount() {
        this.enter = document.getElementById('enter');
        this.userName = document.getElementById('username');
        this.password = document.getElementById('password');
        this.showHidePassword = document.querySelector('.button__search--hide-show');
        this.eyeIcon = document.querySelector('.button__search-icon');
        this.remember = document.getElementById('remember-me');
    }

    goToForget = () => {
        this.props.history.push('/evolootApp/home/forget');
    }

    showOrHidePassword = () => { // needs an icon or image, right now it is invisible
        // hide
        if ('password' === this.password.getAttribute('type')) {
            // change icon
            if (this.eyeIcon) this.eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');

            // change pass input type to text
            this.password.setAttribute('type', 'text');
        }
        // show 
        else {
            // change icon 
            if (this.eyeIcon) this.eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');

            // change pass input type to password
            this.password.setAttribute('type', 'password');
        }
    }

	/**
	 * Functionality collection of the Login state.
	 * - 'Show or hide password' changes the icon and the input type of the password text field to 'text' or 'password' respectively.
	 * - 'Enter' calls the loginUser() async function.
	 * - 'Forget' directs the user to the forget state.
	 */
    login = () => {
        this.loginUser(this.userName.value.trim(), this.password.value, this.remember);
    }


	/**
	 * Performs authentication of the user, that if successful directs him to the SceneMap.
	 * - If remember is checked, next time user 'logs in' the 'login' state will be jumped. 
	 * This information is saved in the localStorage.
	 * - On fail, will give the according feedback error to user on the screen.
	 * @param {string} user user's username or email. 
	 * @param {string} pass user's password.
	 * @param {string} remember 'remember' checkbox value.
	 */
    async loginUser(user, pass, remember) {
        const place = document.getElementById('username');
        const message = document.querySelector('.tv__sigin-error');

        Auth.signIn(user, pass)
            .then(response => {

                if (remember) {
                    // save user credentials in local storage if remember is checked
                    if (remember.checked) localStorage.setItem('remember', JSON.stringify({ remember: true }));
                    else localStorage.setItem('remember', JSON.stringify({ remember: false }));
                }


                this.props.history.replace('/evolootApp/map');
            })
            .catch(err => {

                let sendError;

                if (place) {
                    if (message && message.parentNode) message.parentNode.removeChild(message);

                    switch (err.message) {
                        case 'username/email is required.': sendError = '<span class="tv__sigin-error">Enter your Email/Username and Password!</span>';
                            break;
                        case 'password is required.': sendError = '<span class="tv__sigin-error">You must enter your password!</span>';
                            break;
                        case 'Invalid username/password.': sendError = '<span class="tv__sigin-error">Wrong Email/Username or Password!</span>';
                            break;
                        default : sendError = '';
                    }

                    place.insertAdjacentHTML('afterend', sendError);
                }
            });
    }

    render() {
        return (
            <React.Fragment>

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
                                        <label htmlFor="username" className="label">Email or Username</label>
                                        <input type="text" name="username" id="username" className="form-box__input" placeholder="" autoFocus required />
                                    </div>

                                    <div className="row">
                                        <label htmlFor="password" className="label">Password</label>
                                        <input type="text" name="password" id="password" className="form-box__input" placeholder="" required />

                                        <button className="button button__search button__search--hide-show"
                                            onClick={this.showOrHidePassword}>
                                            <i className="button__search-icon far fa-eye-slash"></i>
                                        </button>
                                    </div>

                                    <div className="row">
                                        <input type="checkbox" id="remember-me" defaultChecked="" className="" />
                                        <label className="label" htmlFor="remember-me">Remember me</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="tv__footer" id="footer">
                            <div className="form-box__login-area">
                                <div className="row">
                                    <button className="button button__green--submit button__green--submit--enter" id="enter"
                                        onClick={this.login}>
                                        <h2 className="button__green--submit-text button__green--submit--enter-text header-secondary">login</h2>
                                    </button>
                                    <button className="button button__green--submit button__green--submit--forget" id="forget"
                                        onClick={this.goToForget}>
                                        <h2 className="button__green--submit-text header-secondary">Forgot your password?</h2>
                                    </button>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;