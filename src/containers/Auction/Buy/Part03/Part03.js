import React, { Component } from 'react';

import AuctionItem from '../../../../parse/AuctionItem';
import * as user from '../../../../parse/user';
import Parse from 'parse';

import { Helper } from '../../../../utils/helper';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import Popup from '../../../../components/UI/popup';

class part03 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buyParams: [],
            auctionItems: [],
            firstLoad: false,
            popup: null
        };

        if (this.props.location.buyParams !== undefined)
            this.state.buyParams.push(...this.props.location.buyParams);

        this.retrieveOpenAuctions();
    }

    componentDidMount() {
    }

    retrieveOpenAuctions = async () => {
        const auctionItem = new AuctionItem();
        const Auction = Parse.Object.extend('Auction');

        const query = new Parse.Query(Auction);

        const auctionItems = [];

        query.notEqualTo('closed', true);
        query.include('auctionItem');

        try {
            const auctions = await query.find();

            auctions.forEach(auction => {
                const item = auction.get('auctionItem');
                const timeLeft = Helper.calculateRemainingTime(item.getStartDate(), item.getAuctionLength());

                let time = timeLeft !== 'expired' ? `${timeLeft.days}d:${timeLeft.hours}h:${timeLeft.minutes}m` : '0d:0h:0m';

                const formattedItem = {
                    ...auctionItem.setLocalAuctionItem(item),
                    price:auction.get('currentItemPrice') ? auction.get('currentItemPrice') : item.get('startingBid'),
                    timeLeft: time
                };

                auctionItems.push(formattedItem);
            });

            this.setState({
                auctionItems: auctionItems
            });

        } catch (err) {
            console.log(err);
        }
    }

    imageHandler = event => {
        this.setState({
            popup: <Popup
            type="message"
            click={this.closeWarning}>
               <img src={event.target.src} alt="item" className=""/>
        </Popup>
        })
    }

    displayItems = auctionItems => {

        return auctionItems.map(auctionItem => {
            return (
                <figure key={auctionItem.id} className="auction-item__box">
                    <h2 className="auction-item__title header-ellipsed">{auctionItem.name}</h2>
                    <div className="auction-item__information-box">
                        <img src={auctionItem.pictures[0].url()} alt="item" className="auction-item__picture" onClick={this.imageHandler} />
                        <ol className="auction-item__information-list">
                            <li className="auction-item__information-item money"><p className="paragraph"> CAD${auctionItem.price.toFixed(2)}</p></li>
                            <li className="auction-item__information-item"><p className="normal-paragraph">{auctionItem.timeLeft}</p></li>

                            <li className="auction-item__information-item">
                                <button
                                    id={auctionItem.id}
                                    className="button button__green--small"
                                    onClick={this.showDetails}>
                                    details</button>
                            </li>
                            <li className="auction-item__information-item">
                                <button
                                    id={auctionItem.id}
                                    onClick={this.joinAuction}
                                    className="button button__green--small">Join!</button>
                            </li>
                        </ol>
                    </div>
                </figure>
            );
        });
    }

    showDetails = async (event) => {
        const item = this.state.auctionItems.find(item => item.id === event.target.id);
        const itemIndex = this.state.auctionItems.findIndex(item => item.id === event.target.id);

        const arrayCopy = [...this.state.auctionItems];

        try {
            let sellerName;

            if (!item.seller) {
                const seller = await user.retrieveUser(item.parent);

                sellerName = seller.get('username');

                arrayCopy[itemIndex].seller = sellerName

                this.setState({
                    auctionItems: arrayCopy
                });
            }
            else
                sellerName = item.seller

            this.setState({
                auctionItems: arrayCopy,
                popup: (
                    <Popup
                        type="message"
                        click={this.closeWarning}>

                        <ol className="auction-item__information-list" style={{width: '100%'}}>
                            <li className="details__list-item">
                                <p className="topic">item condition:</p><p className="topic__content">{item.itemCondition}</p>
                            </li>
                            <li className="details__list-item">
                                <p className="topic">details: </p><textarea className="topic__content" readOnly>{item.extrasDescription}</textarea>
                            </li>
                            <li className="details__list-item">
                                <p className="topic">return policy:</p><p className="topic__content">{item.returnPolicy}</p>
                            </li>
                            <li className="details__list-item">
                                <p className="topic">shipping</p>
                            </li>
                            <li className="details__list-item">
                                <p className="topic">seller:</p><p className="topic__content">{sellerName}</p>
                            </li>
                            <li className="details__list-item">
                            </li>
                            <li className="details__list-item">
                                <p>contact:</p><p className="topic__content">{item.sellerContact}</p>
                            </li>
                        </ol>
                    </Popup>
                ),
                showItemDetails: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    joinAuction = event => {
        const item = this.state.auctionItems.find(item => item.id === event.target.id);

        if (item.parent.id !== user.currentUser().id) {
            if (this.state.buyParams.find(el => el.auctionItem) === undefined)
                this.state.buyParams.push({ auctionItem: item });
            else {
                this.state.buyParams.splice(this.state.buyParams.findIndex(el => el.auctionItem), 1);
                this.state.buyParams.push({ auctionItem: item });
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
        let items = null;

        if(this.state.auctionItems.length > 0)
            items = this.displayItems(this.state.auctionItems);
        else 
            items = <h3 className="header-primary header-primary--small">-- Nothing here yet --</h3>

        return (
            <div className="arena">
                <div className="header" id="header">

                    <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/buy/part02',
                            buyParams: this.state.buyParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />
                    &nbsp;
            </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="auction-item">
                            {items}
                            {this.state.popup}
                        </div>

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

export default part03;