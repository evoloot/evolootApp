/**
 * AudioManager class that consumes the Phaser.Game object.
 * Handles playing, loading, and stopping audio using key names.
 * Keeps track of all Audio added to the game.
 * @class AudioManager
 */
export class AudioManager {
    constructor() {
        throw new Error("This is a static class");
    }
    static initialize(game) {
        this.game = game;
        this.audioCache = {};
        this.audioCacheSize = 0;
    }
    static load(key, audioSources, autoDecode) {
        this.game.load.audio(key, audioSources, autoDecode);
    }
    /**
     * Adds the audio file to the audio cache with the specified key.
     * Returns the Phaser.Sound object to work with.
     * @static
     * @param {string} key
     * @param {number} [volume]
     * @param {boolean} [loop]
     * @returns {Phaser.Sound}
     * @memberof AudioManager
     */
    static add(key, volume, loop) {
        const audio = this.game.add.audio(key, volume, loop);
        this.audioCache[key] = audio;
        this.audioCacheSize += 1;
        return audio;
    }
    /**
     * Plays the audio file registered in the audio cache with the specified key.
     * Returns the Phaser.Sound object to work with.
     * @static
     * @param {string} key
     * @param {number} [position]
     * @param {number} [volume]
     * @param {boolean} [loop]
     * @param {boolean} [forceRestart=false]
     * @returns {Phaser.Sound}
     * @memberof AudioManager
     */
    static play(key, position, volume, loop, forceRestart = false) {
        const audio = this.audioCache[key];
        return audio.play("", position, volume, loop, forceRestart);
    }
    static playCopy(key, volume, loop) {
        return this.game.sound.play(key, volume, loop);
    }
    /**
     * Stops the audio file from playing that matches the registered key.
     * @static
     * @param {string} key
     * @memberof AudioManager
     */
    static stop(key) {
        const audio = this.audioCache[key];
        audio.stop();
    }
    static muteSound(mute) {
        this.game.sound.mute = mute;
    }
    static removeAudioFromCache(key) {
        delete this.audioCache[key];
        this.audioCacheSize -= 1;
    }
}
