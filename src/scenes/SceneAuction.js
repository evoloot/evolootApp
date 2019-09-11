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
import background from '../assets/images/black_layer.png';

import { Style } from '../utils/style';
import { Helper } from '../utils/helper';
import AuctionItem from '../parse/AuctionItem';
import * as user from '../parse/user';
import * as userCharacter from '../parse/userCharacter';

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

    create() {
        this.createAuctionSubscription();
    }

    update() {
        this.arenaStartCameraAnimation();
        this.updateStateCases();
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
        this.game.load.image('background', background);
    }

    /**
    * Loads json files.
    */
    loadJsonData() { }

    /**
     * Starts game creating all of its components.
     */
    async startGame() {

        this.createScenario();
        this.createInformationDisplayers();

        ///////////////////////////////////////////////////////////////////////
        const item = this.auction.get('auctionItem');
        let price;

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

        this.timeAddition = 0;

        Helper.regressiveTimer(() => {
            //const serverTime = await Parse.Cloud.run('getServerTime');
            this.time = Helper.calculateRemainingTime(item.getStartDate(), item.getAuctionLength(), this.timeAddition);
            this.initialTime.text = `${Helper.updateTime(this.time.days)}:${Helper.updateTime(this.time.hours)}:${Helper.updateTime(this.time.minutes)}`;

            if (this.time === 'expired') {
                this.initialTime.text = '00:00:00';

                // case where are people inside the auction
                this.auction.set('closed', true);
                this.auction.save();
                console.log('This auction is over');
            }
        });

        if (this.time === 'expired') Helper.stopRegressiveTimer();
        //////////////////////////////////////////////////////////////////////

        this.createPlayers();
        this.createPlayerNames();

        this.createQueue();
        this.createButtons();
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
     * Creates Auction subscription for live updates(Live queries).
     * - Finds Auction based on the auctionItem id and subscribes it.
     * - On subscription open, starts game add the current user to the 
     * "queue", if he is not already in there.
     * - On subscription update checks if auction is not closed, if not, do the following: updates the price text, 
     * if auction queue is different than the local stored, updates local queue.
     * Verifies if user is not the winning player, if true, verifies if he was, setting 'this.someoneAttacked',
     * else, sets 'this.timeToReset' to true. Case he is the winning player,
     * sets 'this.imWinning' to true.
     * - On subscription close, removes this user from the "queue".
     */
    async createAuctionSubscription() {
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

                this.players = await this.auction.get('queue');
                if (this.players && this.players.length > 0) {
                    if (this.players.find(player => player.id === this.currentUser.id) === undefined)
                        this.players.push(this.currentUser);
                } else {
                    this.players = [this.currentUser];
                }

                this.subscription.on('open', () => {
                    this.startGame();

                    this.auction.set('queue', this.players);
                    this.auction.save();
                });

                this.subscription.on('update', object => {

                    if (this.auction.get('closed')) {
                        const getLost = this.game.world.centerX - 3000;

                        this.buttonKick.x = getLost;
                        this.buttonPunch.x = getLost;
                        this.buttonSpecial.x = getLost;
                        this.buttonWeapon.x = getLost;

                        const winner = this.auction.get('winningPlayer') ? this.auction.get('winningPlayer').get('username') : 'no one'

                        // show winner screen
                        this.blackLayer = this.game.add.sprite(0, 0, 'background');
                        this.blackLayer.width = 1600;
                        this.blackLayer.height = 3400;

                        this.gameOver = this.game.add.text(
                            this.game.world.centerX,
                            this.game.world.centerY + 1200,
                            'Game Over',
                            Style.setMessage(
                                '#fff',
                                '150px',
                                'Fixedsyswoff',
                                3
                            )
                        );

                        this.winnerMessage = this.game.add.text(
                            this.game.world.centerX,
                            this.game.world.centerY + 1300,
                            `The winner is: ${winner}`,
                            Style.setMessage(
                                '#fff',
                                '50px',
                                'Fixedsyswoff',
                                3
                            )
                        );

                        [this.gameOver, this.winnerMessage].forEach(e => e.anchor.setTo(.5));
                    } else {
                        if (this.auction.get('currentItemPrice'))
                            this.initialPrice.text = this.auction.get('currentItemPrice').toFixed(2);

                        if (this.players.length !== object.get('queue').length) { // is this relyable???
                            this.players = object.get('queue');
                        }

                        if (this.auction.get('winningPlayer') && (this.auction.get('winningPlayer').id !== user.currentUser().id)) {

                            if (this.imWinning)
                                this.someoneAttacked = this.auction.get('firstServed');
                            else
                                this.timeToReset = true;
                        }
                        else {
                            this.imWinning = true;
                        };
                    }
                });

                this.subscription.on('delete', () => {

                    this.players = null;
                    this.auction = null;
                    this.currentUser = null;

                    console.log('got here!');

                    window.location.replace('/evolootApp/auction/buy/part04');
                });

                this.subscription.on('close', () => {
                    const index = this.players.findIndex(player => player.id === this.currentUser.id);
                    this.players.splice(index, 1);

                    this.auction.set('queue', this.players);
                    this.auction.save();

                    this.players = null;
                    this.auction = null;
                    this.currentUser = null;
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    /**
     * Scrolls 'camera' down to the arena.
     */
    arenaStartCameraAnimation() {
        if (this.game.camera.y < 2704) this.game.camera.y += 4; //this.game.camera.y += 100; for debug purposes
    }

    /**
     * This handles how the game should update based on the current global state
     * of the auction and what was the role of the current user during the update.
     * - First case is the user is player02 and executed an action.
     * - Second case is if there is a player02 and it is not in the middle of an animation.
     * - Third case is if user is player01 and someone attacked.
     */
    updateStateCases() {
        if (this.auction && this.auction.get('antiSniper')) {
            this.timeAddition += 60000;
            console.log('anti sniper activated!');

            this.auction.set('antiSniper', false);
            this.auction.save();
            console.log('anti sniper deactivated!');
        }

        if (this.timeToUpdate) {
            this.action.start();
            this.timeToUpdate = false;
        }

        if (this.timeToReset && !((this.player02 && this.player02.alive) && this.game.tweens.isTweening(this.player02))) {
            this.createPlayers();
            this.createPlayerNames();
            this.enableActionButtons();
            this.timeToReset = false;
        }

        if (this.someoneAttacked && this.imWinning) {
            this.attacker();
            this.someoneAttacked = null;
            this.imWinning = false;
        }
    }

    /**
     * Creates respective attacker which will appear to the winning player(player01).
     */
    async attacker() {
        try {
            const firstServed = this.auction.get('firstServed');

            const attackerCharacter = await userCharacter.getCharacter(firstServed.user);
            const attackerName = await user.retrieveUsername(firstServed.user);

            this.player02 = this.createPlayer(false);
            this.player02Name = this.createPlayerName(attackerName, false);

            switch (firstServed.action) {
                case (.25):
                    this.closePunch = this.attackAnimationHandler('closePunch', false);
                    this.closePunch.start();
                    break;
                case (.5):
                    this.kick = this.attackAnimationHandler('kick', false);
                    this.kick.start();
                    break;
                case (1):
                    this.closerSlash = this.attackAnimationHandler('closerSlash', false);
                    this.closerSlash.start();
                    break;
                default:
                    this.fartherSlash = this.attackAnimationHandler('fartherSlash', false);
                    this.fartherSlash.start();
            }

        } catch (err) {
            console.log(err);
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

    /**
     * The player01 animation reaction to an attack.
     * @param {boolean} freshStart whether it should update the state at the end of animation or not. 
     * - Note that setting 'freshStart' to true in the wrong place will result into a REALLY bad thing.
     */
    attackedAnimationHandler(freshStart) {
        if (this.player01 && this.player02) {
            const attacked = this.game.add.tween(this.player01);

            attacked.to({ x: this.player01.x - 700, y: this.player01.y - 450, angle: 300 }, 1000, Phaser.Easing.Out);
            attacked.onStart.add(() => {
                this.player01.animations.play('damaged');
            });

            attacked.onComplete.add(
                () => {
                    if (freshStart) {
                        this.auctionFreshStart();
                    } else {
                        this.timeToReset = true;
                    }
                }
            );

            attacked.start();
        }
    }

    /**
     * The player02 attack animation.
     * @param {string} move name of the animation to play. 
     * @param {boolean} freshStart whether it should update the state at the end of animation or not. 
     * default is TRUE
     */
    attackAnimationHandler(move, freshStart = true) {
        if (this.player01 && this.player02) {
            const attack = this.game.add.tween(this.player02);

            attack.to({ x: this.player02.x - 340, y: this.player02.y }, 1000, Phaser.Easing.In);
            attack.onStart.add(() => {
                this.animations.play('moveRight');
                this.enableActionButtons(false);
            });

            attack.onComplete.add(
                () => {
                    this.animations.play(move).onComplete.add(() => {
                        this.attackedAnimationHandler(freshStart);
                        this.animations.play('idle');

                    }, this);
                }
            );

            return attack;
        }
    }

    /**
     * Creates arena scenario, the background.
     */
    createScenario() {
        this.arena = this.game.add.sprite(0, 0, 'arena', 'BattleBack.png');
        this.arena.anchor.setTo(0);
        this.arena.scale.setTo(1);
        this.arena.width = 1600;
        this.arena.height = 3400;
        this.arena.smoothed = false;
        this.game.world.setBounds(0, 0, 1600, 3400); // this sets where the camera starts at
    }

    /**
     * Creates a player.
     * @param {boolean} playerWinning respetively will place the player left(true) or right(false), 
     * defaults to FALSE.
     */
    createPlayer(playerWinning = false) {
        let x = this.game.world.centerX;
        let y = this.game.world.centerY + 1420;

        // left or right (respectively)
        playerWinning ? x -= 180 : x += 180;

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

        this.animations = player.animations;

        return player;
    }

    /**
     * Create players.
     * - Verifies which players already exists and destroys them.
     * - Creates player01 if there is a winningPlayer.
     * - Creates player02 if there is no winningPlayer or there is and it is not me.
     * - Assign tweens.
     */
    createPlayers() {
        if (this.player01) this.player01.destroy();
        if (this.player02) this.player02.destroy();

        if (this.auction.get('winningPlayer')) {
            this.player01 = this.createPlayer(true);
        }

        if (!this.auction.get('winningPlayer') || (this.auction.get('winningPlayer').id !== user.currentUser().id)) {
            this.player02 = this.createPlayer(false);
        }

        this.kick = this.attackAnimationHandler('kick');
        this.closePunch = this.attackAnimationHandler('closePunch');
        this.closerSlash = this.attackAnimationHandler('closerSlash');
        this.fartherSlash = this.attackAnimationHandler('fartherSlash');
    }

    /**
     * Creates a player name and places it to its respective
     * place, whether it is the winning(player01) or the losing(player02) player. 
     * @param {string} name the player name.
     * @param {boolean} playerWinning respetively will place the name left(true) or right(false), 
     * defaults to FALSE.
     */
    createPlayerName(name, playerWinning = false) {
        let x = this.game.world.centerX;
        let y = this.game.world.centerY + 972;

        playerWinning ? x -= 564 : x += 564;

        const nameText = this.game.add.text(x, y, name,
            Style.setText(
                this.player01BaseHealth,
                '#fff',
                '36px',
                'Fixedsyswoff',
                3
            )
        );

        nameText.anchor.setTo(.5);

        return nameText;
    }

    /**
     * Creates the name of the players.
     * - Verifies which names already exists and destroys them.
     * - If there is a player01, creates its name.
     * - creates player02 name if there is no winning player or you are player02.
     */
    async createPlayerNames() {
        if (this.player01Name) this.player01Name.destroy();

        if (this.player02Name) this.player02Name.destroy();

        if (this.player01) {
            try {
                const aUser = this.auction.get('winningPlayer');
                await user.retrieveUser(aUser);

                this.player01Name = this.createPlayerName(this.auction.get('winningPlayer').get('username'), true);
            } catch (err) {
                console.log(err);
            }
        }

        if (!this.auction.get('winningPlayer') || (this.auction.get('winningPlayer').id !== user.currentUser().id)) {
            this.player02Name = this.createPlayerName(this.currentUser.get('username'));
        }
    }

    /**
     * Creates queue.
     */
    createQueue() {
        this.queue = this.game.add.sprite(
            this.game.world.centerX - 632,
            this.game.world.centerY + 864,
            'arena', 'ActionQueue_Act+Next.png'
        );
    }

    /**
     * Creates interactive buttons.
     * - action buttons are enabled if there is no winning player or you are player02.
     */
    createButtons() {
        const firstColumn = this.game.world.centerX - 475;
        const secondColumn = this.game.world.centerX - 692;
        const firstRow = this.game.world.centerY + 1250;
        const secondRow = this.game.world.centerY + 1440;

        this.buttonKick = this.game.add.sprite(firstColumn, firstRow, 'arena', 'ActionButton_Kick.png');
        this.buttonPunch = this.game.add.sprite(secondColumn, firstRow, 'arena', 'ActionButton_Punch.png');
        this.buttonWeapon = this.game.add.sprite(secondColumn, secondRow, 'arena', 'ActionButton_Weapon.png');
        this.buttonSpecial = this.game.add.sprite(firstColumn, secondRow, 'arena', 'ActionButton_Special.png');

        this.buttonItemInfo = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY + 1640,
            'arena', 'ItemInfo-Bottom_Closed.png'
        );

        if (!this.auction.get('winningPlayer') || (this.auction.get('winningPlayer').id !== user.currentUser().id))
            this.enableActionButtons();
    }

    /**
     * Triggers update of the auction by updating(saving) its new values.
     * - Arriving here means that there is a new winning player for sure.
     * - If the FIRST bid was sent, the 'currentItemPrice' is set to the 
     * auctionItem 'startingBid' price. 
     * - The action buttons are disabled if you're winning.
     * - If there was a player01, its name gets recycled, else creates him a name.
     * - The previous player01 gets destroyed. (note: maybe there is possible improved way to do this...).
     * - Creates new player01 with user's character properties.
     * - player02 gets destroyed along with its name.(note: maybe there is possible improved way to do this...).
     */
    async auctionFreshStart() {
        try {
            this.auction.set('winningPlayer', user.currentUser());

            if (!this.auction.get('currentItemPrice'))
                this.auction.set('currentItemPrice', this.auction.get('auctionItem').getStartingBid());

            await this.auction.save();

            this.enableActionButtons(this.auction.get('winningPlayer').id !== user.currentUser().id);

            this.player01Name ? this.player01Name.text = this.auction.get('winningPlayer').get('username')
                : this.player01Name = this.createPlayerName(this.auction.get('winningPlayer').get('username'), true);

            if (this.player01) this.player01.destroy();

            this.player01 = this.createPlayer(true);

            // player2 name deleted
            this.player02Name.destroy();
            this.player02.destroy();

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Enables action buttons, defaults to TRUE.
     * @param {boolean} enable set it to true, to enable, false, to disable.
     */
    enableActionButtons(enable = true) {
        [
            this.buttonKick,
            this.buttonPunch,
            this.buttonWeapon,
            this.buttonSpecial
        ].forEach(e => e.inputEnabled = enable);
    }

    /**
     * Executes an specific action that sets updates to the auction, respectively,
     * the currentItemPrice, and firstServed(the first who performed an action before
     * triggering the update).
     * - If there is a winning player and It is not me, proceed with the action,
     * else, it can only means that there is no one yet into the auction and then
     * I was able to execute an action, leading to a fresh start.
     * @param {number} increment the value increment the auction price.
     * @param {Phaser.Tween} tween the respective tween to execute.
     */
    setAction(increment, tween) {
        if (this.auction.get('winningPlayer') && (this.auction.get('winningPlayer').id !== user.currentUser().id)) {

            this.auction.set('currentItemPrice', this.auction.get('currentItemPrice') + increment);

            this.auction.set('firstServed', {
                user: this.currentUser,
                action: increment
            });

            if (this.time.days === 0 && this.time.hours === 0 && this.time.minutes === 0)
                this.auction.set('antiSniper', true);

            this.timeToUpdate = true;
            this.action = tween;
        }
        else
            this.auctionFreshStart();
    }

    /**
     * Assigns functions to existing buttons.
     */
    buttonsFunctionality() {
        this.buttonPunch.events.onInputDown.add(target => {
            this.setAction(.25, this.closePunch);
        });
        this.buttonKick.events.onInputDown.add(target => {
            this.setAction(.5, this.kick);
        });
        this.buttonWeapon.events.onInputDown.add(target => {
            this.setAction(1, this.closerSlash);
        });
        this.buttonSpecial.events.onInputDown.add(target => {
            this.setAction(2, this.fartherSlash);
        });

        //this.buttonItemInfo;
    }

    /**
     * Creates arena information displayers.
     * - Respectively: base health containers, health bars, time panel, price panel;
     */
    createInformationDisplayers() {
        let x = this.game.world.centerX;
        let y = this.game.world.centerY;

        this.player01BaseHealth = this.game.add.sprite(x - 524, y + 970, 'arena', 'PlayerGuage_Base.png');
        this.player02BaseHealth = this.game.add.sprite(x + 524, y + 970, 'arena', 'PlayerGuage_Base.png');

        this.player01Health = this.game.add.sprite(x - 530, y + 970, 'arena', 'PlayerGuage_Health.png');
        this.player02Health = this.game.add.sprite(x + 530, y + 970, 'arena', 'PlayerGuage_Health.png');

        this.timePanel = this.game.add.sprite(x + 8, y + 1242, 'arena', 'Backboard_TIME.png');

        this.pricePanel = this.game.add.sprite(x - 10, y + 1338, 'arena', 'Backboard_VALUE.png');
    }


    /**
     * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene. 
     * - Use when heading to another Scene.
     */
    shutdown() {
        Helper.stopRegressiveTimer();

        this.subscription.unsubscribe();

        this.player01BaseHealth.destroy();
        this.player02BaseHealth.destroy();
        this.player01Health.destroy();
        this.player02Health.destroy();
        this.timePanel.destroy();
        this.pricePanel.destroy();

        if (this.winnerMessage && this.gameOver) {
            this.winnerMessage.destroy();
            this.gameOver.destroy();
        }

        this.buttonPunch.destroy();
        this.buttonKick.destroy();
        this.buttonWeapon.destroy();
        this.buttonSpecial.destroy();
        this.buttonItemInfo.destroy();

        if (this.player01) {
            this.player01.destroy();
            this.player01Name.destroy();
        }

        if (this.player02) {
            this.player02.destroy();
            this.player02Name.destroy();
        }

        this.queue.destroy();
        this.initialTime.destroy();
        this.initialPrice.destroy();

        this.action = null;
        this.timeToUpdate = null;
        this.auctionItem = null;
        this.auctionItemId = null;
        this.subscription = null;
    }
}