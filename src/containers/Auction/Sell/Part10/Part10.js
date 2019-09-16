import React, { Component } from 'react';

import * as user from '../../../../parse/user';
import AuctionItem from '../../../../parse/AuctionItem';
import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

import oldManImage from '../../../../assets/images/oldMan.png';

class Part10 extends Component {
    state = {
        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);
    }

    confirmHandler = () => {
        const auctionItem = new AuctionItem();
        const auctionStyleRadios = document.getElementsByName('auctionStyle');
        const auctionLengthRadios = document.getElementsByName('auctionLength');

        const auctionName = document.getElementById('auctionName');

        const startingPrice = document.getElementById('auctionStartingPrice');
        const reserveInteger = document.getElementById('auctionReserveInteger');
        const reserveCent = document.getElementById('auctionReserveCent');
        // shipping
        const returnPolicy = document.getElementById('auctionReturnPolicy');

        let valid = true;

        if (auctionName && (auctionName.value.trim() !== ''))
            if (this.state.sellParams.find(el => el['auctionName']) === undefined)
                this.state.sellParams.push({ auctionName: auctionName.value });
            else {
                this.state.sellParams.splice(this.state.sellParams.findIndex(el => el['auctionName']), 1);
                this.state.sellParams.push({ auctionName: auctionName.value });
            }
        else
            valid = false;

        [
            auctionStyleRadios,
            auctionLengthRadios
        ].forEach(element => {
            if (element) {
                const elementNames = Array.from(element).find(radio => radio.checked === true);

                if (this.state.sellParams.find(el => el[`${elementNames.name}`]) === undefined)
                    this.state.sellParams.push({ [elementNames.name]: elementNames.value });
                else {
                    this.state.sellParams.splice(this.state.sellParams.findIndex(el => el[`${elementNames.name}`]), 1);
                    this.state.sellParams.push({ [elementNames.name]: elementNames.value });
                }
            }
        });

        if (startingPrice) {
            if (startingPrice.value && startingPrice.value >= 1) {
                if (this.state.sellParams.find(el => el[`${startingPrice.name}`]) === undefined)
                    this.state.sellParams.push({ [startingPrice.id]: `${Math.floor(startingPrice.value)}` });
                else {
                    this.state.sellParams.splice(this.state.sellParams.findIndex(el => el[`${startingPrice.name}`]), 1);
                    this.state.sellParams.push({ [startingPrice.id]: `${Math.floor(startingPrice.value)}` });
                }
            } else
                valid = false;
        }

        if (reserveInteger && reserveCent) {
            let dollar = reserveInteger.value && reserveInteger.value >= 1 ? Math.floor(reserveInteger.value) : valid = false;
            let cent = reserveCent.value && reserveCent.value >= 0 ? Math.round(reserveCent.value) : valid = false;

            if (valid) {
                if (this.state.sellParams.find(el => el.auctionReserveValue) === undefined)
                    this.state.sellParams.push({ auctionReserveValue: `${dollar}.${cent}` });
                else {
                    this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.auctionReserveValue), 1);
                    this.state.sellParams.push({ auctionReserveValue: `${dollar}.${cent}` });
                }
            }
        }
        if (returnPolicy && returnPolicy.value !== '-- Select --') {
            if (this.state.sellParams.find(el => el[`${returnPolicy.id}`]) === undefined)
                this.state.sellParams.push({ [returnPolicy.id]: returnPolicy.value });
            else {
                this.state.sellParams.splice(this.state.sellParams.findIndex(el => el[`${returnPolicy.id}`]), 1);
                this.state.sellParams.push({ [returnPolicy.id]: returnPolicy.value });
            }
        }
        else {
            valid = false;
            //userSell.postAuctionItem(user.currentUser(), this.state.sellParams); // debug purposes
        }

        if (valid) {
            //send the data
            auctionItem.postAuctionItem(user.currentUser(), this.state.sellParams);

            this.props.history.push('/evolootApp/auction/sell/part11');
        }

    }

    render() {

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part09',
                            sellParams: this.state.sellParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />


                    <div className="row">
                        <figure className="dialog">
                            <img src={oldManImage} alt="Old Man" className="dialog__character" />
                            <div className="dialog__balloon">
                                <p className="paragraph"> Setup your auction specifications. </p>
                            </div>
                        </figure>
                    </div>


                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="row u-maximum-max-width">
                            <div className="">

                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label u-padding-none">
                                            <p className="paragraph">Auction Style:</p>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">Option 1</p>

                                            <input type="radio" name="auctionStyle" defaultValue="1" className="dialog__input" defaultChecked />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">Option 2</p>

                                            <input type="radio" name="auctionStyle" defaultValue="2" className="dialog__input" />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">Option 3</p>

                                            <input type="radio" name="auctionStyle" defaultValue="3" className="dialog__input" />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>
                                </div>


                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label u-padding-none">
                                            <p className="paragraph">Auction Length:</p>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">1 Day</p>

                                            <input type="radio" name="auctionLength" defaultValue="1" className="dialog__input" defaultChecked />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">3 Days</p>

                                            <input type="radio" name="auctionLength" defaultValue="3" className="dialog__input" />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">7 Days</p>

                                            <input type="radio" name="auctionLength" defaultValue="7" className="dialog__input" />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="row u-very-small-margin-bottom form-box__input-box">
                                    <label htmlFor="auctionName" className="label dialog__checkbox-label u-padding-none">
                                        <p className="paragraph">Auction Name: </p>
                                    </label>
                                    <input type="text" id="auctionName" name="auctionName" className="form__input-field" autoFocus/>
                                    {/* <div className="col-1-of-4">
                                        <div className="label dialog__checkbox-label u-padding-none">
                                            <p className="paragraph">Minimum Bid Price:</p>
                                        </div>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">$0.25</p>

                                            <input type="radio" name="auctionMinimumPrice" defaultValue="0.25" className="dialog__input" defaultChecked />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">$1.00</p>

                                            <input type="radio" name="auctionMinimumPrice" defaultValue="1" className="dialog__input" />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>

                                    <div className="col-1-of-4">
                                        <label className="label dialog__checkbox-label">
                                            <p className="paragraph dialog__checkbox-name">$5.00</p>

                                            <input type="radio" name="auctionMinimumPrice" defaultValue="5" className="dialog__input" />
                                            <span className="dialog__checkmark--circle"></span>
                                        </label>
                                    </div>*/}

                                </div>

                                <div className="row u-very-small-margin-bottom form-box__input-box">
                                    <label className="label dialog__checkbox-label u-padding-none" htmlFor="auctionStartingPrice">
                                        <p className="paragraph">Starting Price:</p>
                                    </label>

                                        <div className="dialog__checkbox-item">
                                            <p className="label dialog__checkbox-label u-padding-none">
                                                &nbsp;$<input type="number" min="1" id="auctionStartingPrice" className="dialog__number-input form__input-field" />.00
                                            </p>

                                        </div>
                                </div>

                                <div className="row u-very-small-margin-bottom form-box__input-box">
                                    <label className="label dialog__checkbox-label u-padding-none" htmlFor="auctionReserveInteger">
                                        <p className="paragraph">Reserve:</p>
                                    </label>

                                        <div className="dialog__checkbox-item">
                                            <p className="label dialog__checkbox-label u-padding-none">
                                                &nbsp;$<input type="number" min="1" id="auctionReserveInteger" className="dialog__number-input form__input-field" />.<input type="number" min="0" defaultValue="00" id="auctionReserveCent" className="dialog__number-input form__input-field" />
                                            </p>
                                        </div>
                                </div>
{/*<div className="row u-very-small-margin-bottom">
                                    <div className="label dialog__checkbox-label u-padding-none">
                                        <p className="paragraph">Shipping:</p>
                                    </div>
                                </div> */}
                                

                                <div className="row u-very-small-margin-bottom">
                                    <label className="label dialog__checkbox-label u-padding-none" htmlFor="auctionReturnPolicy">
                                        <p className="paragraph">Return Policy:&nbsp;</p>
                                    </label>
                                    <select className="search__select button__green--small" id="auctionReturnPolicy">
                                        <option defaultValue="-- Select --">-- Select --</option>
                                        <option defaultValue="return">Returns Accepted</option>
                                        <option defaultValue="noReturn">Returns Not Accepted</option>
                                    </select>
                                </div>

                                <div className="row">
                                    <button className="button button__green--submit button__green--small" id="confirm"
                                        onClick={this.confirmHandler}>
                                        <h2 className="button__green--submit-text header-secondary">Confirm</h2>
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="footer" id="footer">
                        <DotSteps step={9} />
                    </div>

                </div>
            </div>
        );
    }
}

export default Part10;