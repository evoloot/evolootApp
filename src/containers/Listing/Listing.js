import React, { Component } from 'react';
import Parse from 'parse';

import * as user from '../../parse/user';
import AuctionItem from '../../parse/AuctionItem';
import NavMenu from '../../components/Navigation/navMenu';
import ItemList from '../../components/UI/Items/itemList';
import Popup from '../../components/UI/popup';

class Listing extends Component {
    state = {
        auctionItems: [],
        selectedItemDetails: null,
        showItemDetails: false,
        popup: null
    }

    componentDidMount() {
        this.retrieveItemsForSelling();
    }

    retrieveItemsForSelling = async () => {
        const Auction = Parse.Object.extend('Auction');
        const auctionItem = new AuctionItem();

        const query = new Parse.Query(Auction);

        const auctionItems = [];

        query.notEqualTo('closed', true);
        query.include('auctionItem');

        try {
            const auctions = await query.find();

            auctions.forEach(auction => {
                
                const item = auction.get('auctionItem');

                if(item.get('parent').id === user.currentUser().id) {
                    const formattedItem = {
                        ...auctionItem.setLocalAuctionItem(item),
                        price: auction.get('currentItemPrice') ? auction.get('currentItemPrice') : item.get('startingBid')
                    };
    
                    auctionItems.push(formattedItem);
                }
            });

            this.setState({
                auctionItems: auctionItems
            })
        } catch (err) {
            console.log(err);
        }
    }

    closeDetails = () => {
        this.setState({
            popup: false
        })
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
                        click={this.closeDetails}>

                        <ol className="auction-item__information-list">
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
                )
            });
        } catch (err) {
            console.log(err);
        }
    }

    deleteItem = event => {
        const item = this.state.auctionItems.find(item => item.id === event.target.id);
        const itemIndex = this.state.auctionItems.findIndex(item => item.id === event.target.id);

        const arrayCopy = [...this.state.auctionItems];

        console.log(item);
    }

    render() {
        const listOfItems = this.state.auctionItems.map(item => {
            return {
                id: item.id,
                picture: item.pictures[0].url(),
                name: item.name,
                price: item.price,
                firstButtonName: 'details',
                secondButtonName: 'delete',
            }
        });

        const buy = (
                <ItemList
                    items={listOfItems}
                    firstButtonFunction={this.showDetails}
                    secondButtonFunction={this.deleteItem}
                />
            );

        return (
            <React.Fragment>

                <NavMenu />

                <div className="stash">
                    <header className="stash__header">
                        <h1 className="header-primary">My Listing</h1>
                    </header>
                    <main className="stash__main">
                        <div className="stash__content">

                            {this.state.popup}
                            {buy}

                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default Listing;