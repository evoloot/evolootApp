import * as Parse from 'parse';
import * as R from 'ramda';

/* Manage Parse Queries */

/* Parse Post Queries */
/**
 * Turns an object into a parse object given some information and the class name.
 * @param className {string}
 * @param object {any}
 * @returns {Parse.Object}
 */
export const objectPropToPobject = (className, object) => {
  const parseClass = Parse.Object.extend(className)
  const instance = new parseClass();

  Object
  .entries(object)
  .forEach((value) => {
    const [key, val] = value;
    instance.set(key, val);
  })
  return instance;
};
/**
 * Turns an object with customer information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postCustomer = (customerInfo) => {
  const customer = objectPropToPobject("Customer", customerInfo);
  customer.save()
};

/**
 * Turns an object with user profile information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postUserProfile = (userProfileInfo) => {
  const userProfile = objectPropToPobject("UserProfile", userProfileInfo)
  userProfile.save()
};

/**
 * Turns an object with seller profile information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postSellerProfile = (sellerProfileInfo) => {
  const sellerProfile = objectPropToPobject("SellerProfile", sellerProfileInfo)
  sellerProfile.save()
};

/**
 * Turns an object with character information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postCharacterInformation = (characterInfo) => {
  const character = objectPropToPobject("Character", characterInfo)
  character.save()
};

/**
 * Turns an object with auction item information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postAuctionItem = (auctionItemInfo) => {
  const auctionItem = objectPropToPobject("AuctionItem", auctionItemInfo)
  auctionItem.save()
};

/**
 * Turns an object with auction listing information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postAuctionListing = (auctionListingInfo) => {
  const auctionListing = objectPropToPobject("AuctionListing", auctionListingInfo)
  auctionListing.save()
};

/**
 * Turns an object with auction log information into a parse object then
 * saves it.
 * @returns {Promise<Parse.Object>}
 */
export const postAuctionLog = (auctionLogInfo) => {
  const auctionLog = objectPropToPobject("AuctionLog", auctionLogInfo)
  auctionLog.save()
};

/**
 * Creates a parse query for querying an object of the specified class name.
 * @param {string} className 
 * @returns {Parse.Query}
 */
export const createQuery = (className) => {
  const parseClass = Parse.Object.extend(className);
  return new Parse.Query(parseClass);
}

/**
 * Returns all available tags in the database "Tags" collection.
 * @returns {Promise<Array<Parse.Object>>}
 */
export const getAllAvailableTags = () => {
   const query = createQuery("Tags")
   //Create query  constraints
   query.equalTo("available", true)
   return query.find()
};


export const addParseObjectToRelation = R.curry((pObject, relationName, parseObject) => {
  const relation = pObject.relation(relationName)
  relation.add(parseObject)
  return pObject;
});

/* Get Parse Queries */
export const getAuctionItemsAssociatedWithTag = (tag) => {
  const relation = tag.relation("auctionItems");
  const query = relation.query();
  return query.find();
};

export const getPostItemsAssociatedWithTag = (tag) => {
  const relation = tag.relation("postItems");
  const query = relation.query();
  return query.find();
};

/**
 * Returns the character information via the parse information. 
 * @param {Parse.Object} user 
 * @returns {Promise<Array<Parse.Object>>}
 */
export const getCharacterByUser = (user) => {
  const query = createQuery("Character")
  query.equalTo("user", user.id)
  // In this case, given that "parent" is the same as user on the back end database,
  // We could use query.equalTo("parent", user.id) instead.
  return query.find()
};

/**  
 * Returns the parse daily object by passing in a user.
* In most cases, use the current user.
* @returns {Promise<Parse.Object>}
*/
export const getDailiesByUser =(user) => {
   const query = createQuery("UserDailies")
   query.equalTo("user", user.id)
   return query.first();
}

/**
 * Get the milestone information given a user parse object.
 * @param {Parse.Object} user 
 * @returns {Promise<Parse.Object>}
 */
export const getMileStonesByUser = (user) => {
   const query = createQuery("UserMilestones")
   query.equalTo("user", user.id)
   return query.first()
};

/**
 * Returns the available posts.
 * This returns as a promise since it's an asynchronous call.
 * @returns {Promise<Array<Parse.Object>>}
 */
export const getAllAvailablePosts = () => {
  const query = createQuery("Post")
  query.equalTo("available", true)
  return query.find()
};

/**
 * Returns the answers associated with the post.
 * This returns as a promise since it's an asynchronous call.
 * @param {Parse.Object} post
 * @returns {Promise<Array<Parse.Object>>}
 */
export const getAnswersAssociatedWithPost = (post) => {
  const query = createQuery("Answers")
  query.equalTo("post", post.id)
  return query.find()
};

/**
 * Returns the user profile for the user using the user's object.
 * This returns as a promise since it's an asynchronous call.
 * @param {Parse.User} user 
 * @returns {Promise<Parse.Object>}
 */
export const getSellerProfileByUser = (user) => {
  const query = createQuery("SellerProfile")
  query.equalTo("sellerUser", user.id)
  return query.first()
}
/**
 * Returns the user profile for the user using the user's object.
 * This returns as a promise since it's an asynchronous call.
 * @param {Parse.User} user
 * @returns {Promise<Parse.Object>} 
 */
export const getUserProfileByUser = (user) => {
  const query = createQuery("UserMilestones")
  query.equalTo("user", user.id)
  return query.first()
};
/**
 * Returns the customer information for the user using the user's object.
 * This returns as a promise since it's an asynchronous call.
 * @param {Parse.User} user 
 * @returns {Promise<Parse.Object>}
 */
export const getCustomerByUser = (user) => {
   const query = createQuery("Customer")
   query.equal("user", user.id)
   return query.first()
};


