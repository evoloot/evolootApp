import React, { Component } from 'react';
import * as user from '../../parse/user';
import * as db from '../../parse/DB';

import NavMenu from '../../components/Navigation/navMenu';
import MenuBar from '../../components/UI/MenuBar/menuBar';

class Profile extends Component {

    state = {

        popupText: null,
        popupInputType: null,
        popupField: null,
        initialized: false,

        userInfoDisplay: null,

        loginInfo: null,
        userInfo: null,
        addressInfo: null,
        
        menuBarList: [
            { name: 'Login' }, { name: 'Personal' }, { name: 'Address' }
        ]
    }

    componentDidMount() {
        this.passwordPopup = document.getElementById('password');
        this.popupInput = document.getElementById('popupInput');
        this.popupInput2 = document.getElementById('popupInput2');
        this.popup = document.getElementById('popup');
        this.popup2 = document.getElementById('popup2');
        this.passwordPopup.style.display = 'none';
        this.popup.style.display = 'none';
        this.popup2.style.display = 'none';

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

    changeField = event => {
        event.preventDefault();

        if (this.popupInput.value.trim() !== '') {
            user.updateUserAttribute(this.state.popupField, this.popupInput.value);

            this.displayUserInformation();

            this.closePopups();
        }
    }

    changeCustomerField = async (event) => {
        event.preventDefault();
        let value;

        if (this.state.popupField === 'birthDate')
            value = new Date(this.popupInput2.value);
        else
            value = this.popupInput2.value;

        console.log(value);
        try {
            if (this.popupInput2.value.trim() !== '') {
                await user.updateUserCostumerAttribute(this.state.popupField, value);

                this.displayUserInformation();

                this.closePopups();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    openResetPasswordPopup = () => {
        this.passwordPopup.style.display = 'block';
    }

    openPopup = (field, type, text, forUser = true) => {
        if (forUser)
            this.popup.style.display = 'block';
        else {
            this.popup2.style.display = 'block';
        }

        this.setState({
            popupField: field,
            popupText: text,
            popupInputType: type
        });
    }

    closePopups = () => {
        this.popupInput.value = '';
        this.popupInput2.value = '';

        this.passwordPopup.style.display = 'none';
        this.popup.style.display = 'none';
        this.popup2.style.display = 'none';
    }

    changeDisplay = event => {
        const id = event.target.id;
        let display = null;


        console.log(id)

        if (id === this.state.menuBarList[0].name)
            display = this.state.loginInfo;
        else if (id === this.state.menuBarList[1].name)
            display = this.state.userInfo;
        else
            display = this.state.addressInfo;

        this.setState({
            userInfoDisplay: (
                <div className="profile__content">
                    <MenuBar
                        list={this.state.menuBarList}
                        clickHandler={this.changeDisplay} />
                    {display}
                </div>
            )
        })
    }

    displayUserInformation = async () => {
        try {
            const currentUser = await user.currentUser();
            const currentCustomer = await db.getCustomerByUser(currentUser);

            const customer = {
                firstName: currentCustomer.get('firstName') ? `${currentCustomer.get('firstName')}` : '',
                lastName: currentCustomer.get('lastName') ? `${currentCustomer.get('lastName')}` : '',
                birthdate: currentCustomer.get('birthDate') ? `${currentCustomer.get('birthDate').getUTCDate()}/${currentCustomer.get('birthDate').getMonth() + 1}/${currentCustomer.get('birthDate').getFullYear()}` : ''
            }

            this.setState({
                userInfoDisplay: (
                    <div className="profile__content">
                        <MenuBar
                            list={this.state.menuBarList}
                            clickHandler={this.changeDisplay} />
                        <div className="profile__box">
                            <ol className="profile__box-list">
                                <li className="profile__box-list-item">
                                    <p className="label">Email:</p>
                                    <p>{currentUser.get('email')}</p>
                                    <button className="button button__green--small"
                                        onClick={this.openPopup.bind(this, 'email', 'email', 'email')}>change</button>
                                </li>
                                <li className="profile__box-list-item">
                                    <p className="label">Password:</p>
                                    <p>***</p>
                                    <button className="button button__green--small" onClick={this.openResetPasswordPopup}>reset</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                ),
                loginInfo: (
                    <div className="profile__box">
                        <ol className="profile__box-list">
                            <li className="profile__box-list-item">
                                <p className="label">Email:</p>
                                <p>{currentUser.get('email')}</p>
                                <button className="button button__green--small"
                                    onClick={this.openPopup.bind(this, 'email', 'email', 'email')}>change</button>
                            </li>
                            <li className="profile__box-list-item">
                                <p className="label">Password:</p>
                                <p>***</p>
                                <button className="button button__green--small" onClick={this.openResetPasswordPopup}>reset</button>
                            </li>
                        </ol>
                    </div>
                ),
                userInfo: (
                    <div className="profile__box">
                        <ol className="profile__box-list">
                            <li className="profile__box-list-item">
                                <p className="label">Username:</p>
                                <p>{currentUser.get('username')}</p>
                                <button className="button button__green--small"
                                    onClick={this.openPopup.bind(this, 'username', 'text', 'username')}>change</button>
                            </li>
                            <li className="profile__box-list-item">
                                <p className="label">First Name:</p>
                                <p>{customer.firstName}</p>
                                <button className="button button__green--small"
                                    onClick={this.openPopup.bind(this, 'firstName', 'text', 'first name', false)}>change</button>
                            </li>
                            <li className="profile__box-list-item">
                                <p className="label">Last Name:</p>
                                <p>{customer.lastName}</p>
                                <button className="button button__green--small"
                                    onClick={this.openPopup.bind(this, 'lastName', 'text', 'last name', false)}>change</button>
                            </li>
                            <li className="profile__box-list-item">
                                <p className="label">Birth Date:</p>
                                <p>
                                    {customer.birthdate}
                                </p>
                                <button className="button button__green--small"
                                    onClick={this.openPopup.bind(this, 'birthDate', 'date', 'birth date', false)}>change</button>
                            </li>
                        </ol>
                    </div>
                ),
                addressInfo: null
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
                    {this.state.userInfoDisplay}
                </div>

                <div className="popup" id="popup">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Enter your new {this.state.popupText}</p>
                            <input
                                className="form__input-field"
                                id="popupInput"
                                type={this.state.popupInputType}
                                placeholder={"your " + this.state.popupText} required autoFocus/>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <button className="button button__green--small" id="no"
                                    onClick={this.changeField}>Confirm</button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__green--small" id="no"
                                    onClick={this.closePopups}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup" id="popup2">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Enter your new {this.state.popupText}</p>
                            <input
                                className="form__input-field"
                                id="popupInput2"
                                type={this.state.popupInputType}
                                placeholder={"your " + this.state.popupText} required autoFocus/>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <button className="button button__green--small" id="no"
                                    onClick={this.changeCustomerField}>Confirm</button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__green--small" id="no"
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
                                <button className="button button__green--small" id="no"
                                    onClick={this.resetPassword}>Yes</button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__green--small" id="no"
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