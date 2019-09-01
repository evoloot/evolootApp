import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import Parse from 'parse';

import * as user from '../../parse/user';
import * as db from '../../parse/DB';
import AuctionItem from '../../parse/AuctionItem';
import NavMenu from '../../components/Navigation/navMenu';
import CheckoutForm from '../../components/Checkout/checkoutForm';
import ItemList from '../../components/UI/Items/itemList';
import Popup from '../../components/UI/popup';

class Stash extends Component {

  state = {
    auctionItems: [],
    selectedItemDetails: null,
    showItemDetails: false,
    popup: null,
    paying: false,
    canPay: false,
    itemToPay: null,
    customer: {}
  }

  componentDidMount() {
    this.retrieveWonItems();
  }

  retrieveWonItems = async () => {
    const Auction = Parse.Object.extend('Auction');
    const auctionItem = new AuctionItem();

    const query = new Parse.Query(Auction);

    const auctionItems = [];

    query.equalTo('closed', true);
    query.equalTo('winningPlayer', user.currentUser());
    query.include('auctionItem');

    try {
      const customer = await db.getCustomerByUser(user.currentUser());
      const auctions = await query.find();

      auctions.forEach(auction => {
        const item = auction.get('auctionItem');

        const formattedItem = {
          ...auctionItem.setLocalAuctionItem(item),
          price: auction.get('currentItemPrice')
        };

        auctionItems.push(formattedItem);
      });

      this.setState({
        auctionItems: auctionItems,
        customer: customer
      })
    } catch (err) {
      console.log(err);
    }
  }

  closeDetails = () => {
    this.setState({
      showItemDetails: false
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
        selectedItemDetails: (
          <Popup
            type="message"
            click={this.closeDetails}>

            <ol className="auction-item__information-list">
              <li className="details__list-item">
                <p className="topic">item condition:</p><p className="topic__content">{item.itemCondition}</p>
              </li>
              <li className="details__list-item details__list-item--description">
                <p className="topic">details: </p><p className="topic__content">{item.extrasDescription}</p>
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

  // HERE
  checkout = event => {

    const item = this.state.auctionItems.find(item => item.id === event.target.id);

    this.setState({
      paying: true,
      itemToPay: item
    });
  }

  backToList = event => {
    this.setState({
      paying: false
    });
  }

  handleChange = change => {
    change.complete ? this.setState({canPay: true}) : this.setState({canPay: false});
  };

  render() {
    const listOfItems = this.state.auctionItems.map(item => {
      return {
        id: item.id,
        picture: item.pictures[0].url(),
        name: item.name,
        price: item.price,
        firstButtonName: 'details',
        secondButtonName: 'check out',
      }
    });

    let details;
    let buy;

    if (this.state.paying)
      buy = (
        <Elements>
          <CheckoutForm
            currentItem={this.state.itemToPay}
            customerInfo={this.state.customer}
            canPay={this.state.canPay}
            change={this.handleChange}
            back={this.backToList}
          />
        </Elements>
      );
    else
      buy = (
        <ItemList
          items={listOfItems}
          firstButtonFunction={this.showDetails}
          secondButtonFunction={this.checkout}
        />
      )

    if (this.state.showItemDetails)
      details = this.state.selectedItemDetails;
    else
      details = null;



    return (
      <React.Fragment>

        <NavMenu />

        <div className="stash">
          <header className="stash__header">
            <h1 className="header-primary">My Stash</h1>
          </header>
          <main className="stash__main">
            <div className="stash__content">

              {details}
              {buy}

            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default Stash;