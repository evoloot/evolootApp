import * as Parse from 'parse';

/**
 * Parse 
 * @author Kino A. Rose, Victor V. Piccoli
 */

export const isValidEmail = (email) => /\w+@\w+\.\w{2,}/ig.test(email);

/**
 * Signs up a user within parse, and sends out an authentication email.
 * Returns a promise, with a user object.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Parse.User>}
 */
export const signUpUser = (username, email, password) => {
    return Parse.User.signUp(username, password, {
        email: email
    })
}

/**
 * Sign in a user using the parse back end, given the user's
 *  username and email. 
 *  Returns a promise with a user object.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Parse.User>}
 */
export const signIn = (username, password) => {
    return Parse.User.logIn(username, password);
};

/**
 * Signs is a user, using the Facebook login system, given
 * their linked account.
 * @returns {Promise<Parse.User>}
 */
export const signInWithFacebook = () => {
    //@ts-ignore
    return Parse.FacebookUtils.logIn("email");
};

/**
 * Sends out a password reset email, given a valid email
 *  address.
 * @param {string} email
 * @returns {Promise<Parse.User>}
 */
export const resetPassword = (email) => {
    return Parse.User.requestPasswordReset(email);
};

/**
 * Returns the current logged in user on the client side.
 * @returns {Parse.User}
 */
export const currentUser = () => Parse.User.current();

/**
 * Signs out the current active user.
 */
export const signOut = () => Parse.User.logOut();
