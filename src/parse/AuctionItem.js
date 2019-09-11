import * as Parse from 'parse';
import moment from 'moment-timezone';

/**
 * AuctionItem 
 * @author Victor V. Piccoli
 */
class AuctionItem extends Parse.Object {
    constructor() {
        super('AuctionItem');
    }

    getName() {
        return this.get('name');
    }

    getPictures() {
        return this.get('images');
    }

    getReserve() {
        return this.get('reserve');
    }

    getStartingBid() {
        return this.get('startingBid');
    }

    getStartDate() {
        return this.get('startDate');
    }

    getReturnPolicy() {
        return this.get('itemAuctionReturnPolicy');
    }

    getAuctionStyle() {
        return this.get('auctionStyle');
    }

    getAuctionLength() {
        return this.get('auctionLength');
    }

    getMinimumBidPrice() {
        return this.get('auctionMinimumPrice');
    }

    getExtrasDescription() {
        return this.get('extrasDescription');
    }

    getExtrasCondition() {
        return this.get('itemExtrasCondition');
    }

    getBoxCondition() {
        return this.get('itemBoxCondition');
    }

    getInstructionsCondition() {
        return this.get('itemInstructionsCondition');
    }

    getItemCondition() {
        return this.get('condition');
    }

    getSellerContact() {
        return this.get('sellerContact');
    }

    getParent() {
        return this.get('parent');
    }

    setName(string) {
        this.set('name', string);
    }

    setPictures(arrayOfFiles) {
        this.set('images', arrayOfFiles);
    }

    setReserve(floatValue) {
        this.set('reserve', floatValue);
    }

    setStartingBid(floatValue) {
        this.set('startingBid', floatValue);
    }

    setStartDate(date) {
        this.set('startDate', date);
    }

    setReturnPolicy(string) {
        this.set('itemAuctionReturnPolicy', string);
    }

    setAuctionStyle(integer) {
        this.set('auctionStyle', integer);
    }

    setAuctionLength(integer) {
        this.set('auctionLength', integer);
    }

    setMinimumBidPrice(floatValue) {
        this.set('auctionMinimumPrice', floatValue);
    }

    setExtrasDescription(string) {
        this.set('extrasDescription', string);
    }

    setExtrasCondition(string) {
        this.set('itemExtrasCondition', string);
    }

    setBoxCondition(string) {
        this.set('itemBoxCondition', string);
    }

    setInstructionsCondition(string) {
        this.set('itemInstructionsCondition', string);
    }

    setItemCondition(string) {
        this.set('condition', string);
    }

    setSellerContact(string) {
        this.set('sellerContact', string);
    }

    setParent(pointer) {
        this.set('parent', pointer);
    }

    setLocalAuctionItem = auctionItem => {
        return {
            id: auctionItem.id,
            pictures: auctionItem.getPictures(),
            reserve: auctionItem.getReserve(),
            startingBid: auctionItem.getStartingBid(),
            startingDate: auctionItem.getStartDate(),
            returnPolicy: auctionItem.getReturnPolicy(),
            auctionStyle: auctionItem.getAuctionStyle(),
            auctionLength: auctionItem.getAuctionLength(),
            //auctionMinBidPrice: auctionItem.getMinimumBidPrice(),
            extrasDescription: auctionItem.getExtrasDescription(),
            extrasCondition: auctionItem.getExtrasCondition(),
            instructionsCondition: auctionItem.getInstructionsCondition(),
            itemCondition: auctionItem.getItemCondition(),
            sellerContact: auctionItem.getSellerContact(),
            name: auctionItem.getName(),
            parent: auctionItem.getParent()
        }
    }

    retrieveAuctionItems = async () => {
        const query = new Parse.Query(this);
        //let auctionItems = [];

        try {
            const arrayOfObjects = await query.find();

            //auctionItems = arrayOfObjects.map(auctionItem => this.setLocalAuctionItem(auctionItem));

            return arrayOfObjects;//auctionItems;
        } catch (err) {
            console.log(err + ' table does not exist!');
        }
    }

    retrieveAuctionItem = async (id) => {
        const query = new Parse.Query(this);

        try {
            const object = await query.get(id);

            return this.setLocalAuctionItem(object);
        } catch (err) {
            console.log(err + ' table does not exist!');
        }
    }

    retrievePureAuctionItem = async (id) => {
        const query = new Parse.Query(this);

        try {
            const object = await query.get(id);

            return object;
        } catch (err) {
            console.log(err + ' table does not exist!');
        }
    }

    postAuctionItem = async (currentUser, auctionParams) => {

        try {
            const momentTime = moment();
            const convertedTime = momentTime.tz('America/Toronto');

            // retrieve user email
            const sellerContact = currentUser.get('email');//await user.retrieveEmail();
            //console.log(sellerContact);

            // from 0 to 3, search params / tags
            //console.log(auctionParams);

            // from 4 to 10, item details / listingItem table
            const itemInformation = auctionParams.slice(4);

            console.log(itemInformation);

            //images/Array 
            const itemImages = itemInformation.filter(el => el['sellPictures']);

            //condition 
            const itemCondition = itemInformation.filter(el => el['disc'])[0];
            const itemExtrasDescription = itemInformation.filter(el => el['extrasDescription'])[0];
            const itemExtrasCondition = itemInformation.filter(el => el['extras'])[0];
            const itemBoxCondition = itemInformation.filter(el => el['box'])[0];
            const itemInstructionsCondition = itemInformation.filter(el => el['instructions'])[0];

            //auction
            const name = itemInformation.filter(el => el['auctionName'])[0];
            const itemReserve = itemInformation.filter(el => el['auctionReserveValue'])[0];
            const itemStartingPrice = itemInformation.filter(el => el['auctionStartingPrice'])[0];
            const itemAuctionReturnPolicy = itemInformation.filter(el => el['auctionReturnPolicy'])[0];
            const itemAuctionStyle = itemInformation.filter(el => el['auctionStyle'])[0];
            const itemAuctionLength = itemInformation.filter(el => el['auctionLength'])[0];
            //const itemAuctionMinimumPrice = itemInformation.filter(el => el['auctionMinimumPrice'])[0];

            const parseImageFiles = [];
            const parseImageFile = new Parse.File(itemImages[0].sellPictures.name, itemImages[0].sellPictures);
            parseImageFiles.push(parseImageFile);

            this.setPictures(parseImageFiles);

            this.setName(name.auctionName);
            this.setReserve(parseFloat(itemReserve.auctionReserveValue));
            this.setStartingBid(parseFloat(itemStartingPrice.auctionStartingPrice));
            this.setStartDate(convertedTime._d);
            this.setReturnPolicy(itemAuctionReturnPolicy.auctionReturnPolicy);
            this.setAuctionStyle(parseInt(itemAuctionStyle.auctionStyle, 10));
            this.setAuctionLength(parseInt(itemAuctionLength.auctionLength, 10));

            //HERE
            //this.setMinimumBidPrice(parseFloat(itemAuctionMinimumPrice.auctionMinimumPrice));

            if (itemExtrasDescription && (itemExtrasDescription !== undefined))
                this.setExtrasDescription(itemExtrasDescription.extrasDescription);

            if (itemExtrasCondition && (itemExtrasCondition !== undefined))
                this.setExtrasCondition(itemExtrasCondition.extras);

            if (itemBoxCondition && (itemBoxCondition !== undefined))
                this.setBoxCondition(itemBoxCondition.box);

            if (itemInstructionsCondition && (itemInstructionsCondition !== undefined))
                this.setInstructionsCondition(itemInstructionsCondition.instructions);

            if (itemCondition && (itemCondition !== undefined))
                this.setItemCondition(itemCondition.disc);

            this.setSellerContact(sellerContact);
            this.setParent(currentUser);

            const item = await this.save();

            //* creates a new auction for this item
            const Auction = Parse.Object.extend('Auction');
            const myNewObject = new Auction();

            myNewObject.set('auctionItem', item);
            myNewObject.save();
            ///////////////////////////////////////

        } catch (err) {
            console.log(err);
        }
    }

}

Parse.Object.registerSubclass('AuctionItem', AuctionItem);

export default AuctionItem;