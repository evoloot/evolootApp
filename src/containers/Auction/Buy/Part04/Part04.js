import React, { Component } from 'react';

import AuctionItem from '../../../../parse/AuctionItem';
import * as user from '../../../../parse/user';
import { Helper } from '../../../../utils/helper';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';

import './Part04.css';

class Part04 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buyParams: [

            ],

            auctionItems: [],
            currentAuctionItem: null,
            currentAuctionItemIndex: 0,
            currentAuctionItemDetails: null,
            firstLoad: false
        };

        if (this.props.location.buyParams !== undefined)
            this.state.buyParams.push(...this.props.location.buyParams);

        this.setAuctionObjects();
    }

    componentDidMount() {
        this.auctionItemDetail = document.querySelector('.details__list');
        this.auctionItemDetail.style.display = 'none';
    }

    setAuctionObjects = async () => {
        const auctionItem = new AuctionItem();

        try {
            const items = await auctionItem.retrieveAuctionItems();

            this.setState({
                auctionItems: items
            });

        } catch (err) {
            console.log(err);
        }
    }

    openModal = () => {
        this.auctionItemDetail.style.display = 'block';
    }

    closeModal = () => {
        this.auctionItemDetail.style.display = 'none';
    }

    goRight = () => {
        let index = this.state.currentAuctionItemIndex;

        if (index < this.state.auctionItems.length - 1) {
            ++index;
        }
        else {
            index = 0;
        }

        this.displayObject(index);
    }

    goLeft = () => {
        let index = this.state.currentAuctionItemIndex;

        if (index > 0) {
            --index
        }
        else {
            index = this.state.auctionItems.length - 1
        }

        this.displayObject(index);
    }

    displayObject = async (number) => {

        if (this.state.auctionItems.length > 0)
            try {

                if (!this.state.auctionItems[number].owner) {
                    const ownerUserName = await user.retrieveUsername(this.state.auctionItems[number].parent);

                    this.state.auctionItems[number] = {
                        ...this.state.auctionItems[number],
                        owner: ownerUserName
                    }
                }

                const auctionItem = this.state.auctionItems[number];

                const timeLeft = Helper.calculateRemainingTime(auctionItem.startingDate, auctionItem.auctionLength);

                if (!this.state.currentAuctionItem || this.state.currentAuctionItemIndex !== number) {
                    this.setState({
                        currentAuctionItemIndex: number,
                        firstLoad: true,
                        currentAuctionItem: (
                            <figure className="auction-item__box">
                                <img src={auctionItem.pictures[0].url()} alt="item" className="auction-item__picture" />
                                <ol className="auction-item__information-list">
                                    <li className="auction-item__information-item">current price: ${auctionItem.startingBid}</li>
                                    <li className="auction-item__information-item">time left: {`${timeLeft.days}d:${timeLeft.hours}h:${timeLeft.minutes}m`}</li>

                                    <li className="auction-item__information-item">
                                        <button
                                            className="button-alternative details-button"
                                            onClick={this.openModal}>
                                            details</button>
                                    </li>
                                    <li className="auction-item__information-item">
                                        <button
                                            onClick={this.joinAuction}
                                            className="button-alternative join-button">Join!</button>
                                    </li>
                                </ol>
                            </figure>
                        ),
                        currentAuctionItemDetails: (
                            <React.Fragment>
                                <li className="details__list-item">
                                    <p className="topic">item condition:</p><p className="topic__content">{auctionItem.itemCondition}</p>
                                </li>
                                <li className="details__list-item details__list-item--description">
                                    <p className="topic">details: </p><p className="topic__content">{auctionItem.extrasDescription}</p>
                                </li>
                                <li className="details__list-item">
                                    <p className="topic">return policy:</p><p className="topic__content">{auctionItem.returnPolicy}</p>
                                </li>
                                <li className="details__list-item">
                                    <p className="topic">shipping</p>
                                </li>
                                <li className="details__list-item">
                                    <p className="topic">seller:</p><p className="topic__content">{auctionItem.owner}</p>
                                </li>
                                <li className="details__list-item">
                                </li>
                                <li className="details__list-item">
                                    <p>contact:</p><p className="topic__content">{auctionItem.sellerContact}</p>
                                </li>
                                <li className="details__list-item">
                                    <button className="button-alternative join-button" onClick={this.closeModal}>close</button>
                                </li>
                            </React.Fragment>
                        )
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
    }

    joinAuction = () => {
        const currentItem = this.state.auctionItems[this.state.currentAuctionItemIndex];

        if (this.state.buyParams.find(el => el.auctionItem) === undefined)
            this.state.buyParams.push({ auctionItem: currentItem });
        else {
            this.state.buyParams.splice(this.state.buyParams.findIndex(el => el.auctionItem), 1);
            this.state.buyParams.push({ auctionItem: currentItem });
        }

        this.props.history.push({
            pathname: '/evolootApp/auction/buy/part05',
            buyParams: this.state.buyParams
        });
    }

    render() {
        this.displayObject(this.state.currentAuctionItemIndex);

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/buy/part03',
                            buyParams: this.state.buyParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />
                    &nbsp;
            </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="auction-item">
                            <button className="button-alternative arrow-button"
                                onClick={this.goLeft}>&lt;</button>
                            {this.state.currentAuctionItem}
                            <button className="button-alternative arrow-button"
                                onClick={this.goRight}>&gt;</button>
                        </div>

                        <ol className="details__list">
                            {this.state.currentAuctionItemDetails}
                        </ol>

                    </div>
                    <div className="footer" id="footer">
                        {/*<SellDotSteps step={2} />*/}
                    </div>

                </div>
            </div>
        );
    }
}

export default Part04;