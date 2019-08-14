import {ITableAction, IGameAction, IFinalExp} from "./interfaces";
import {EXPTABLE} from "./table";
import {LEVELREQUIREMENTSTABLE} from "./level";
import * as Parse from 'parse';
import * as R from 'ramda';
import {PObject, PQuery} from "../parse/baas";
import * as Phaser from "phaser-ce";

const createExpFromAction = ({type, modifier}:IGameAction) => {
  return EXPTABLE[type] * modifier;
}

/**
 * Standardizes the exp action to a lowercase form for easier
 *  processing.
 * @param {IGameAction} {type, modifier}
 * @returns {IGameAction}
 */
export const standardizeExpType = ({type, modifier}:IGameAction) => {
  return {type:type.toLocaleLowerCase(), modifier}
};

const createFinalExp = (amount:number) => {
  return {expAmount:amount} as IFinalExp
}

/**
 * Returns the calculated level compared to the level requirements table.
 * @param {number} expAmount
 * @returns {number} level
 */
const calculateLevel = (expAmount:number) => {
  const level = LEVELREQUIREMENTSTABLE.findIndex(value => expAmount < value)
  return level == -1 ? 1 : level;
}

/**
 * Simply adds a logger to the process of calculating experience.
 * @param {*} value
 * @returns {*} value
 */
const logger = (value) => {
  console.log(value);
  return value;
}

/**
 * Calculates the exp actions into a minified number form then outputs
 *  the amount.
 * @param {Array<IGameAction>} actions
 * @returns {number}
 */
export const outputExpAmount = (actions:Array<IGameAction>) => {
  return logger(
    actions.map(standardizeExpType).reduce((prev, current) => {
      return prev + createExpFromAction(current);
    }, 0)
  )
}

/**
 * Wires up the player object with the two signals for distributing
 *  and converting exp so that we can store it in the database.
 * @param {*} player
 */
export function addExpSignals(player) {
  player.expSignal = new Phaser.Signal()
  player.expStack = [] as Array<IGameAction>;
  player.convertExpSignal = new Phaser.Signal();

  const expSignal:Phaser.Signal = player.expSignal;
  const convertExpSignal:Phaser.Signal = player.convertExpSignal;
  expSignal.add(handleExpAction, player, 0, player.expStack);
  convertExpSignal.add(handleExpConversion, player, 0, player.expStack);
}


/**
 * Handles experience actions by pushing them onto the player exp stack.
 * @export
 * @param {IGameAction} {type, modifier}
 * @param {Array<IGameAction>} expStack
 */
export function handleExpAction ({type, modifier}:IGameAction, expStack:Array<IGameAction>) {
  expStack.push(standardizeExpType({type, modifier}))
}

/**
 * Handles player experience by converting it into experience points.
 * @export
 * @param {Array<IGameAction>} expStack
 */
export function handleExpConversion (expStack:Array<IGameAction>) {
  const exp = outputExpAmount(expStack);
  const playerLevel = calculateLevel(exp)
  //Send information to the server
  sendServerData(expStack, exp, playerLevel)
}

export function sendServerData(actionStack:Array<IGameAction>, experience:number, currentLevel:number) {
  console.log("Data being sent to server...");
  console.log(actionStack, experience);

}


const test = [
  {type:"post", modifier: 1.0}
]

outputExpAmount(test);