import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

import oldManImage from '../../../../assets/images/oldMan.png';

class Part07 extends Component {

    state = {
        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);
    }

    newUsedClickHandler = event => {
        if (this.state.sellParams.find(el => el.sellNewUsed) === undefined)
            this.state.sellParams.push({ sellNewUsed: event.currentTarget.id });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellNewUsed), 1);
            this.state.sellParams.push({ sellNewUsed: event.currentTarget.id });
        }

        this.props.history.push({
                pathname: '/evolootApp/auction/sell/part08',
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

                    <div className="row">
                        <figure className="dialog">
                            <img src={oldManImage} alt="Old Man" className="dialog__character" />
                            <div className="dialog__balloon">
                                <p className="paragraph"> Is the item new or used ? </p>
                            </div>
                        </figure>
                    </div>


                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="row u-maximum-max-width">
                            <div className="col-1-of-2">
                                <div className="dialog__header">
                                    <h2 className="header-primary--small">New</h2>
                                </div>

                                <button className="button button__icon--big" id="new"
                                    onClick={this.newUsedClickHandler}>
                                    <i className="button__icon--big-icon fas fa-gamepad"></i>
                                </button>

                                <div className="dialog__explanation">
                                    <p className="paragraph--secondary">
                                        Lorem ipsum dolor sit amet consectetur adipisicing dolor elit. Sed illum hic magnam.</p>
                                </div>
                            </div>

                            <div className="col-1-of-2">
                                <div className="dialog__header">
                                    <h2 className="header-primary--small">Used</h2>
                                </div>

                                <button className="button button__icon--big" id="used"
                                    onClick={this.newUsedClickHandler}>
                                    <i className="button__icon--big-icon fas fa-gamepad"></i>
                                </button>

                                <div className="dialog__explanation">
                                    <p className="paragraph--secondary">
                                        Lorem ipsum dolor sit amet consectetur adipisicing dolor elit. Sed illum hic magnam.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="footer" id="footer">
                        <DotSteps step={6}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Part07;