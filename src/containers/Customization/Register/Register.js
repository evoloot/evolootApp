import React, { Component } from 'react';

import * as user from '../../../parse/user';
import * as userCharacter from '../../../parse/userCharacter';
import { DailyManager } from "../../../xpengine/dailies";
import { MilestoneManager } from "../../../xpengine/milestones";

import ButtonReturn from '../../../components/Navigation/buttonReturn';

import buttonImage from '../../../assets/images/continue.png';

class Register extends Component {

    componentDidMount() {
        this.username = document.getElementById('username');
        this.email = document.getElementById('email');
        this.confirmEmail = document.getElementById('confirmEmail');
        this.password = document.getElementById('password');
        this.confirmPassword = document.getElementById('confirmPassword');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.birthday = document.getElementById('birthday');
        this.city = document.getElementById('city');
        this.province = document.getElementById('province');
    }

    /** 
	 * Saves the user information.
	 * - Saves user data to the database if the information provided is valid.
	 * @param {Map<any>} inputFields 
	 */
    saveData = () => {

        const fieldValues = new Map(
            [
                ['username', this.username.value],
                ['email', this.email.value],
                ['confirmEmail', this.confirmEmail.value],
                ['password', this.password.value],
                ['confirmPassword', this.confirmPassword.value],
                ['firstName', this.firstName.value],
                ['lastName', this.lastName.value],
                ['birthday', this.birthday.value],
                ['city', this.city.value],
                ['province', this.province.value]
            ]
        );

        user.signUpUser(
            fieldValues.get('username'),
            fieldValues.get('email'),
            fieldValues.get('password')
        )
            .then(response => {
                userCharacter.saveUserAvatar(response);
                this.initializeUserData(response);

                this.props.history.replace('/evolootApp/home');
            })
            .catch(err => {
                console.log(err);
            });
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

        return (
            <React.Fragment>
                <div id="modal">
                    <ButtonReturn history={this.props.history} />

                    <div className="opening opening--no-background-color">
                        <div className="tv" id="register">
                            <div className="form">

                                <header className="tv__header">
                                    <h1 className="header-primary">CHARACTER SELECT</h1>
                                </header>

                                <div className="tv__body tv__body--form">

                                    <div className="row u-overflow">
                                        <div className="col-1-of-2">
                                            <div className="form-box">
                                                <label htmlFor="username" className="label">Username</label>
                                                <input className="form-box__input form-box__input--full" type="text" name="username" id="username" placeholder="" autoFocus required />
                                                <span className="validity"></span>
                                            </div>

                                            <div className="form-box">
                                                <div className="row">
                                                    <div className="col-1-of-2">
                                                        <label htmlFor="firstName" className="label">First Name</label>
                                                        <input className="form-box__input form-box__input--full" name="firstName" id="firstName" placeholder="" type="text" required />
                                                    </div>

                                                    <div className="col-1-of-2">
                                                        <label htmlFor="lastName" className="label">Last Name</label>
                                                        <input className="form-box__input form-box__input--full" name="lastName" id="lastName" placeholder="" type="text" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-box">
                                                <label htmlFor="birthday" className="label">Date of Birth</label>
                                                <input className="form-box__input form-box__input--full form-box__input--date" type="date" name="birthday" id="birthday" placeholder="" required />
                                            </div>

                                            <div className="form-box">
                                                <div className="row">
                                                    <div className="col-1-of-2">
                                                        <label htmlFor="city" className="label">City</label>
                                                        <input className="form-box__input form-box__input--full" name="city" id="city" placeholder="" type="text" required />
                                                    </div>
                                                    <div className="col-1-of-2">
                                                        <label htmlFor="province" className="label">Province</label>
                                                        <input className="form-box__input form-box__input--full" name="province" id="province" placeholder="" type="text" required />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-1-of-2">
                                            <div className="form-box">
                                                <label htmlFor="email" className="label">E-mail</label>
                                                <input className="form-box__input form-box__input--full" type="email" name="email" id="email" placeholder="" required />
                                            </div>

                                            <div className="form-box">
                                                <label htmlFor="confirmEmail" className="label">Confirm E-mail</label>
                                                <input className="form-box__input form-box__input--full" type="email" name="confirmEmail" id="confirmEmail" placeholder="" required />
                                            </div>

                                            <div className="form-box">
                                                <label htmlFor="password" className="label">Password</label>
                                                <input className="form-box__input form-box__input--full" type="password" name="password" id="password" placeholder="" required />
                                            </div>

                                            <div className="form-box">
                                                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                                                <input className="form-box__input form-box__input--full" type="password" name="confirmPassword" id="confirmPassword" placeholder="" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <footer className="tv__footer-absolute--submit" id='button_row-2'>
                                    <div className="row">
                                        <div className="col-1-of-2">
                                            <button className="button button__brown" id="save"
                                                onClick={this.saveData}>
                                                <img src={buttonImage} alt="continue" />
                                            </button>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Register;

/*
 import * as db from '../../parse/DB';
import * as user from '../../parse/user';
        db.postCustomer(
            {
                lastName: 'Homeless',
                firstName: 'Alfred',
                birthDate:  new Date('09/04/1995'),
                user: user.currentUser()
            }
        );
*/