import * as R from 'ramda';
export const Utils = {
    VERSION: '0.1.0',
    isDebug: true,
    /**
     * Initializes and sets up the utils in the specified mode.
     */
    initialize() {
        this.updateDebugMode();
    },
    /**
     * Checks if the element exists, otherwise returns false.
     * @param {*} element
     * @returns {boolean}
     */
    exists(element) {
        return element !== undefined ? true : element !== null ? true : false;
    },
    absDifference(x, y) {
        return Math.abs(x - y);
    },
    /**
     * Appends the object to the global window context.
     * @param {*} globalContext
     * @param {string} name
     * @param {*} entity
     */
    appendGlobally(globalContext, name, entity) {
        globalContext[name] = entity;
    },
    /**
     * Logs information to the console if the application is in debug mode.
     * @param {*} args
     */
    log(...args) {
        //@ts-ignore
        R.curry(console.log.bind(window.console));
    },
    /**
     * Sends an error to the console if the application is in debug mode.
     *
     */
    error(...args) {
    },
    /**
     * Sends a warning to the console if the application is in debug mode.
     *
     */
    warn(...args) {
    },
    /**
     * Sets the debug mode on or off.
     * @param {boolean} value
     */
    setDebug(value) {
        this.isDebug = value;
        this.updateDebugMode();
    },
    /**
     * Updates the debug mode functions based on if debug is set to true or false.
     *
     */
    updateDebugMode() {
        if (this.isDebug === true) {
            this.log = console.log.bind(console);
            this.error = console.error.bind(console);
            this.warn = console.warn.bind(console);
        }
        else {
            this.log = R.identity(undefined);
            this.error = R.identity(undefined);
            this.warn = R.identity(undefined);
        }
    },
    exposeObject(key, object) {
        if (this.isDebug === true) {
            window[key] = object;
        }
    }
};
