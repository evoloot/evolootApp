/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Creates a Phaser keyboard.
 * @class Keyboard
 * @extends {Phaser.Keyboard}
 */
export class Keyboard extends Phaser.Keyboard {
    constructor(game) {
        super(game);
        this.arrows = this.createCursorKeys();
        this.keys = new Map();
        this.keys.set('A', this.addKey(Phaser.Keyboard.A));
        this.keys.set('B', this.addKey(Phaser.Keyboard.B));
        this.keys.set('C', this.addKey(Phaser.Keyboard.C));
        this.keys.set('D', this.addKey(Phaser.Keyboard.D));
        this.keys.set('E', this.addKey(Phaser.Keyboard.E));
        this.keys.set('F', this.addKey(Phaser.Keyboard.F));
        this.keys.set('G', this.addKey(Phaser.Keyboard.G));
        this.keys.set('H', this.addKey(Phaser.Keyboard.H));
        this.keys.set('I', this.addKey(Phaser.Keyboard.I));
        this.keys.set('J', this.addKey(Phaser.Keyboard.J));
        this.keys.set('K', this.addKey(Phaser.Keyboard.K));
        this.keys.set('L', this.addKey(Phaser.Keyboard.L));
        this.keys.set('M', this.addKey(Phaser.Keyboard.M));
        this.keys.set('N', this.addKey(Phaser.Keyboard.N));
        this.keys.set('O', this.addKey(Phaser.Keyboard.O));
        this.keys.set('P', this.addKey(Phaser.Keyboard.P));
        this.keys.set('Q', this.addKey(Phaser.Keyboard.Q));
        this.keys.set('R', this.addKey(Phaser.Keyboard.R));
        this.keys.set('S', this.addKey(Phaser.Keyboard.S));
        this.keys.set('T', this.addKey(Phaser.Keyboard.T));
        this.keys.set('U', this.addKey(Phaser.Keyboard.U));
        this.keys.set('V', this.addKey(Phaser.Keyboard.V));
        this.keys.set('W', this.addKey(Phaser.Keyboard.W));
        this.keys.set('X', this.addKey(Phaser.Keyboard.X));
        this.keys.set('Y', this.addKey(Phaser.Keyboard.Y));
        this.keys.set('Z', this.addKey(Phaser.Keyboard.Z));
        this.keys.set('ENTER', this.addKey(Phaser.Keyboard.ENTER));
        this.keys.set('BACKSPACE', this.addKey(Phaser.Keyboard.BACKSPACE));
        this.keys.set('ESC', this.addKey(Phaser.Keyboard.ESC));
        console.log('Keyboard created');
        this.enableKeyboard();
    }
    /**
     * Set predefined functions for default keys.
     */
    setDefaultKeys() {
    }
    /**
     * Sets the specified key to trigger a function when pressed.
     * - A key can receive any number of additional functions.
     * @param key keyboard's key name(Phaser.Key).
     * @param callbackFunction custom callback function.
     */
    setKeyOnDown(key, callbackFunction) {
        this.keys.get(key).onDown.add(() => callbackFunction());
    }
    /**
     * Sets the specified key to trigger a function when is released.
     * - A key can receive any number of additional functions.
     * @param key keyboard's key name(Phaser.Key).
     * @param callbackFunction custom callback function.
     */
    setKeyOnUp(key, callbackFunction) {
        this.keys.get(key).onUp.add(() => callbackFunction());
    }
    /**
     * Resets all current functions given to a specific key.
     * @param key keyboard's key name(Phaser.Key).
     */
    resetKey(key) {
        this.keys.get(key).onDown.removeAll();
        this.keys.get(key).onUp.removeAll();
    }
    /**
     * Resets all current functions given to all keys.
     * @param exception exception key which will not reset.
     */
    resetAllKeys(exception = null) {
        this.keys.forEach(key => {
            if (key.keyCode != exception) {
                key.onDown.removeAll();
                key.onUp.removeAll();
            }
        });
    }
    /**
     * Updates keyboard listening
     */
    updateKeyboard() {
        this.update();
    }
    /**
     * Starts keyboard listening.
     */
    enableKeyboard() {
        this.start();
    }
    /**
     * Disables keyboard.
     * - It won't bring "normal" keys back to work.
     * - Use the '.destroyKeyboard()' method to release keyboard's keys from Phaser.
     */
    disableKeyboard() {
        console.log('phaser Keyboard disabled');
        this.stop();
    }
    destroyKeyboard() {
        this.destroy();
    }
}
