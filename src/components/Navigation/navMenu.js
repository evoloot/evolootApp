import React from 'react';
import { Link } from 'react-router-dom';
import * as user from '../../parse/user';

const navMenu = props => {

    const destroyGame = () => {
        if (props.destroy)
            props.destroy();
    }

    /* Performs user logout, directing him to the SceneTitle.
    * - It will remove 'remember' from localStorage, meaning the user will have to login next time.
    * - It will remove user's character from localStorage.
    */
    const logout = () => {
        destroyGame();

        user.signOut()
            .then(sucess => {
                if (localStorage.getItem('remember')) localStorage.removeItem('remember');
                if (localStorage.getItem('character')) localStorage.removeItem('character');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <input type="checkbox" className="header__checkbox header__checkbox--1" id="menu-toggle" />
            <label className="header__nav-button header__nav-button--menu" htmlFor="menu-toggle">
                <span className="header__menu"></span>
            </label>

            <div className="header__background header__background--1">&nbsp;</div>

            <nav className="header__nav header__nav--1">
                <ul className="header__nav-list">
                    <li className="header__nav-item"><Link to="/evolootApp/profile" className="header__nav-link" onClick={destroyGame}>My Profile</Link></li>
                    <li className="header__nav-item"><Link to="/evolootApp/auction" className="header__nav-link" onClick={destroyGame}>Auction</Link></li>
                    <li className="header__nav-item"><Link to="/evolootApp/map" className="header__nav-link" onClick={destroyGame}>Map</Link></li>
                    <li className="header__nav-item"><Link to="/evolootApp" className="header__nav-link" onClick={logout}>Logout</Link></li>
                </ul>
            </nav>
        </React.Fragment>
    );

};

export default navMenu;