import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

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
        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);
    }


    companyClickHandler = event => {
        if (this.state.sellParams.find(el => el.sellCompany) === undefined)
            this.state.sellParams.push({ sellCompany: event.currentTarget.id });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellCompany), 1);
            this.state.sellParams.push({ sellCompany: event.currentTarget.id });
        }

        this.props.history.push({
            pathname: '/evolootApp/auction/sell/part03',
            sellParams: this.state.sellParams
        });
    }

    render() {

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part01',
                            sellParams: this.state.sellParams
                        }} />

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
                        <DotSteps step={1} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Part02;