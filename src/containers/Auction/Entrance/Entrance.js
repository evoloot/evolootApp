import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ButtonReturn from '../../../components/Navigation/buttonReturn';
import NavMenu from '../../../components/Navigation/navMenu';

import buyGif from '../../../assets/images/buyCart.gif';
import sellGif from '../../../assets/images/sell.gif';
import featuredGif from '../../../assets/images/featured.gif';
import showDownGif from '../../../assets/images/showDown.gif';

class Entrance extends Component {

    render() {
        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn history={this.props.history} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />

                    &nbsp;
                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">
                        <div className="row u-maximum-max-width">
                            <div className="col-1-of-2">
                                <button className="button button__animated" id="buy">
                                    <Link to="/evolootApp/auction/buy/">
                                        <img src={buyGif} alt="Buy" className="button__animated-image" />
                                    </Link>
                                </button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__animated button__animated--sell" id="sell">
                                    <Link to="/evolootApp/auction/sell/">
                                        <img src={sellGif} alt="Sell" className="button__animated-image" />
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="row u-maximum-max-width">
                            <div className="col-1-of-2">
                                <button className="button button__animated button__animated--featured" id="featured">
                                    <img src={featuredGif} alt="Featured" className="button__animated-image" />
                                </button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__animated button__animated--showdown" id="showdown">
                                    <img src={showDownGif} alt="Showdown" className="button__animated-image" />
                                </button>
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

export default Entrance;