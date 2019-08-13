/* eslint-disable */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
const level_1 = require("./level");
const Phaser = require("phaser-ce");
const createExpFromAction = ({ type, modifier }) => {
    return table_1.EXPTABLE[type] * modifier;
};
/**
 * Standardizes the exp action to a lowercase form for easier
 *  processing.
 * @param {IGameAction} {type, modifier}
 * @returns {IGameAction}
 */
exports.standardizeExpType = ({ type, modifier }) => {
    return { type: type.toLocaleLowerCase(), modifier };
};
const createFinalExp = (amount) => {
    return { expAmount: amount };
};
/**
 * Returns the calculated level compared to the level requirements table.
 * @param {number} expAmount
 * @returns {number} level
 */
const calculateLevel = (expAmount) => {
    const level = level_1.LEVELREQUIREMENTSTABLE.findIndex(value => expAmount < value);
    return level == -1 ? 1 : level;
};
/**
 * Simply adds a logger to the process of calculating experience.
 * @param {*} value
 * @returns {*} value
 */
const logger = (value) => {
    console.log(value);
    return value;
};
/**
 * Calculates the exp actions into a minified number form then outputs
 *  the amount.
 * @param {Array<IGameAction>} actions
 * @returns {number}
 */
exports.outputExpAmount = (actions) => {
    return logger(actions.map(exports.standardizeExpType).reduce((prev, current) => {
        return prev + createExpFromAction(current);
    }, 0));
};
/**
 * Wires up the player object with the two signals for distributing
 *  and converting exp so that we can store it in the database.
 * @param {*} player
 */
function addExpSignals(player) {
    player.expSignal = new Phaser.Signal();
    player.expStack = [];
    player.convertExpSignal = new Phaser.Signal();
    const expSignal = player.expSignal;
    const convertExpSignal = player.convertExpSignal;
    expSignal.add(handleExpAction, player, 0, player.expStack);
    convertExpSignal.add(handleExpConversion, player, 0, player.expStack);
}
exports.addExpSignals = addExpSignals;
/**
 * Handles experience actions by pushing them onto the player exp stack.
 * @export
 * @param {IGameAction} {type, modifier}
 * @param {Array<IGameAction>} expStack
 */
function handleExpAction({ type, modifier }, expStack) {
    expStack.push(exports.standardizeExpType({ type, modifier }));
}
exports.handleExpAction = handleExpAction;
/**
 * Handles player experience by converting it into experience points.
 * @export
 * @param {Array<IGameAction>} expStack
 */
function handleExpConversion(expStack) {
    const exp = exports.outputExpAmount(expStack);
    const playerLevel = calculateLevel(exp);
    //Send information to the server
    sendServerData(expStack, exp, playerLevel);
}
exports.handleExpConversion = handleExpConversion;
function sendServerData(actionStack, experience, currentLevel) {
    console.log("Data being sent to server...");
    console.log(actionStack, experience);
}
exports.sendServerData = sendServerData;
const test = [
    { type: "post", modifier: 1.0 }
];
exports.outputExpAmount(test);
