/* eslint-disable */
import { Building } from "../prefabs/Building";

//////////////////////////////////////////////////////////////////////////////
/**
 * @by: Evoloot Enterprises Inc.
 * @author: Victor V. Piccoli
 * @doc: Generic global utility.
*/
////////////////////////////////////////////////////////////////////////
export class Helper {

    /**
     * Reorder character pieces and enviroment to its visual optimal z-index
     * @param {Phaser.Game} game Phaser.Game.
     * @param {object} character Character's assembled Pieces object.
     * @param {Array<Phaser.Sprite>} scenarioModifier Scenario variants which interfers the z-index of the character.
     */
    static shuffleCharacter(game, character, scenarioModifier = null, frontDecoration = null) {
        const sorting = game.add.group();
        let pieceSide;
        let hand = null;

        if (character) {
            if (character.weapon && character.weapon.frameName) {
                hand = character.weapon.frameName.split('_')[6];

                if (character.body.animations.name === 'defaultRight' || character.body.animations.name === 'right') {
                    pieceSide = 'right';
                }
                else if (character.body.animations.name === 'defaultLeft' || character.body.animations.name === 'left') {
                    pieceSide = 'left';
                }

                // In case the user is lefthanded and is turned to the right OR
                // user is righthanded and is turned to the left, weapon goes to top(lowest value) of the z-index.
                if ((hand === 'LeftHanded2.png' && pieceSide === 'right') || (hand === 'RightHanded2.png' && pieceSide === 'left')) {
                    sorting.addChild(character.weapon);
                    this.addZIndexChildren(sorting, character);
                }
                // In case the user is lefthanded and is not turned to the right OR
                // user is righthanded and is not turned to the left, weapon goes to bottom(highest value) of the z-index.
                else if ((hand === 'LeftHanded2.png' && pieceSide != 'right') || (hand === 'RightHanded2.png' && pieceSide != 'left')) {
                    this.addZIndexChildren(sorting, character);
                    sorting.addChild(character.weapon);
                }
            } else {
                this.addZIndexChildren(sorting, character);
            }
        }

        this.addZIndexEnviroment(sorting, scenarioModifier, frontDecoration);
    }

    /**
     * Adds enviroment above everything displaying.
     * @param {Phaser.Group} sortGroupName Array like group keeping all Pieces.
     * @param {Array<Phaser.Sprite>} scenarioModifier a layer.
     * @param {Array<Building>} frontDecoration Array of Buildings.
     */
    static addZIndexEnviroment(sortGroupName, scenarioModifier = null, frontDecoration = null) {
        // decoration in front of character
        // add multiple
        if (frontDecoration) {
            sortGroupName.addMultiple(frontDecoration);
        }

        if (scenarioModifier) {
            scenarioModifier.forEach(scenarioElement => {
                if (scenarioElement)
                    sortGroupName.addChild(scenarioElement);
            });
        }
    }

    /**
     * Sort character Pieces into the correct z-index order.
     * - From top to bottom, the top is the lowest z-index, meaning that the body appears behind every other Piece.
     * @param {Phaser.Group} sortGroupName Array like group keeping all Pieces.
     * @param {object} child Character's assembled Pieces object.
     */
    static addZIndexChildren(sortGroupName, child) {
        if (child.body) sortGroupName.addChild(child.body);
        if (child.eyecolour) sortGroupName.addChild(child.eyecolour);
        if (child.facewear) sortGroupName.addChild(child.facewear);
        if (child.footwear) sortGroupName.addChild(child.footwear);
        if (child.lowerbody) sortGroupName.addChild(child.lowerbody);
        if (child.upperbody) sortGroupName.addChild(child.upperbody);
        if (child.hands) sortGroupName.addChild(child.hands);
        if (child.facialhair) sortGroupName.addChild(child.facialhair);
        if (child.hairstyle) sortGroupName.addChild(child.hairstyle);
        if (child.headwear) sortGroupName.addChild(child.headwear);
    }

    /**
     * Searches for spritesheet key into the given character assets key list.
     * - If searching for a body, only 'gender' and 'size' must be supplied.
     * - If searching for a weapon, a 'side' must be supplied.
     * - Deprecated
     * @param {Array<any>} characterPieces assets' keys list.
     * @param {string} size first part of the key.
     * @param {string} gender second part of the key.
     * @param {string} scenario third part of the key.
     * @param {string} type fourth part of the key.
     * @param {string} category fifth part of the key.
     * @param {string} side sixth part of the key.
     * @param {string} hand seventh part of the key.
     * @return Object containing the necessary information for loading the specific spritesheet.
     */
    static pieceKeyFinder(characterPieces, size, gender, scenario, type, category, side, hand = null) {
        let pieceInformation = [size, gender, scenario, type, category, side];

        if (hand) pieceInformation.push(hand);

        let pieceKey = characterPieces[pieceInformation.join('_')];

        if (pieceKey) return pieceKey;
        else return -1;
    }

    /**
     * Load a character piece to the Phaser.Cache.
     * - Deprecated
     * @param {Phaser.Game} game Phaser.Game.
     * @param {Array<any>} characterList assets' keys list.
     * @param {string} key key to be searched within the given list.
     * @param {function} callbackFunction callback function to execute once key is found and loaded to cache.
     */
    static pieceCacheLoader(game, characterList, key, callbackFunction = null) {
        const keyArr = key.split('_');
        let piece;
        if (keyArr[6])
            piece = this.pieceKeyFinder(characterList, keyArr[0], keyArr[1], keyArr[2], keyArr[3], keyArr[4], keyArr[5], keyArr[6]);
        else
            piece = this.pieceKeyFinder(characterList, keyArr[0], keyArr[1], keyArr[2], keyArr[3], keyArr[4], keyArr[5]);

        if (piece) {
            if (callbackFunction) {
                const loader = new Phaser.Loader(game);
                loader.spritesheet(`${piece.key}`, `./assets/images/${piece.size}/${piece.key}.png`, piece.width, piece.height, piece.frames, piece.margin, piece.space);
                loader.onLoadComplete.addOnce(() => {
                    callbackFunction();
                });
                loader.start();

            }
            else
                game.load.spritesheet(`${piece.key}`, `./assets/images/${piece.size}/${piece.key}.png`, piece.width, piece.height, piece.frames, piece.margin, piece.space);
        }
        else
            console.log('this image does not exist');
    }

    /**
     * Sets the current active build locations.
     * - Only one at time is "active".
     * @param {Object} location object holdings the 'center' of the building's entrace and the scene it directs to.
     */
    static setBuildLocation(location = null) {
        this.buildLocation = location;
    }

    /**
     * Sets SceneMap popup context, which are: the text content and the scene to switch to.
     * @param {string} scene key name of which scene to switch to.
     */
    static sceneMapPopupSetter(scene) {
        let text;

        const warning = document.getElementById('warning');
        const arena = document.getElementById('arena');

        switch (scene) {
            case ('SceneAuction'):
                arena.style.display = 'block';
                break;
            default:
                warning.style.display = 'block';

        }

        this.buildLocation = null;
    }

    /**
     * Calculates remaining time difference, subtracting the
     * 'startDate' from the 'length'.
     * @param {number} startDate the start date to count from. 
     * @param {number} length the length(in days).
     * @returns object containing: day(s), hour(s) and minute(s) remaining.
     */
    static calculateRemainingTime = (startDate, length) => {

        const actualDate = new Date();
        const timeLeft = Math.abs(actualDate - startDate);
        const fullDay = 24 * 60 * 60 * 1000; // in milliseconds
        const fullHour = 60 * 60 * 1000; // in milliseconds

        let days = Math.floor(timeLeft / fullDay);
        let hours = Math.floor((timeLeft - days * fullDay) / fullHour);
        let minutes = Math.round((timeLeft - days * fullDay - hours * fullHour) / 60000);

        days = Math.floor((length * fullDay - timeLeft) / fullDay);
        hours = 24 - hours;
        minutes = 60 - minutes;

        if (minutes === 60) {
            hours++;
            minutes = 0;
        }
        if (hours === 24) {
            days++;
            hours = 0;
        }

        if (days < 0)
            return 'expired';
        else
            return {
                days,
                hours,
                minutes
            }
    }

    /**
     * Adjust a number to a decimal look,
     * good for using in "clocks"
     * eg.: '7' will be turned into '07'
     * @param {number} number 
     * @returns string
     */
    static updateTime(number) {
        return number < 10 ? '0' + number : number;
    }

    /**
     * Executes a given callback function each second(1000ms)
     * @param {function} callback 
     * @returns a function
     */
    static regressiveTimer(callback) {
        callback();

        this.timeout = window.setTimeout(() => {
            this.regressiveTimer(callback);
        }, 1000);
    }

    /**
     * Clears 'window.setTimeout()'.
     * - Use it to stop 'regressiveTimer()'
     */
    static stopRegressiveTimer() {
        console.log('cleared');
        window.clearTimeout(this.timeout);
    }
}
