import { Utils } from '../utils/utils';
/**
 * SceneManager class for managing moving between game scenes.
 * Preserves the order of scenes when transitioning between scenes.
 * @author Kino A. Rose
 * @class SceneManager
 */
export class SceneManager {
    constructor() {
        throw new Error("This is a static class.");
    }
    static initialize(game) {
        this.game = game;
    }
    static clear() {
        this._currentScene = null;
        this._previousScene = null;
        this._sceneStack = [];
    }
    /**
     * Adds a new scene to the scene stack. Starts the new scene.
     * @static
     * @param {string} sceneName
     * @memberof SceneManager
     */
    static push(sceneName) {
        const scene = this.game.state.states[sceneName];
        this._sceneStack.push(scene);
        this.game.state.start(sceneName);
    }
    /**
     * Removes a scene from the scene stack, and starts the
     * previous scene.
     * @static
     * @memberof SceneManager
     */
    static pop() {
        const scene = this._sceneStack.pop();
        if (Utils.exists(scene))
            this.game.state.start(scene.key);
        else
            Utils.error("Popping empty scene stack");
    }
    /**
     * Returns the scene at the top of the scene stack.
     * @static
     * @returns {Phaser.State}
     * @memberof SceneManager
     */
    static top() {
        return this._sceneStack[this.sceneStack.length - 1];
    }
    static sceneStack() {
        return this._sceneStack;
    }
    /**
     * Immediately goes to a scene, ignoring the scene stack.
     * This becomes the current scene. The previous scene can
     * be accessed from the previous scene method.
     * @static
     * @param {string} sceneName
     * @memberof SceneManager
     */
    static goto(sceneName) {
        this._previousScene = this.game.state.getCurrentState();
        const scene = this.game.state.states[sceneName];
        this._currentScene = scene;
        this.game.state.start(sceneName);
    }
    /**
     * Returns the current scene accessed through the goto method.
     * @static
     * @returns {Phaser.State}
     * @memberof SceneManager
     */
    static currentScene() {
        return this._currentScene;
    }
    /**
     * Returns the previous scene after a goto method was called.
     * @static
     * @returns {Phaser.State}
     * @memberof SceneManager
     */
    static previousScene() {
        return this._previousScene;
    }
}
