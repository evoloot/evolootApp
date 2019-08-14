import { Helper } from '../utils/helper';
import '../libs/asyncPath';

/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Creates a Character Piece.
 * @class Piece
 * @extends {Phaser.Sprite}
 */
export class Piece extends Phaser.Sprite {
    constructor(game, piece = null, wall = null, map = null, x = 0, y = 0, characterPart = null, keyboard = null) {
        super(game, x, y, 'character');

        // For map.
        if (piece) {
            this.tint = piece.tint;
            this.frameName = piece.key;
            this.isEnabled = true;
            this.anchor.setTo(0.5);
            this.scale.setTo(2);
            this.map = map;
            this.wall = wall;
            this.keyboard = keyboard;
        }
        else { // For customization.
            this.width = 250;
            this.height = 250;
            this.frameName = characterPart;
        }

        this.speed = 160;
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.smoothed = false; // solves size focus problems

        // The "Physical" body size
        // starts at 11x 44y;
        // size 17w 5h;
        this.body.setSize(17, 7, 11, 44); // less than 48!

        let spriteKeyBroken;
        characterPart ? spriteKeyBroken = characterPart.split('_') : spriteKeyBroken = piece.key.split('_');

        // Body size 
        this.bodySize = spriteKeyBroken[0];
        // Feminine or Masculine? generateFrameNamesArray
        this.gender = spriteKeyBroken[1];
        // Scenario
        this.scenario = spriteKeyBroken[2];
        // Type
        this.pieceType = spriteKeyBroken[3];
        // Category 
        this.category = spriteKeyBroken[4];
        // Side
        // Hand, e.g.:  spriteKeyBroken[6].split('2') = _RightHanded2.png => [_RightHanded, .png] 
        spriteKeyBroken[6] ? this.hand = '_' + spriteKeyBroken[6].split('2')[0] : this.hand = '';

        // FrameName Arrays, for animations.
        this.moveFrontFrameName = Phaser.Animation.generateFrameNames(`${this.bodySize}_${this.gender}_${this.scenario}_${this.pieceType}_${this.category}_Down${this.hand}`, 1, 3, '.png');
        this.moveLeftFrameName = Phaser.Animation.generateFrameNames(`${this.bodySize}_${this.gender}_${this.scenario}_${this.pieceType}_${this.category}_Left${this.hand}`, 1, 3, '.png');
        this.moveRightFrameName = Phaser.Animation.generateFrameNames(`${this.bodySize}_${this.gender}_${this.scenario}_${this.pieceType}_${this.category}_Right${this.hand}`, 1, 3, '.png');
        this.moveBehindFrameName = Phaser.Animation.generateFrameNames(`${this.bodySize}_${this.gender}_${this.scenario}_${this.pieceType}_${this.category}_Up${this.hand}`, 1, 3, '.png');

        this.defaultFrontFrameName = [this.moveFrontFrameName[1]];
        this.defaultLeftFrameName = [this.moveLeftFrameName[1]];
        this.defaultRightFrameName = [this.moveRightFrameName[1]];
        this.defaultBehindFrameName = [this.moveBehindFrameName[1]];

        // adding animations for the same sprite
        this.animations.add('defaultFront', this.defaultFrontFrameName, 7, true);
        this.animations.add('defaultLeft', this.defaultLeftFrameName, 7, true);
        this.animations.add('defaultRight', this.defaultRightFrameName, 7, true);
        this.animations.add('defaultBehind', this.defaultBehindFrameName, 7, true);
        this.animations.add('front', this.moveFrontFrameName, 7, true);
        this.animations.add('behind', this.moveBehindFrameName, 7, true);
        this.animations.add('left', this.moveLeftFrameName, 7, true);
        this.animations.add('right', this.moveRightFrameName, 7, true);

        this.characterPieces = JSON.parse(this.game.cache.getText('Character_Pieces')).frames;

        this.game.add.existing(this);

        if (this.isEnabled) {
            this.addMouse();
            this.count = 0;
        }

    }

    update() {
        // moving it around if not in the customization screen
        if (this.isEnabled) {
            this.game.physics.arcade.collide(this, this.wall);
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
            this.addKeyboardListener();
            this.animationManager();
        }
    }

    /**
     * Plays the given sprite animation.
     * - Some frames does not exist in certain animations, 
     * so they're turned invisible instead of playing, preventing an error.
     * - They become visible once they're back to existence.
     * @param {string} animationName animation key name.
     */
    customPlay(animationName) {
        let nonExistent = false;

        if(animationName === 'behind' || animationName === 'defaultBehind'){
            this.moveBehindFrameName.forEach(name => {
                if(!this.characterPieces[name]) nonExistent = true;
            });

            if (!this.characterPieces[this.defaultBehindFrameName[0]] || nonExistent) this.alpha = 0;
            
            else this.animations.play(animationName);
            
        } else {
            this.alpha = 1;
            this.animations.play(animationName);
        }
    }

    /**
     * Listens for specific keyboard keys.
     * - Responsible for manual Piece movement.
     */
    addKeyboardListener() {
        if (this.keyboard.keys.get('W').isDown || this.keyboard.arrows.up.isDown) {
            this.removeTweensOnManualMove();
            this.body.velocity.y = -this.speed;
        }
        else if (this.keyboard.keys.get('S').isDown || this.keyboard.arrows.down.isDown) {
            this.removeTweensOnManualMove();
            this.body.velocity.y = this.speed;
        }
        if (this.keyboard.keys.get('A').isDown || this.keyboard.arrows.left.isDown) {
            this.removeTweensOnManualMove();
            this.body.velocity.x = -this.speed;
        }
        else if (this.keyboard.keys.get('D').isDown || this.keyboard.arrows.right.isDown) {
            this.removeTweensOnManualMove();
            this.body.velocity.x = this.speed;
        }
    }

    /**
    * Adds mouse/touch control over the Piece.
    * - Sets Async Path Find plugin to ignore the the map "wall", meaning that it will only 
    * respond to click inputs inside the "path". 
    */
    addMouse() {
        this.asyncPlugin = this.game.plugins.add(Phaser.Plugin.asyncPath);
        this.asyncPlugin.tileMap = this.map;
        this.asyncPlugin.nonWalkableLayer = "Wall"; //set all tiles on layer as non walkable
        this.moveTo(this);
    }

    /**
     * Remove all PhaserTweens currently acting on the Piece.
     * - Marks the Piece as stoped, so it also shuts any current movement animation.
     * - Possibly dangerous. 
     */
    removeTweensOnManualMove() {
        this.game.tweens.removeFrom(this.body);
        this.stop = true;
    }

    /**
     * Moves the sprite to a point in the world's path.
     * - Async Path Find plugin generates a series of locations from the starting Piece position(current position) 
     * to the end(place clicked), then, a tween makes the Piece move trough each of them.
     * - If a building was clicked, the Piece moves to its 'MapObject' area and it will prompt a popup window at the end.
     * @param {Piece} sprite : Phaser.Sprite object.
     */
    moveTo(sprite) {
        this.game.input.onDown.add(() => {
            // remove all tweens executing on sprite
            this.game.tweens.removeFrom(sprite.body);
            this.move = this.game.add.tween(sprite.body);
            
            if (Helper.buildLocation) {
                this.game.input.x = Helper.buildLocation.x;
                this.game.input.y = Helper.buildLocation.y;
                const scene = Helper.buildLocation.scene;


                //if (Helper.buildLocation.scene)
                this.move.onComplete.add(() => {
                    Helper.sceneMapPopupSetter(scene);
                });
                //else
            }
            let aPath = [];
            const block = {
                Origin: sprite.body,
                Destination: this.game.input,
                debugpath: false,
                Diagonals: true,
                found: path => {
                    path.forEach(e => {
                        const ex = (e.X * 16) - (sprite.body.width / 2 - 10);
                        const ey = (e.Y * 16);
                        aPath.push({ x: ex, y: ey });
                        this.move.to({ x: ex, y: ey }, 170);
                    });
                    this.move.start();
                    sprite.setPath(aPath);
                },
                notfound: () => {
                    sprite.setPath(aPath);
                    console.log('notfound');
                }
            };
            this.asyncPlugin.getPath(block);
            Helper.buildLocation = null;
        });
    }

    /**
    * Manages how to handle the animation, on the purpose that
    * if it receives keyboard commands, it uses physics to move
    * otherwise Tweens and they must not conflict.
    */
    animationManager() {
        if (this.autoMove) {
            // mouse/touch
            this.goToPoint();
        }
        else {
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.customPlay('defaultFront');
            }
            if (this.body.velocity.y > 0) {
                this.customPlay('front');
            }
            else if (this.body.velocity.y < 0) {
                this.customPlay('behind');
            }
            else if (this.body.velocity.x > 0) {
                this.customPlay('right');
            }
            else if (this.body.velocity.x < 0) {
                this.customPlay('left');
            }
        }
    }
    
    /**
    * Sets its percourse into an array of coordinates.
    * - If a path has been generated, Piece is auto moving, starts count and stop is false,
    * else, remains stoped.
    * @param path Array of each coordinate that the sprite is going to pass.
    */
    setPath(path) {
        if (path.length > 0) {
            this.path = path;
            this.autoMove = true;
            this.count = 0;
            this.stop = false;
        }
        else {
            this.stop = true;
        }
    }

    /**
    * Figures what animation it should play based on the actual heading coordinate.
    * - When auto moving.
    * - It compares the actual Piece's axis to the path's axis it is heading to, when they become the same, count is updated.
    * - Process occur until Piece reaches its final destination or gets interrupted.
    */
    goToPoint() {
        const x = Math.floor(this.body.x);
        const y = Math.floor(this.body.y);
        if (this.stop || (this.path[this.path.length - 1].x == x && this.path[this.path.length - 1].y == y)) {
            this.autoMove = false;
            this.count = 0;
        }
        else {
            if (y > this.path[this.count].y) {
                this.customPlay('behind');
            }
            else if (y < this.path[this.count].y) {
                this.customPlay('front');
            }
            else if (x > this.path[this.count].x) {
                this.customPlay('left');
            }
            else if (x < this.path[this.count].x) {
                this.customPlay('right');
            }
            if (x == this.path[this.count].x && y == this.path[this.count].y) {
                ++this.count;
            }
        }
    }

    /**
     * Returns the names of the available Piece animation movements.
     */
    getMovingSides() {
        return ['left', 'front', 'right', 'behind'];
    }

    /**
     * Returns the names of the available Piece default animations.
     */
    getSides() {
        return ['defaultLeft', 'defaultFront', 'defaultRight', 'defaultBehind'];
    }
}
