import { WindowBase } from '../windows/WindowBase';
/**
 * Phaser plugin to allow developers to create windows in-game through
 * an easy to use set of functions.
 * @export
 * @class WindowManager
 */
export class WindowManager {
    constructor() {
        throw new Error("This is a static class");
    }
    static initialize(game) {
        this.game = game;
    }
    static createWindow(type, x, y, width, height) {
        console.log("Window Created");
        return new WindowBase(this.game, x, y, width, height);
    }
}
