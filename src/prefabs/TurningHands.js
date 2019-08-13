/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Creates hands to turn an object.
 * @class TurningHands
 * @extends {Phaser.Sprite}
 */
export class TurningHands extends Phaser.Sprite {
    constructor(game, side, x, y, keyboard = null) {
        //, x, y,
        super(game, x, y, 'cc_panel_hands');
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
        this.game.add.existing(this);
        this.keyboard = keyboard;
        this.animations.add('defaultLeft', [0], 1, false);
        this.animations.add('defaultRight', [1], 1, false);
        this.animations.add('pressedLeft', [2], 1, false);
        this.animations.add('pressedRight', [3], 1, false);
        this.side = side;
        this.animations.play(`default${this.side}`);
        this.clickListeners();
        this.keyListeners();
    }

    /**
     * On click, plays 'pressed' animation, on release, 'default' animation.
     * - plays 'default' animation by default.
     */
    clickListeners() {
        this.events.onInputDown.add(() => {
            this.animations.play(`pressed${this.side}`);
        }, this);
        this.events.onInputUp.add(() => this.animations.play(`default${this.side}`), this);
    }

    /**
     * On a key pressed, a hand will play its respectively pressed animation, on release, 'default' animation.
     * - plays 'default' animation by default.
     */
    keyListeners() {
        if (this.keyboard) {
            if (this.side === 'Right') {
                this.keyboard.setKeyOnDown('R', () => {
                    this.animations.play('pressedRight');
                });
                this.keyboard.setKeyOnUp('R', () => {
                    this.animations.play('defaultRight');
                });
            }
            if (this.side === 'Left') {
                this.keyboard.setKeyOnDown('L', () => {
                    this.animations.play('pressedLeft');
                });
                this.keyboard.setKeyOnUp('L', () => {
                    this.animations.play('defaultLeft');
                });
            }
        }
    }

    /**
     * Plays 'pressed right' animation.
     */
    playRight() {
        this.animations.play('pressedRight');
    }

    /**
     * Plays 'pressed left' animation.
     */
    playLeft() {
        this.animations.play('pressedLeft');
    }

    /**
     * Plays 'default right' animation.
     */
    playDefaultRight() {
        this.animations.play('defaultRight');
    }

    /**
     * Plays 'default left' animation.
     */
    playDefaultLeft() {
        this.animations.play('defaultLeft');
    }
}
