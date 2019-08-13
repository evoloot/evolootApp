import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

import oldManImage from '../../../../assets/images/oldMan.png';
import listingImage from '../../../../assets/images/isometrics/Menu_ViewListing.png'
import sellAgainImage from '../../../../assets/images/isometrics/Menu_SellAgain.png'
import returnToMapImage from '../../../../assets/images/isometrics/Menu_ReturnToMap.png'

class Part11 extends Component {

    render() {

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn
                        history={this.props.history}
                    />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />

                    <div className="row">
                        <figure className="dialog">
                            <img src={oldManImage} alt="Old Man" className="dialog__character" />
                            <div className="dialog__balloon">
                                <p className="paragraph"> Congratulations, your item is in display! </p>
                            </div>
                        </figure>
                    </div>


                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="row u-maximum-max-width u-small-margin-top">
                            <div className="col-1-of-3">
                                <div className="dialog__header">
                                    <h2 className="header-primary--small">View Listing</h2>
                                </div>


                                <button className="button button__icon--big" id="listing">
                                    <img className="button__icon-icon--small" src={listingImage} alt="listing" /> 
                                </button>
                            </div>

                            <div className="col-1-of-3">
                                <div className="dialog__header">
                                    <h2 className="header-primary--small">Return to Map</h2>
                                </div>

                                <button className="button button__icon--big" id="returnToMap"
                                onClick={() => this.props.history.push('/evolootApp/map')}>
                                    <img className="button__icon-icon--small" src={returnToMapImage} alt="return to map" /> 
                                </button>
                            </div>

                            <div className="col-1-of-3">
                                <div className="dialog__header">
                                    <h2 className="header-primary--small">Sell Again?</h2>
                                </div>

                                <button className="button button__icon--big" id="listing"
                                onClick={() => this.props.history.push('/evolootApp/auction/sell/')}>
                                    <img className="button__icon-icon--small" src={sellAgainImage} alt="sell again?"/> 
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="footer" id="footer">
                        <DotSteps />
                    </div>

                </div>
            </div>
        );
    }
}

export default Part11;