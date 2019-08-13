import React, { Component } from 'react';
import * as user from '../../parse/user';

//test 
import * as testDB from '../../parse/DB';

import NavMenu from '../../components/Navigation/navMenu';

class Profile extends Component {

    state = {
        userInfo: null,
        popupText: null,
        popupInputType: null,
        popupField: null
    }

    componentDidMount() {
        this.passwordPopup = document.getElementById('password');
        this.popupInput = document.getElementById('popupInput');
        this.popup = document.getElementById('popup');
        this.passwordPopup.style.display = 'none';
        this.popup.style.display = 'none';

        this.displayUserInformation();
    }

    resetPassword = async () => {
        try {
            await user.resetPassword(user.currentUser().get('email'));
            this.closePopups();
            console.log('email sent');
        } catch (err) {
            console.log(err);
        }
    }

    changeField = () => {
        user.updateUserAttribute(this.state.popupField, this.popupInput.value);

        this.displayUserInformation();

        this.closePopups();
    }

    openResetPasswordPopup = () => {
        this.passwordPopup.style.display = 'block';
    }

    openPopup = (field, type, text) => {
        this.popup.style.display = 'block';

        this.setState({
            popupField: field,
            popupText: text,
            popupInputType: type
        });
    }

    closePopups = () => {
        this.passwordPopup.style.display = 'none';
        this.popup.style.display = 'none';
    }

    displayUserInformation = async () => {
        try {
            const currentUser = await user.currentUser();

            // undefined
            const something = await testDB.getCharacterByUser(currentUser);
            console.log(something);

            this.setState({
                userInfo: (
                    <div className="profile__content">
                        <div className="profile__box">
                            <ol className="profile__box-list">
                                <li className="profile__box-list-item">
                                    <p className="label">Email:</p>
                                    <p>{currentUser.get('email')}</p>
                                    <button 
                                    onClick={this.openPopup.bind(this, 'email', 'email', 'email')}>change</button>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">Password:</p>
                                    <p>***</p>
                                    <button onClick={this.openResetPasswordPopup}>reset</button>
                                </li>
                            </ol>
                        </div>
                        <div className="profile__box">
                            <ol className="profile__box-list">
                                <li className="profile__box-list-item">
                                    <p className="label">Username:</p>
                                    <p>{currentUser.get('username')}</p>
                                    <button 
                                    onClick={this.openPopup.bind(this, 'username', 'text', 'username')}>change</button>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">First Name:</p>
                                    <p>text</p>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">Last Name:</p>
                                    <p>text</p>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">Birth Date:</p>
                                    <p>text</p>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">City:</p>
                                    <p>text</p>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">Province:</p>
                                    <p>text</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                )
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        return (
            <React.Fragment>
                <NavMenu />

                <div className="profile">
                    {this.state.userInfo}
                </div>

                {/*turn this into a component??? YES*/}
                <div className="popup" id="popup">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Enter your new {this.state.popupText}</p>
                            <input
                                className="form-box__input"
                                id="popupInput"
                                type={this.state.popupInputType}
                                placeholder={"your " + this.state.popupText} required />
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <button className="button button__red" id="no"
                                    onClick={this.changeField}>Confirm</button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__red" id="no"
                                    onClick={this.closePopups}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup" id="password">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Are you sure ?</p>
                            <p className="paragraph">An email will be sent</p>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <button className="button button__red" id="no"
                                    onClick={this.resetPassword}>Yes</button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__red" id="no"
                                    onClick={this.closePopups}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;