import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';
import GridOfEight from '../../../../components/Grids/gridOfEight';

class Part05 extends Component {

    state = {
        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);
    }

    consoleTypeClickHandler = event => {
        if (this.state.sellParams.find(el => el.sellConsoleType) === undefined)
            this.state.sellParams.push({ sellConsoleType: event.currentTarget.id });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellConsoleType), 1);
            this.state.sellParams.push({ sellConsoleType: event.currentTarget.id });
        }

        this.props.history.push({
                pathname: '/evolootApp/auction/sell/part06',
                sellParams: this.state.sellParams
            });
    }

    render() {

        const contentBoxOptionsItemsObjects = [
            { id: 'games', iconClass: 'fas fa-gamepad', innerText: 'Games' },
            { id: 'hardware', iconClass: 'fab fa-flipboard', innerText: 'Hardware' },
            { id: 'accessories', iconClass: 'fas fa-book-open', innerText: 'Accessories' },
            { id: 'bundles', iconClass: 'fas fa-chess-board', innerText: 'Bundles' },
        ];

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part04',
                            sellParams: this.state.sellParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />

                    &nbsp;
                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <GridOfEight
                            click={this.consoleTypeClickHandler}
                            objects={contentBoxOptionsItemsObjects} />

                    </div>
                    <div className="footer" id="footer">
                        <DotSteps step={4} />
                    </div>

                </div>
            </div>
        );
    }
}

export default Part05;