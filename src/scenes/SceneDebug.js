/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import { AudioManager } from "../managers/AudioManager";
import { WindowManager } from "../managers/WindowManager";
export class SceneDebug extends Phaser.State {
    constructor() {
        super();
    }
    preload() {
        this.addTestSound();
    }
    create() {
        this.game.sound.mute = false;
        this.testSound();
        this.createTestWindow();
    }
    addTestSound() {
        AudioManager.load('backgroundMusic', ['./assets/music/music.mp3']);
    }
    testSound() {
        AudioManager.add('backgroundMusic');
        AudioManager.play('backgroundMusic');
        setTimeout(() => {
            AudioManager.playCopy('backgroundMusic');
            console.log("playing copy");
        }, 6000);
    }
    createTestWindow() {
        const gameWindow = WindowManager.createWindow("base", 100, 100, 60, 25);
        this.game.add.existing(gameWindow);
        gameWindow.setTextString("Hello World!");
        gameWindow.events.onInputDown.add(() => {
            console.log("I've been clicked");
        }, this);
        setTimeout(() => {
            gameWindow.hide();
        }, 3000);
        setTimeout(() => {
            gameWindow.show();
        }, 5000);
    }
    update() {
    }
    shutdown() {
    }
}
