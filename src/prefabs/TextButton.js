import { Style } from '../utils/style';
/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Creates a Button with a custom text inside.
 * @class TextButton
 * @extends {Phaser.Sprite}
 */
export class TextButton extends Phaser.Sprite {
    constructor(game, side, x, y, text) {
        super(game, x, y, 'cc_panel_button');
        this.animations.add('default', [0], 1, false);
        this.animations.add('highlight', [1], 1, true);
        this.anchor.setTo(0.17, 0);
        this.style = Style.getButtonText(this);
        if (side === 'Left') {
            this.txt = this.game.make.text(x, y, text, this.style); // a text for now
        }
        else {
            this.txt = this.game.make.text(x + 30, y, text, this.style);
        }
        this.txt.anchor.setTo(0, -0.55);
        this.txt.smoothed = false;
        game.add.existing(this);
        game.add.existing(this.txt);
    }

    /**
     * Plays 'highlight' animation.
     */
    highlight() {
        this.animations.play('highlight');
    }

    /**
     * Plays 'default' animation.
     */
    default() {
        this.animations.play('default');
    }
}
