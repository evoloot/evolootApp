/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Creates a button that displays a palette with colors to pick from.
 * @class ColorPalette
 * @extends {Phaser.Sprite}
 */
export class ColorPalette extends Phaser.Sprite {
    constructor(game, x, y, key = null) {
        //, x, y,
        if (key)
            super(game, x, y, key);
        else
            super(game, x, y, 'palette');
        this.swatchBMD = this.game.make.bitmapData();
        this.swatchBMD.load('colour_gradient_large');
        this.anchor.setTo(0, -0.25);
        this.inputEnabled = true;
        this.height = 40;
        this.width = 40;
        this.isDragging = false;
        this.isOnSwatch = false;
        this.colorWheelOpen = false;
        game.add.existing(this);
        this.animations.add('enabled', [0], 1, false);
        this.animations.add('disabled', [1], 1, false);
        this.animations.play('enabled');
        this.events.onInputDown.add(() => {
            this.animations.play('disabled');
        }, this);
    }
    /**
     * Listens for click events on the bitmapdata object(palette) and swatch the respective color.
     * @param pointer The current clicked point.
     * @param sprite The Phaser.BitmapData object.
     */
    startSwatch(sprite, pointer) {
        this.isOnSwatch = true;
        if (this.isOnSwatch) {
            const x = Math.floor(pointer.x - this.swatch.x); // important
            const y = Math.floor(pointer.y - this.swatch.y);
            const color = this.swatchBMD.getPixelRGB(x, y); //
            const selectedColor = Phaser.Color.RGBtoString(color.r, color.g, color.b, color.a, null);
            this.selectedTint = selectedColor;
            //console.log('inside color palette: ' + this.selectedTint);
        }
    }

    /**
     * Stops receiving events on the bitmapdata object(palette).
     */
    stopSwatch() {
        this.isOnSwatch = false;
        this.closeColorWheel();
    }

    /**
     * Show as palette with colours to choose from.
     * @param {String} side which side of the colour wheel the palette will appear.
     */
    showPalette(side) {
        let height = this.y;
        //console.log(this.key);
        if (this.key === 'eyes')
            height = this.y - 60;
        if (side === 'Left')
            this.swatch = this.game.add.sprite((this.x - this.swatchBMD.width) - 10, height, this.swatchBMD);
        else
            this.swatch = this.game.add.sprite((this.x + this.width) + 10, height, this.swatchBMD);
        this.swatch.inputEnabled = true;
        this.swatch.events.onInputDown.add(this.startSwatch, this);
        this.swatch.events.onInputOut.add(this.stopSwatch, this);
        this.swatch.events.onInputOut.add(() => this.closeColorWheel());
        this.colorWheelOpen = true;
    }

    /**
     * Closes the color Wheel, if it is open.
     */
    closeColorWheel() {
        if (this.colorWheelOpen) {
            this.swatch.destroy();
            this.animations.play('enabled');
            this.colorWheelOpen = false;
        }
    }
}
