import React, { Component } from 'react';

import * as user from '../../../parse/user';
import ButtonReturn from '../../../components/Navigation/buttonReturn';
import { Helper } from '../../../utils/helper';

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
	 * @param {string} userInfo user's username or email. 
	 * @param {string} pass user's password.
	 * @param {string} remember 'remember' checkbox value.
	 */
    async loginUser(userInfo, pass, remember) {
        const place = document.getElementById('username');
        const message = document.querySelector('.tv__sigin-error');

        try {
            await user.signIn(userInfo, pass);

            if (remember) {
                // save user credentials in local storage if remember is checked
                if (remember.checked) localStorage.setItem('remember', JSON.stringify({ remember: true }));
                else localStorage.setItem('remember', JSON.stringify({ remember: false }));
            }

            this.props.history.replace('/evolootApp/map');

        } catch (err) {

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
                    default: sendError = '';
                }

                place.insertAdjacentHTML('afterend', sendError);
            }
        };
    }

    render() {
        return (
            <React.Fragment>

                <div className="opening">

                    <ButtonReturn history={this.props.history} />


                    <div className="opening__container form">

                        <header className="opening__header-box">
                            <img src={logoImage} alt="Evoloot Logo" className="logo" />
                        </header>

                        <main className="opening__main-box opening__main-box--column">

                            <div className="form__input-box">
                                <label htmlFor="username" className="form__label">Email or Username</label>
                                <div className="form__input-field-box">
                                    <input type="text" name="username" id="username" className="form__input-field" placeholder="" autoFocus required />
                                </div>
                            </div>
                            <div className="form__input-box">
                                <label htmlFor="password" className="form__label">Password</label>
                                <div className="form__input-field-box">
                                    <input type="text" name="password" id="password" className="form__input-field" placeholder="" required />
                                </div>
                                <button className="button button__search button__search--hide-show"
                                    onClick={this.showOrHidePassword}>
                                    <i className="button__search-icon far fa-eye-slash"></i>
                                </button>
                            </div>

                            <div className="form__input-box">
                                <input type="checkbox" id="remember-me"  defaultChecked="" className="dialog__input" />
                                <label className="form__label dialog__checkbox-label" htmlFor="remember-me"><span class="dialog__checkmark"></span><p class="paragraph dialog__checkbox-name">Remember me</p></label>
                            </div>
                        </main>

                        <footer className="opening__footer-box">
                            <button className="button button__green--submit button__green--submit--enter" id="enter"
                                onClick={this.login}>
                                <h2 className="button__green--submit-text button__green--submit--enter-text header-secondary">login</h2>
                            </button>
                            <button className="button button__green--submit button__green--submit--forget" id="forget"
                                onClick={this.goToForget}>
                                <h2 className="button__green--submit-text header-secondary">Forgot your password?</h2>
                            </button>
                        </footer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;


/*

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
 */