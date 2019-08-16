/* eslint-disable */
import React, { Component } from 'react';
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import { SceneAuction } from '../../../../scenes/SceneAuction';
import { gameConfig } from '../../../../GameConfig';
import NavMenu from '../../../../components/Navigation/navMenu';
import ButtonReturn from '../../../../components/Navigation/buttonReturn';

class Part05 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buyParams: [

            ],
        };

        if (this.props.location.buyParams !== undefined)
            this.state.buyParams.push(...this.props.location.buyParams);


    }

    componentDidMount() {
        this.arenaGame = new Phaser.Game(gameConfig("arena"));

        this.arenaGame.state.add('SceneAuction', SceneAuction, true);

        const itemId = this.state.buyParams.find(el => el.auctionItem);

        if (itemId && itemId !== undefined)
            sessionStorage.setItem('itemId', itemId['auctionItem'].id);
    }

    destroyGame = () => {
        this.arenaGame.destroy();
    }

    render() {

        return (
            <React.Fragment>

                <ButtonReturn
                    history={this.props.history}
                    data={{
                        pathname: '/evolootApp/auction/buy/part04',
                        buyParams: this.state.buyParams
                    }}
                    gameToDestroy={this.destroyGame} />

                <NavMenu destroy={this.destroyGame} />

                <div id="arena"></div>

            </React.Fragment >
        );
    }
}

export default Part05;