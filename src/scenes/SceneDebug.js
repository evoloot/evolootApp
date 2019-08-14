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
