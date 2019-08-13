import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

class Part04 extends Component { // Skipped

    state = {
        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);
    }

    consoleClickHandler = event => {

        if (this.state.sellParams.find(el => el.sellConsole) === undefined)
            this.state.sellParams.push({ sellConsole: event.currentTarget.id });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellConsole), 1);
            this.state.sellParams.push({ sellConsole: event.currentTarget.id });
        }

        this.props.history.push({
                pathname: '/evolootApp/auction/sell/part05',
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
                            pathname: '/evolootApp/auction/sell/part03',
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
                                <button className="button button__icon" id="nes"
                                    onClick={this.consoleClickHandler}>
                                    <i className="button__icon-icon--small fas fa-gamepad"></i>
                                    <h2 className="button__icon-text--small header-secondary">NES</h2>
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="">
                                    <i className="button__icon-icon--small fab fa-flipboard"></i>
                                    <h2 className="button__icon-text--small header-secondary">SNES</h2>
                                </button>
                            </div>

                            <div className="col-1-of-4">
                                <button className="button button__icon" id="">
                                    <i className="button__icon-icon--small fas fa-book-open"></i>
                                    <h2 className="button__icon-text--small header-secondary">N64</h2>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="footer" id="footer">
                        <DotSteps step={3} />
                    </div>

                </div>
            </div>
        );
    }
}

export default Part04;