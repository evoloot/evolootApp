import { Utils } from "../utils/utils";
export class WindowBase extends Phaser.Sprite {
    constructor(game, x, y, width, height) {
        super(game, x, y);
        this.initialize(x, y, width, height);
    }
    initialize(x, y, width, height) {
        this._text = this.game.add.text(0, 0, '', this.createTextStyle());
        this._background = this.game.add.sprite(0, 0, "window");
        this._isTouched = false;
        this._isInsideFrame = false;
        this._updateChildren = true;
        this.inputEnabled = true;
        this.addChild(this._background);
        this.addChild(this._text);
        this.setWidth(width);
        this.setHeight(height);
    }
    adjustBackgroundProportions() {
        const { width, height } = this._background;
        this._background.scale =
            new Phaser.Point(this._width / width, this._height / height);
    }
    update() {
        super.update();
        this.processTouch();
        this.processChildrenUpdates();
    }
    processTouch() {
        this.events.onInputDown.add((gameObject, pointer) => {
            this._isTouched = true;
        });
        this.events.onInputOut.add((gameObject, pointer) => {
            this._isTouched = false;
        });
        this.events.onInputOver.add((gameObject, pointer) => {
            this._isInsideFrame = true;
        });
        this.events.onInputOut.add((gameObject, pointer) => {
            this._isInsideFrame = false;
        });
    }
    processChildrenUpdates() {
        if (this._updateChildren === true) {
            this.children.forEach(child => {
                if (Utils.exists(child['update'])) {
                    child['update']();
                }
            });
        }
    }
    createTextStyle() {
        return {};
    }
    standardFontSize() {
        return this._fontSize;
    }
    standardPadding() {
        return this._padding;
    }
    standardOpacity() {
        return this._opacity;
    }
    hide() {
        this.setOpacity(0);
    }
    show() {
        this.setOpacity(1);
    }
    resetFontSettings() {
    }
    isAlive() {
        return this.alive;
    }
    isInsideFrame() {
        return this._isInsideFrame;
    }
    isTouched() {
        return this._isTouched;
    }
    isInputEnabled() {
        return this.inputEnabled;
    }
    getText() {
        return this._text;
    }
    getBody() {
        return this.body;
    }
    getTexture() {
        return this.texture;
    }
    getSmoothed() {
        return this.smoothed;
    }
    enableInput(enable) {
        this.inputEnabled = enable;
    }
    setText(text) {
        this._text = text;
    }
    setWordWrap(wordWrap) {
        this._text.wordWrap = wordWrap;
    }
    setWordWrapWidth(width) {
        this._text.wordWrapWidth = width;
    }
    setTextString(text, immediate) {
        this._text.setText(text, immediate);
    }
    setPosition(x, y) {
        if (Utils.exists(x)) {
            this.x = x;
        }
        if (Utils.exists(y)) {
            this.y = y;
        }
    }
    setWidth(width) {
        this._width = width;
        this.width = this._width;
        this._background.width = this._width;
    }
    setHeight(height) {
        this._height = height;
        this.height = this._height;
        this._background.height = this._height;
    }
    setFontSize(fontSize) {
        this._fontSize = fontSize;
    }
    setPadding(padding) {
        this._padding = padding;
    }
    setAngle(angle) {
        return this.angle = angle;
    }
    setOpacity(opacity) {
        this._opacity = opacity;
        this.alpha = this._opacity;
    }
    setSmoothed(smooth) {
        this.smoothed = smooth;
    }
}
