/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import WebFont from 'webfontloader';
import Parse from 'parse';

// JSON OBJECT
import arenaJsonObject from '../assets/data/battleGUI.json';
import characterJsonObject from '../assets/data/characterNew.json';

// DATA
import arenaJsonPath from '../assets/data/battleGUI.txt';
import characterJsonPath from '../assets/data/characterNew.txt';

// IMAGES/SPRITESHEETS
import arenaAtlas from '../assets/images/battleGUI.png';
import characterAtlas from '../assets/images/characterNew.png';

import { Style } from '../utils/style';
import { Helper } from '../utils/helper';
import AuctionItem from '../parse/AuctionItem';
import * as user from '../parse/user';

/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Scene for displaying and interact with the auction.
 * @class SceneAuction
 * @extends {Phaser.State}
 */
export class SceneAuction extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    }

    preload() {
        this.loadJsonData();
        this.loadFonts();
        this.loadImages();
        this.loadSpriteSheets();
    }

    // TEST PURPOSES
    // it will be required a live server in order to update and display real time information
    async temporaryAsyncLoader() {

        this.createScenario();

        this.createInformationDisplayers();

        ///////////////////////////////////////////////////////////////////////
        const item = this.auction.get('auctionItem');
        let price;
        let time;

        if (!this.auction.get('currentItemPrice')) {
            price = item.getStartingBid();
        } else {
            price = this.auction.get('currentItemPrice');
        }

        /// current item price //////////////////
        //const startingBid = item.startingBid.toFixed(2);
        this.initialPrice = this.game.add.text(
            this.game.world.centerX + 15,
            this.game.world.centerY + 1342,
            price.toFixed(2), //'0000152.25',
            Style.setText(this.pricePanel, '#21c900', '21px', 'Digital'));

        /// current auction time left //////////////////
        this.initialTime = this.game.add.text(
            this.game.world.centerX + 60,
            this.game.world.centerY + 1242,
            '07:00:00',
            Style.setText(this.timePanel, '#e0ba2d', '22px', 'Digital'));

        Helper.regressiveTimer(() => {
            time = Helper.calculateRemainingTime(item.getStartDate(), item.getAuctionLength());
            this.initialTime.text = `${Helper.updateTime(time.days)}:${Helper.updateTime(time.hours)}:${Helper.updateTime(time.minutes)}`;
        });
        //////////////////////////////////////////////////////////////////////

        this.createPlayers();
        this.createPlayerNames();

        this.createQueue();
        this.createButtons();

        // TWEENS :D HEEY NASTY STUFF HERE
        this.kick = this.attackAnimationHandler('kick');
        this.closePunch = this.attackAnimationHandler('closePunch');
        this.closerSlash = this.attackAnimationHandler('closerSlash');
        this.fartherSlash = this.attackAnimationHandler('fartherSlash');
        //////////////////////////////////

        this.buttonsFunctionality();

        // common UI components setup
        this.UIComponents = [
            this.queue,
            this.buttonKick,
            this.buttonPunch,
            this.buttonSpecial,
            this.buttonWeapon,
            this.buttonItemInfo,
            this.pricePanel,
            this.timePanel,
            this.initialTime,
            this.initialPrice,
            this.player01BaseHealth,
            this.player02BaseHealth,
            this.player01Health,
            this.player02Health
        ];

        this.UIComponents.forEach(component => {
            component.scale.setTo(4);
            component.anchor.setTo(.5);
            component.smoothed = false;
        });

        this.player02BaseHealth.scale.setTo(-4, 4);
        this.player02Health.scale.setTo(-4, 4);
    }

    /**
     * Loads fonts for Phaser.
     */
    loadFonts() {
        WebFont.load({
            custom: {
                families: [
                    'Fixedsyswoff',
                    'Digital'
                ]
            }
        });
    }

    loadSpriteSheets() {
        this.game.load.atlasJSONHash('character', characterAtlas, characterJsonPath);
        this.game.load.atlasJSONHash('arena', arenaAtlas, arenaJsonPath);
    }

    /**
    * Loads single images.
    */
    loadImages() {
        //this.game.load.image('tileSet', tileSet); // maybe not necessary here
        //this.game.load.image('temporarybg', temporaryBG);
        //this.game.load.image('white_layer', whiteLayer);
    }

    /**
    * Loads json files.
    * - 'Texts' are usually used for data checking.
    * - 'Tilemap' is for any scene that requires map.
    */
    loadJsonData() {
        //this.game.load.text('character', characterAssetsJsonPath); 
    }

    // TEST
    async liveQueryTest() {
        this.auctionItem = new AuctionItem();
        this.currentUser = user.currentUser();

        const auctionItem = new AuctionItem();
        const query = new Parse.Query('Auction');

        if (sessionStorage.getItem('itemId')) {
            try {
                this.auctionItemId = sessionStorage.getItem('itemId');
                const item = await auctionItem.retrievePureAuctionItem(this.auctionItemId);
                query.equalTo('auctionItem', item);
                this.auction = await query.first();
                this.subscription = await query.subscribe();

                this.subscription.on('open', () => {
                    console.log('connection opened :D');
                    this.temporaryAsyncLoader();
                });

                this.subscription.on('update', object => {
                    console.log('object updated :D');
                    this.initialPrice.text = this.auction.get('currentItemPrice').toFixed(2);
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    create() {
        // TEST
        this.liveQueryTest();
    }

    update() {

        if (this.game.camera.y < 2704) {
            this.game.camera.y += 100; //this.game.camera.y += 4; for debug purposes
        }
    }

    /**
     * Generate Frame names array.
     * @param {string} prefix Start of the hash name, like 'MediumMasculine_OverWorld_Down'.
     * @param {number} defaultFrameStart The default frame number to the animation.
     * @param {number} begining The number where the frames start.
     * @param {number} ending The number where the frames end.
     */
    generateFrameNamesArray(prefix, defaultFrameStart, begining, ending) {
        const suffix = '.png';
        const framesArray = Phaser.Animation.generateFrameNames(prefix, begining, ending, suffix, 0);

        framesArray.push(prefix + defaultFrameStart + suffix);

        return framesArray;
    }

    attackedAnimationHandler(player01Position, player02Position) {
        if (this.player01 && this.player02) {
            console.log('getting here?');
            const attacked = this.game.add.tween(this.player01);

            const anim = this.player01.animations;

            attacked.to({ x: this.player01.x - 700, y: this.player01.y - 450, angle: 300 }, 1000, Phaser.Easing.Out);
            attacked.onStart.add(() => {
                anim.play('damaged');
            });

            attacked.onComplete.add(
                () => {
                    anim.play('idle');
                    this.player01.x = player01Position.x;
                    this.player01.y = player01Position.y;
                    this.player01.angle = 0;

                    this.player02.x = player02Position.x;

                    this.enableButtons();
                    this.auctionFreshStart(); // This won't work inside 'update' HERE
                }
            );

            attacked.start();
        }
    }

    attackAnimationHandler(move) {
        if (this.player01 && this.player02) {
            const attack = this.game.add.tween(this.player02);

            const anim = this.player02.animations;

            const initialPlayer01Position = { x: this.player01.x, y: this.player01.y };
            const initialPlayer02Position = { x: this.player02.x, y: this.player02.y };

            attack.to({ x: this.player02.x - 340, y: this.player02.y }, 1000, Phaser.Easing.In);
            attack.onStart.add(() => {
                anim.play('moveRight');
                this.enableButtons(false);
            });

            attack.onComplete.add(
                () => {
                    anim.play(move).onComplete.add(() => {
                        this.attackedAnimationHandler(initialPlayer01Position, initialPlayer02Position);
                        anim.play('idle');

                    }, this);
                }
            );

            return attack;
        }
    }

    createScenario() {
        // arena background //////////////////////////
        this.arena = this.game.add.sprite(0, 0, 'arena', 'BattleBack.png');
        this.arena.anchor.setTo(0);
        this.arena.scale.setTo(1);
        this.arena.width = 1600;
        this.arena.height = 3400;
        this.arena.smoothed = false;
        this.game.world.setBounds(0, 0, 1600, 3400); // this sets where the camera starts at
        /////////////////////////////////////////////
    }

    createPlayer(playerWinning = false) {
        let x = this.game.world.centerX;
        let y = this.game.world.centerY + 1420;

        // left or right (respectively)
        x = playerWinning ? x - 180 : x + 180;

        // later it will create the characters pieces of the user, probably an async function then
        const player = this.game.add.sprite(x, y, 'character', 'Medium_Feminine_Battle_Idle2.png');

        // Facing right or left (respectively)
        playerWinning ? player.scale.setTo(4) : player.scale.setTo(-4, 4);

        player.smoothed = false;
        player.anchor.setTo(0.5);

        // adding animations for different sprites
        // note: notice that first redundant part: 'Medium_Feminine ?
        player.animations.add('moveRight', this.generateFrameNamesArray('Medium_Feminine_OverWorld_Body_Right', 2, 1, 3), 7, true);
        player.animations.add('idle', this.generateFrameNamesArray('Medium_Feminine_Battle_Idle', 2, 1, 3), 7, true);
        player.animations.add('guard', this.generateFrameNamesArray('Medium_Feminine_Battle_Block', 2, 1, 3), 7, false);
        player.animations.add('damaged', this.generateFrameNamesArray('Medium_Feminine_Battle_Damaged', 2, 1, 3), 7, false);
        player.animations.add('closePunch', this.generateFrameNamesArray('Medium_Feminine_Battle_Punch-Closer', 2, 1, 3), 7, false);
        player.animations.add('fartherPunch', this.generateFrameNamesArray('Medium_Feminine_Battle_Punch-Farther', 2, 1, 3), 7, false);
        player.animations.add('closerSlash', this.generateFrameNamesArray('Medium_Feminine_Battle_Slash-Closer', 2, 1, 3), 7, false);
        player.animations.add('fartherSlash', this.generateFrameNamesArray('Medium_Feminine_Battle_Slash-Farther', 2, 1, 3), 7, false);
        player.animations.add('kick', this.generateFrameNamesArray('Medium_Feminine_Battle_Kick', 2, 1, 3), 7, false);

        player.animations.play('idle');

        return player;
    }

    createPlayers() {
        // some characters //////////////////////////////
        // the winning player / this will be live reloading, meaning that it will be constantly changing as bets are being placed
        if (this.auction.get('winningPlayer')) {
            this.player01 = this.createPlayer(true);
        }

        // the player who just joined
        if (!this.auction.get('winningPlayer') || (this.auction.get('winningPlayer').id !== user.currentUser().id)) {
            this.player02 = this.createPlayer(false);
        }
    }

    async createPlayerNames() {
        if (this.player01) {
            try {
                const aUser = this.auction.get('winningPlayer');
                const test = await user.retrieveUser(aUser);

                this.player01Name = this.game.add.text(
                    this.game.world.centerX - 564,
                    this.game.world.centerY + 972,
                    this.auction.get('winningPlayer').get('username'),
                    Style.setText(this.player01BaseHealth, '#fff', '36px', 'Fixedsyswoff', 3));

                this.player01Name.anchor.setTo(.5);
            } catch (err) {
                console.log(err);
            }
        }

        if (!this.auction.get('winningPlayer') || (this.auction.get('winningPlayer').id !== user.currentUser().id)) {
            this.player02Name = this.game.add.text(
                this.game.world.centerX + 564,
                this.game.world.centerY + 972,
                this.currentUser.get('username'),
                Style.setText(this.player02BaseHealth, '#fff', '36px', 'Fixedsyswoff', 3));


            this.player02Name.anchor.setTo(.5);
        }
    }

    createQueue() {
        // UI components
        //queue
        this.queue = this.game.add.sprite(
            this.game.world.centerX - 632,
            this.game.world.centerY + 864,
            'arena', 'ActionQueue_Act+Next.png'
        );
    }

    createButtons() {
        // interaction buttons ///////////
        this.buttonKick = this.game.add.sprite(
            this.game.world.centerX - 475,
            this.game.world.centerY + 1250,
            'arena', 'ActionButton_Kick.png'
        );
        this.buttonPunch = this.game.add.sprite(
            this.game.world.centerX - 692,
            this.game.world.centerY + 1250,
            'arena', 'ActionButton_Punch.png'
        );
        this.buttonWeapon = this.game.add.sprite(
            this.game.world.centerX - 692,
            this.game.world.centerY + 1440,
            'arena', 'ActionButton_Weapon.png'
        );
        this.buttonSpecial = this.game.add.sprite(
            this.game.world.centerX - 475,
            this.game.world.centerY + 1440,
            'arena', 'ActionButton_Special.png'
        );
        this.buttonItemInfo = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY + 1640,
            'arena', 'ItemInfo-Bottom_Closed.png'
        );
    }

    async auctionFreshStart() {

        try {
            this.enableButtons(false);

            // player2 is set to be the winner
            this.auction.set('winningPlayer', user.currentUser());

            // updates current item price
            if (!this.auction.get('currentItemPrice'))
                this.auction.set('currentItemPrice', this.auction.get('auctionItem').getStartingBid());

            await this.auction.save();

            if (this.player01Name)
                this.player01Name.text = this.auction.get('winningPlayer').get('username'); //user.currentUser().get('username');
            else {
                // becomes player1 (create)
                this.player01Name = this.game.add.text(
                    this.game.world.centerX - 564,
                    this.game.world.centerY + 972,
                    this.auction.get('winningPlayer').get('username'), //user.currentUser().get('username')
                    Style.setText(this.player01BaseHealth, '#fff', '36px', 'Fixedsyswoff', 3));

                this.player01Name.anchor.setTo(.5);
            }

            if (this.player01) {
                this.player01.destroy();
            }

            this.player01 = this.createPlayer(true);

            // player2 name deleted
            this.player02Name.destroy();
            this.player02.destroy();

            console.log('Hello');
        } catch (err) {
            console.log(err);
        }
    }

    enableButtons(enable = true) {
        [
            this.buttonKick,
            this.buttonPunch,
            this.buttonWeapon,
            this.buttonSpecial
        ].forEach(e => e.inputEnabled = enable);
    }

    buttonsFunctionality() {
        this.enableButtons();

        this.buttonPunch.events.onInputDown.add(target => {
            if (this.player01) {
                console.log(target);
                //increase currentItemPrice .25 value
                this.auction.set('currentItemPrice', this.auction.get('currentItemPrice') + .25);
                this.auction.save();

                this.closePunch.start();
            }
            else
                this.auctionFreshStart();
        });
        this.buttonKick.events.onInputDown.add(target => {
            if (this.player01) {
                //increase currentItemPrice .5 value
                this.auction.set('currentItemPrice', this.auction.get('currentItemPrice') + .5);
                this.auction.save();

                this.kick.start();
            }
            else
                this.auctionFreshStart();
        });
        this.buttonWeapon.events.onInputDown.add(target => {
            if (this.player01) {
                //increase currentItemPrice 1 value
                this.auction.set('currentItemPrice', this.auction.get('currentItemPrice') + 1);
                this.auction.save();

                this.closerSlash.start();
            }
            else
                this.auctionFreshStart();
        });
        this.buttonSpecial.events.onInputDown.add(target => {
            if (this.player01) {
                //increase currentItemPrice 2 value
                this.auction.set('currentItemPrice', this.auction.get('currentItemPrice') + 2);
                this.auction.save();

                this.fartherSlash.start();
            }
            else
                this.auctionFreshStart();
        });

        //this.buttonItemInfo;
    }

    createInformationDisplayers() {
        // players information displayers //////////////
        this.player01BaseHealth = this.game.add.sprite(
            this.game.world.centerX - 524,
            this.game.world.centerY + 970,
            'arena', 'PlayerGuage_Base.png'
        );
        this.player02BaseHealth = this.game.add.sprite(
            this.game.world.centerX + 524,
            this.game.world.centerY + 970,
            'arena', 'PlayerGuage_Base.png'
        );
        this.player01Health = this.game.add.sprite(
            this.game.world.centerX - 530,
            this.game.world.centerY + 970,
            'arena', 'PlayerGuage_Health.png'
        );
        this.player02Health = this.game.add.sprite(
            this.game.world.centerX + 530,
            this.game.world.centerY + 970,
            'arena', 'PlayerGuage_Health.png'
        );


        // time panel
        this.timePanel = this.game.add.sprite(
            this.game.world.centerX + 8,
            this.game.world.centerY + 1242,
            'arena', 'Backboard_TIME.png'
        );

        // price panel
        this.pricePanel = this.game.add.sprite(
            this.game.world.centerX - 10,
            this.game.world.centerY + 1338,
            'arena', 'Backboard_VALUE.png'
        );
    }


    /**
     * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene. 
     * - Use when heading to another Scene.
     */
    shutdown() {
        console.log('shutdown')
        // REMEMBER THAT IT IS VERY IMPORTANT TO DESTROY EVERYTHING HERE!
        Helper.stopRegressiveTimer();
    }
}


/*


            /* or
           this.initialPrice = this.game.add.text(
               this.game.world.centerX + 15,
               this.game.world.centerY + 1330,
               '0000152.25',
               Style.setText(this.pricePanel, '#21c900', '81px', 'Digital'));

            /// current auction time left //////////////////
           this.initialTime = this.game.add.text(
               this.game.world.centerX + 60,
               this.game.world.centerY + 1234,
               '07:00:00',
               Style.setText(this.timePanel, '#e0ba2d', '84px', 'Digital'));
       });

       this.initialPrice.anchor.setTo(.5);
       this.initialTime.anchor.setTo(.5);
*/