/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Creates arrows to switch between options of a list.
 * @class OptionArrows
 * @extends {Phaser.Sprite}
 */
export class OptionArrows extends Phaser.Sprite {
    constructor(game, side, x, y) {
        //, x, y,
        super(game, x, y, 'arrows');
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
        game.add.existing(this);
        this.animations.add('defaultLeft', [0], 1, false);
        this.animations.add('hoverLeft', [1], 1, false);
        this.animations.add('defaultRight', [2], 1, false);
        this.animations.add('hoverRight', [3], 1, false);
        this.side = side;
        this.animations.play(`default${this.side}`);
        this.clickListeners();
    }

    /**
     * Listens for input out and input over mouse events.
     * - Respectively plays its default animation, else plays on hover animation and scales to 1.1.
     */
    clickListeners() {
        this.events.onInputOut.add(() => {
            this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 150, Phaser.Easing.Linear.None, true);
            this.animations.play(`default${this.side}`);
        }, this);
        this.events.onInputOver.add(() => {
            this.game.add.tween(this.scale).to({ x: 1.1, y: 1.1 }, 150, Phaser.Easing.Linear.None, true);
            this.animations.play(`hover${this.side}`);
        });
    }

    /**
     * Plays 'on hover' on right arrow animation.
     */
    playRight() {
        this.animations.play('hoverRight');
    }

    /**
     * Plays 'on hover' on left arrow animation.
     */
    playLeft() {
        this.animations.play('hoverLeft');
    }

    /**
     * Plays 'default' right arrow animation.
     */
    playDefaultRight() {
        this.animations.play('defaultRight');
    }

    /**
     * Plays 'default' left arrow animation.
     */
    playDefaultLeft() {
        this.animations.play('defaultLeft');
    }
}
