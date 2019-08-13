/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

/**
 * Game configuration file for Phaser, to setup game and scenes.
 * @author Kino A. Rose, Victor V. Piccoli
 */
export const gameConfig = parentComponent => {
    return {
        parent: parentComponent,
        width: 1600,
        height: 896,
        renderer: Phaser.Canvas
    }
};
