/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import { SceneMap } from '../../scenes/SceneMap';
import { gameConfig } from '../../GameConfig';
import NavMenu from '../../components/Navigation/navMenu';

class Map extends Component {

    componentDidMount() {
        this.warning = document.getElementById('warning');
        this.arena = document.getElementById('arena');
        this.warning.style.display = 'none'; // make this display when clicking a building
        this.arena.style.display = 'none';

        this.mapGame = new Phaser.Game(gameConfig("map"));

        this.mapGame.state.add('SceneMap', SceneMap, true);
    }

    destroyGame = () => {
        this.mapGame.destroy();
    }

	/**
     * Sets the functionality of the current 'content' components of the current modal state and level(if present).
     * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
     */ /*
setButtonFunctions(mapKey) {
    const buttonMenu = document.querySelector('.header__nav-button--menu');
    const buttonMenuBackground = document.querySelector('.header__background--1');
    const buttonSettings = document.querySelector('.header__nav-button--settings');
    const buttonSettingsBackground = document.querySelector('.header__background--2');

    const menuCheckbox = document.getElementById('menu-toggle');
    const settingsCheckbox = document.getElementById('settings-toggle');

    const rangeAutoSpeed = document.getElementById('autoSpeed');
    const rangeManualSpeed = document.getElementById('manualSpeed');
    const showAutoSpeed = document.getElementById('autoSpeedShow');
    const showManualSpeed = document.getElementById('manualSpeedShow');

    switch (mapKey) {

        case 'start':
            this.userLogout();

            // Respectively, when one of these buttons is clicked, it will turn other buttons to 'invisible'.
            if (settingsCheckbox && menuCheckbox) {
                buttonSettings.addEventListener('click', event => {
                    //event.stopPropagation(); solve events triggering twice?

                    if(settingsCheckbox.checked) { 
                        buttonMenu.style.zIndex = 5500;
                        buttonMenuBackground.style.display = 'block';
                    } else {
                        buttonMenu.style.zIndex = -1;
                        buttonMenuBackground.style.display = 'none';
                    }
                });

                buttonMenu.addEventListener('click', event => {
                    if (menuCheckbox.checked){
                        buttonSettings.style.zIndex = 5500;
                        buttonSettingsBackground.style.display = 'block';
                    } else {
                        buttonSettings.style.zIndex = -1;
                        buttonSettingsBackground.style.display = 'none';
                    }
                });
            }

            // On change, changes auto speed or manual speed of the character's pieces.
            if (rangeAutoSpeed && rangeManualSpeed) {
                // default values on screen
                if(localStorage.getItem('autoSpeed')) {
                    rangeAutoSpeed.value = Math.ceil(8000/parseInt(localStorage.getItem('autoSpeed')));
                    showAutoSpeed.innerText = JSON.parse(localStorage.getItem('autoSpeedShow'));
                }

                if(localStorage.getItem('manualSpeed')) {
                    rangeManualSpeed.value = parseInt(localStorage.getItem('manualSpeed')) / 4;
                    showManualSpeed.innerText = parseInt(localStorage.getItem('manualSpeed')) / 4;
                }

                // sets character's auto speed
                rangeAutoSpeed.addEventListener('change', event => {
                    event.preventDefault();

                    // 80 ---- 100 (max speed) ----> 533 ----- 15 (min speed)
                    let autoSpeed = 8000/parseInt(event.target.value); // fast 80 - 400 slower

                    this.characterAssembled.forEach((characterPiece, key) => {
                        if (characterPiece.key) this.character[`${key}`].autoSpeed = autoSpeed;
                    });

                    localStorage.setItem('autoSpeed', JSON.stringify(autoSpeed));
                    localStorage.setItem('autoSpeedShow', JSON.stringify(event.target.value));

                    showAutoSpeed.innerText = event.target.value;
                });

                // sets character's manual speed
                rangeManualSpeed.addEventListener('change', event => {
                    event.preventDefault();
                    let manualSpeed = parseInt(event.target.value) * 4;  // slower 80 - 400 fast

                    this.characterAssembled.forEach((characterPiece, key) => {
                        if (characterPiece.key) this.character[`${key}`].manualSpeed = manualSpeed;
                    });

                    localStorage.setItem('manualSpeed', JSON.stringify(manualSpeed));

                    showManualSpeed.innerText = event.target.value;
                });
            }
            break;
    }
} */

    closePopups = () => {
        this.warning.style.display = 'none';
        this.arena.style.display = 'none';
    }

    render() {

        return (
            <React.Fragment>

                <div className="popup" id="warning">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Sorry, this area is in construction.</p>
                            <p className="paragraph">Staff members only. ;)</p>
                        </div>

                        <div className="row">
                            <Link
                                onClick={this.closePopups}
                                to='/evolootApp/map' className="button button__orange" id="no">No</Link>
                        </div>
                    </div>
                </div>


                <div className="popup" id="arena">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Would you like to enter the Arena ?</p>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Link 
                                onClick={this.destroyGame}
                                to='/evolootApp/auction' className="button button__green" id="yes">Yes</Link>

                            </div>

                            <div className="col-1-of-2">
                                <Link
                                    onClick={this.closePopups}
                                    to='/evolootApp/map' className="button button__red" id="no">No</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <NavMenu destroy={this.destroyGame}/>


                <input type="checkbox" className="header__checkbox header__checkbox--2" id="settings-toggle" />
                <label className="header__nav-button header__nav-button--settings" htmlFor="settings-toggle">
                    <i className="fas fa-cog header__settings"></i>
                </label>

                <div className="header__background header__background--2">&nbsp;</div>

                <nav className="header__nav header__nav--2" >
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <label className="header__nav-link" htmlFor="autoSpeed">Auto-Move Speed
                <input type="range" name="auto-speed" id="autoSpeed" min="15" max="100" step="5" />
                                <p className="header__nav-link" id="autoSpeedShow"> 60</p></label>
                        </li>

                        <li className="header__nav-item">
                            <label className="header__nav-link" htmlFor="manualSpeed">Manual-Move Speed
                <input type="range" name="manual-speed" id="manualSpeed" min="15" max="100" step="5" />
                                <p className="header__nav-link" id="manualSpeedShow"> 60 </p></label>
                        </li>
                    </ul>
                </nav>

                <div id="map"></div>
            </React.Fragment >
        );
    }
}

export default Map;