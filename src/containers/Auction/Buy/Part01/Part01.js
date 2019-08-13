import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';

import tradingCardsImage from "../../../../assets/images/isometrics/Isometric_TradingCards.png";
import comicsImage from "../../../../assets/images/isometrics/Isometric_Comics.png";
import boardGamesImage from "../../../../assets/images/isometrics/Isometric_BoardGames.png";
import videoGamesImage from "../../../../assets/images/isometrics/Menu_VideoGames.png";
import othersImage from "../../../../assets/images/isometrics/Menu_Other.png";

class Part01 extends Component {

    state = {
        buyParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.buyParams !== undefined)
            this.state.buyParams.push(...this.props.location.buyParams);

        console.log(this.state.buyParams);
    }

    categoryClickHandler = event => {
        if (this.state.buyParams.find(el => el.buyCategory) === undefined)
            this.state.buyParams.push({ buyCategory: event.currentTarget.id });
        else {
            this.state.buyParams.splice(this.state.buyParams.findIndex(el => el.buyCategory), 1);
            this.state.buyParams.push({ buyCategory: event.currentTarget.id });
        }

        this.props.history.push({
            pathname: '/evolootApp/auction/buy/part02',
            buyParams: this.state.buyParams
        });
    }

    render() {
        const contentBoxOptionsObjects = [
            { id: 'videoGames', iconClass: 'fas fa-gamepad', innerText: 'Video Games' },
            { id: 'tradingCards', iconClass: 'fab fa-flipboard', innerText: 'Trading Cards' },
            { id: 'comics', iconClass: 'fas fa-book-open', innerText: 'Comics' },
            { id: 'boardGames', iconClass: 'fas fa-chess-board', innerText: 'Board Games' },
            { id: 'other', iconClass: 'fas fa-exclamation-circle', innerText: 'Other' },
        ];

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/'
                        }}
                    />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />

                    &nbsp;
                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">
                        <div className="row u-maximum-max-width">

                            <div className="col-1-of-2">
                                <button className="button button__icon button__icon--big-2" id={contentBoxOptionsObjects[0].id}
                                    onClick={this.categoryClickHandler}>
                                    <img className="button__icon-icon--small" src={videoGamesImage} alt="Video Games" />
                                    <h2 className="button__icon-text--big header-secondary">{contentBoxOptionsObjects[0].innerText}</h2>
                                </button>
                            </div>

                            <div className="col-1-of-2">
                                <div className="row u-maximum-max-width">
                                    <div className="col-1-of-2">
                                        <button className="button button__icon" id={contentBoxOptionsObjects[1].id} disabled>
                                            <img className="button__icon-icon--small" src={tradingCardsImage} alt="Trading Cards" />
                                            <h2 className="button__icon-text--small header-secondary">{contentBoxOptionsObjects[1].innerText}</h2>
                                        </button>
                                    </div>
                                    <div className="col-1-of-2">
                                        <button className="button button__icon" id={contentBoxOptionsObjects[2].id} disabled>
                                            <img className="button__icon-icon--small" src={comicsImage} alt="Comics" />
                                            <h2 className="button__icon-text--small header-secondary">{contentBoxOptionsObjects[2].innerText}</h2>
                                        </button>
                                    </div>
                                </div>
                                <div className="row u-maximum-max-width">
                                    <div className="col-1-of-2">
                                        <button className="button button__icon" id={contentBoxOptionsObjects[3].id} disabled>
                                            <img className="button__icon-icon--small" src={boardGamesImage} alt="Board Games" />
                                            <h2 className="button__icon-text--small header-secondary">{contentBoxOptionsObjects[3].innerText}</h2>
                                        </button>
                                    </div>


                                    <div className="col-1-of-2">
                                        <button className="button button__icon" id={contentBoxOptionsObjects[4].id} disabled>
                                            <img className="button__icon-icon--small" src={othersImage} alt="Others" />
                                            <h2 className="button__icon-text--small header-secondary">{contentBoxOptionsObjects[4].innerText}</h2>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer" id="footer">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export default Part01;