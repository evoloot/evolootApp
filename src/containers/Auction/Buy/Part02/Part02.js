import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';

import nintendoLogo from "../../../../assets/images/isometrics/nintendo/Nintendo_Company.png";
import sonyLogo from "../../../../assets/images/isometrics/sony/Sony_Company.png";
import microsoftLogo from "../../../../assets/images/isometrics/microsoft/Microsoft_Company.png";
import segaLogo from "../../../../assets/images/isometrics/sega/SEGA_Company.png";
import atariLogo from "../../../../assets/images/isometrics/atari/Atari_Company.png";
import desktopLogo from "../../../../assets/images/isometrics/DESKTOP+MAC_Logo.png";
import othersImage from "../../../../assets/images/isometrics/Menu_Other.png";
import importsImage from "../../../../assets/images/isometrics/Imports_Logo.png";

class Part02 extends Component {

    state = {
        buyParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.buyParams !== undefined)
            this.state.buyParams.push(...this.props.location.buyParams);

        console.log(this.state.buyParams);
    }

    companyClickHandler = event => {
        if (this.state.buyParams.find(el => el.buyCompany) === undefined)
            this.state.buyParams.push({ buyCompany: event.currentTarget.id });
        else {
            this.state.buyParams.splice(this.state.buyParams.findIndex(el => el.buyCompany), 1);
            this.state.buyParams.push({ buyCompany: event.currentTarget.id });
        }

        this.props.history.push({
            pathname: '/evolootApp/auction/buy/part03',
            buyParams: this.state.buyParams
        });
    }

    render() {

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn history={this.props.history} 
                    data={{
                        pathname: '/evolootApp/auction/buy/part01',
                        buyParams: this.state.buyParams
                    }}/>

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />

                    &nbsp;
                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">
                        <div className="row u-maximum-max-width">
                            <div className="col-1-of-4">
                                <button className="button button__icon" id="nintendo"
                                onClick={this.companyClickHandler}>
                                    <img className="button__icon-icon--small" src={nintendoLogo} alt="Nintendo Logo" />
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="sony"
                                onClick={this.companyClickHandler}>
                                    <img className="button__icon-icon--small" src={sonyLogo} alt="Sony Logo" />
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="microsoft"
                                onClick={this.companyClickHandler}>
                                    <img className="button__icon-icon--small" src={microsoftLogo} alt="Microsoft Logo" />
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="sega"
                                onClick={this.companyClickHandler}>
                                    <img className="button__icon-icon--small" src={segaLogo} alt="Sega Logo" />
                                </button>
                            </div>
                        </div>

                        <div className="row u-maximum-max-width">
                            <div className="col-1-of-4">
                                <button className="button button__icon" id="atari"
                                onClick={this.companyClickHandler}>
                                    <img className="button__icon-icon--small" src={atariLogo} alt="Atari Logo" />
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="winmac" disabled>
                                    <img className="button__icon-icon--small" src={desktopLogo} alt="Desktop" />
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="other" disabled>
                                    <img className="button__icon-icon--small" src={othersImage} alt="Others" />
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="imports" disabled>
                                <img className="button__icon-icon--small" src={importsImage} alt="Imports" /> 
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="footer" id="footer">
                        {/*<SellDotSteps />*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Part02;