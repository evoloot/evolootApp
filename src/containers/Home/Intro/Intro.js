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
        return localStorage.getItem('remember') && JSON.parse(localStorage.getItem('remember')).remember ?  this.goToMap() : this.goToLogin();
    }

    render() {

        return (
            <React.Fragment>
                <div className="opening" id="modal">
                    &emsp;
                <div className="tv" id="opening">

                        <header className="tv__header">
                            <img src={logoImage} alt="Evoloot Logo" className="tv__logo" />
                        </header>

                        <div className="tv__body" id="body">
                            <div className="row">
                                <div className="col-1-of-3">
                                    <video controls className="video-box">
                                        <source src={sampleVideo} type="video/mp4" />
                                        {/*<source src="../../assets/video/sampleVideo2.ogg" type="video/ogg">*/}
                                        Your browser does not support the video tag.</video>
                                </div>

                                <div className="col-1-of-3">
                                    <video controls className="video-box">
                                        <source src={sampleVideo} type="video/mp4" />
                                        {/*<source src="../../assets/video/sampleVideo2.ogg" type="video/ogg">*/}
                                        Your browser does not support the video tag.</video>
                                </div>

                                <div className="col-1-of-3">
                                    <video controls className="video-box">
                                        <source src={sampleVideo} type="video/mp4" />
                                        {/*<source src="../../assets/video/sampleVideo2.ogg" type="video/ogg">*/}
                                        Your browser does not support the video tag.</video>
                                </div>

                            </div>
                        </div>

                        <footer className="tv__footer" id="footer">
                            <div className="row">
                                <div className="col-1-of-2">
                                    <button className="button button__yellow" id="begin"
                                        onClick={this.goToBegin}>
                                        <img src={beginButtonImage} alt="Begin Journey" className="button__img" />
                                    </button>
                                </div>

                                <div className="col-1-of-2">
                                    <button className="button button__yellow" id="login"
                                        onClick={this.checkRemember}>
                                        <img src={loginButtonImage} alt="Log In" className="button__img" />
                                    </button>
                                </div>

                            </div>
                        </footer>
                    </div>
                </div>

            </React.Fragment >

        );
    }
}

export default Intro;