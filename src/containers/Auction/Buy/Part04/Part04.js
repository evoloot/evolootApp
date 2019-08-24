import React, { Component } from 'react';

import AuctionItem from '../../../../parse/AuctionItem';
import * as user from '../../../../parse/user';
import Parse from 'parse';
import { Helper } from '../../../../utils/helper';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import Popup from '../../../../components/UI/popup';

import './Part04.css';

class Part04 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buyParams: [],
            auctionItems: [],
            currentAuctionItem: null,
            currentAuctionItemIndex: 0,
            currentAuctionItemDetails: null,
            firstLoad: false,
            popup: null
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
        this.auctionItem = new AuctionItem();

        try {
            const items = await this.auctionItem.retrieveAuctionItems();

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
        const Auction = Parse.Object.extend('Auction');
        const query = new Parse.Query(Auction);

        if (this.state.auctionItems.length > 0)
            try {
                if (!this.state.currentAuctionItem || this.state.currentAuctionItemIndex !== number) {
                    this.auctionItemForShow = this.auctionItem.setLocalAuctionItem(this.state.auctionItems[number]);

                    query.equalTo('auctionItem', this.state.auctionItems[number]);
                    const search = await query.first();
    
                    this.auctionItemForShow.price = search.get('currentItemPrice') ? search.get('currentItemPrice') : this.auctionItemForShow.startingBid;
    
                    this.auctionItemForShow.owner = await user.retrieveUser(this.state.auctionItems[number].getParent());
    
                    const timeLeft = Helper.calculateRemainingTime(this.auctionItemForShow.startingDate, this.auctionItemForShow.auctionLength);
                    
                    let time = timeLeft !== 'expired' ? `${timeLeft.days}d:${timeLeft.hours}h:${timeLeft.minutes}m` : '0d:0h:0m';

                    this.setState({
                        currentAuctionItemIndex: number,
                        firstLoad: true,
                        currentAuctionItem: (
                            <figure className="auction-item__box">
                                <h2 className="auction-item__title">{this.auctionItemForShow.name}</h2>
                                <img src={this.auctionItemForShow.pictures[0].url()} alt="item" className="auction-item__picture" />
                                <ol className="auction-item__information-list">
                                    <li className="auction-item__information-item">current price: ${this.auctionItemForShow.price.toFixed(2)}</li>
                                    <li className="auction-item__information-item">time left: {time}</li>

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
                                    <p className="topic">item condition:</p><p className="topic__content">{this.auctionItemForShow.itemCondition}</p>
                                </li>
                                <li className="details__list-item details__list-item--description">
                                    <p className="topic">details: </p><p className="topic__content">{this.auctionItemForShow.extrasDescription}</p>
                                </li>
                                <li className="details__list-item">
                                    <p className="topic">return policy:</p><p className="topic__content">{this.auctionItemForShow.returnPolicy}</p>
                                </li>
                                <li className="details__list-item">
                                    <p className="topic">shipping</p>
                                </li>
                                <li className="details__list-item">
                                    <p className="topic">seller:</p><p className="topic__content">{this.auctionItemForShow.owner.get('username')}</p>
                                </li>
                                <li className="details__list-item">
                                </li>
                                <li className="details__list-item">
                                    <p>contact:</p><p className="topic__content">{this.auctionItemForShow.sellerContact}</p>
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
        if (this.auctionItemForShow.owner.id !== user.currentUser().id) {
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
        } else {
            this.setState({
                popup: (
                    <Popup
                        type='message'
                        click={this.closeWarning}>
                        <div className="popup__text">
                            <p className="paragraph">
                                You're the owner of this auction...
                            </p>
                        </div>
                    </Popup>
                )
            });
        }
    }

    closeWarning = () => {
        this.setState({
            popup: null
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

                {this.state.popup}
            </div>
        );
    }
}

export default Part04;