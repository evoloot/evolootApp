/* eslint-disable */
import React, { Component } from 'react';
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import { SceneCustomization } from '../../../scenes/SceneCustomization';
import { gameConfig } from '../../../GameConfig';
import ButtonReturn from '../../../components/Navigation/buttonReturn';

import buttonImage from '../../../assets/images/continue.png';

class customizationStep01 extends Component {

    componentDidMount() {
        this.customizationGame = new Phaser.Game(gameConfig("customization"));

        this.customizationGame.state.add('SceneCustomization', SceneCustomization, true);
    }

    goToRegister = () => {
        this.destroyGame();
        this.props.history.push('/evolootApp/customization/register');
    }

    destroyGame = () => {
        this.customizationGame.destroy();
    }

    render() {
        return (
            <React.Fragment>
                <div id="modal">
                    <ButtonReturn
                        history={this.props.history}
                        gameToDestroy={this.destroyGame} />


                    <div className="tv__header-absolute">
                        <h1 className="header-primary">CHARACTER SELECT</h1>
                    </div>
                <div className="tv__footer-absolute">
                        <div className="col-1-of-2">
                            <button onClick={this.goToRegister} className="button button__brown" id="continue">
                                <img src={buttonImage} alt="continue" />
                            </button>
                        </div>
                    </div>
                </div>

                <div id="customization"></div>

            </React.Fragment>

        );
    }
}



export default customizationStep01;