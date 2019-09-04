import React, { Component } from 'react';

import logoImage from '../../../assets/images/logo.png';
import sampleVideo from '../../../assets/video/sampleVideo2.mp4';
import beginButtonImage from '../../../assets/images/begin_journey.png';
import loginButtonImage from '../../../assets/images/log_in.png';


class Intro extends Component {

    goToLogin = () => {
        this.props.history.push('/evolootApp/home/login');
    }

    goToBegin = () => {
        this.props.history.push('/evolootApp/customization/');
    }

    goToMap = () => {
        this.props.history.replace('/evolootApp/map/');
    }

	/**
	 * Verifies if 'remember' was marked last time user logged in, which in this case, goes directly to SceneMap,
	 * else goes to 'login' state.
	 */
    checkRemember = () => {
        // if remember me was enabled, login automatically 
        return localStorage.getItem('remember') && JSON.parse(localStorage.getItem('remember')).remember ? this.goToMap() : this.goToLogin();
    }

    render() {

        return (
            <section className="opening opening--space-between">
                <div className="opening__container form">
                    <header className="opening__header-box">
                        <img src={logoImage} alt="Evoloot Logo" className="logo" />
                    </header>

                    <main className="opening__main-box">
                        <button className="button button__green--small" onClick={this.goToBegin}>
                            Sign-up
                        {/*<img src={beginButtonImage} alt="Begin Journey" className="button__img" />*/}
                        </button>

                        <button className="button button__green--small" onClick={this.checkRemember}>
                            Log In
                        {/*<img src={loginButtonImage} alt="Log In" className="button__img" />*/}
                        </button>
                    </main>

                    <footer className="opening__footer-box" >
                        <p className="">© 2019 Evoloot Enterprises</p>
                    </footer>
                </div>
            </section>
        );
    }
}

export default Intro;