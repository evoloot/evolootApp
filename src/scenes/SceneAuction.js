/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import WebFont from 'webfontloader';

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
import AuctionItem from '../parse/AuctionItem';
import * as user from '../parse/user';
import * as parse from 'parse';

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

        this.temporaryAsyncLoader();
    }

    // TEST PURPOSES
    // it will be required a live server in order to update and display real time information
    async temporaryAsyncLoader() {
        this.auctionItem = new AuctionItem();
        this.currentUser = user.currentUser();
        let item;

        /*
        if (sessionStorage.getItem('itemId'))
            this.auctionItemId = sessionStorage.getItem('itemId');  */

        this.load.onLoadComplete.addOnce(() => {
            this.createScenario();

            // HERE name of the challenger, the current user, update assets to the new ones Adam sent
            this.createInformationDisplayers();

            /// current item price //////////////////
            //const startingBid = item.startingBid.toFixed(2);
            this.initialPrice = this.game.add.text(
                this.game.world.centerX + 15,
                this.game.world.centerY + 1342,
                '0000152.25',
                Style.setText(this.pricePanel, '#21c900', '21px', 'Digital'));

            /// current auction time left //////////////////
            this.initialTime = this.game.add.text(
                this.game.world.centerX + 60,
                this.game.world.centerY + 1242,
                '07:00:00',
                Style.setText(this.timePanel, '#e0ba2d', '22px', 'Digital'));


            this.player01Name = this.game.add.text(
                this.game.world.centerX - 564,
                this.game.world.centerY + 972,
                'iamapotato',
                Style.setText(this.player01BaseHealth, '#fff', '36px', 'Fixedsyswoff', 3));

            this.player02Name = this.game.add.text(
                this.game.world.centerX + 564,
                this.game.world.centerY + 972,
                this.currentUser.get('username'),
                Style.setText(this.player02BaseHealth, '#fff', '36px', 'Fixedsyswoff', 3));


            this.player01Name.anchor.setTo(.5);
            this.player02Name.anchor.setTo(.5);

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

        });

        try {

            //item = await this.auctionItem.retrieveAuctionItem('D4J143pHWB');
            //console.log(item);
            this.load.start();
        }
        catch (err) {
            console.log(err);
        }


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
        const client = new parse.LiveQueryClient({
            applicationId: '81X6CAml1OkjiBkHvz8NHRMtqblGkUrxuLf7DE4e',
            serverURL: 'wss://evoloottest.back4app.io', // Example: 'wss://livequerytutorial.back4app.io'
            javascriptKey: 'W9anKkCxFzcD9JCiCgNY8tZN122CEqUtmhsOpdWn'
        });
        client.open();
        
        let query = new parse.Query('Auction');

        try {
            let subscription = await query.subscribe();
            console.log(subscription);
        } catch (err) {
            console.log(err);
        }
    }

    create() {

        this.createPlayers();
        this.createQueue();
        this.createButtons();

        this.kick = this.attackAnimationHandler('kick');
        this.closePunch = this.attackAnimationHandler('closePunch');
        this.closerSlash = this.attackAnimationHandler('closerSlash');
        this.fartherSlash = this.attackAnimationHandler('fartherSlash');
        this.buttonsFunctionality();

        // TEST
        this.liveQueryTest();

        // common UI components setup
        this.UIComponents = [
            this.initialTime,
            this.initialPrice,
            this.pricePanel,
            this.timePanel,
            this.queue,
            this.buttonKick,
            this.buttonPunch,
            this.buttonSpecial,
            this.buttonWeapon,
            this.buttonItemInfo,
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

                [
                    this.buttonKick,
                    this.buttonPunch,
                    this.buttonWeapon,
                    this.buttonSpecial
                ].forEach(e => e.inputEnabled = true);
            }
        );

        attacked.start();
    }

    attackAnimationHandler(move) {
        const attack = this.game.add.tween(this.player02);

        const anim = this.player02.animations;

        const initialPlayer01Position = { x: this.player01.x, y: this.player01.y };
        const initialPlayer02Position = { x: this.player02.x, y: this.player02.y };

        attack.to({ x: this.player02.x - 340, y: this.player02.y }, 1000, Phaser.Easing.In);
        attack.onStart.add(() => {
            anim.play('moveRight');
            [
                this.buttonKick,
                this.buttonPunch,
                this.buttonWeapon,
                this.buttonSpecial
            ].forEach(e => e.inputEnabled = false);
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

    createPlayers() {
        // some characters //////////////////////////////
        // the winning player / this will be live reloading, meaning that it will be constantly changing as bets are being placed
        this.player01 = this.game.add.sprite(
            this.game.world.centerX - 180,
            this.game.world.centerY + 1420,
            'character', 'Medium_Feminine_Battle_Idle2.png'
        );

        // the player who just joined
        this.player02 = this.game.add.sprite(
            this.game.world.centerX + 180,
            this.game.world.centerY + 1420,
            'character', 'Medium_Feminine_Battle_Idle2.png'
        );

        this.player01.scale.setTo(4);
        this.player02.scale.setTo(-4, 4); // character facing left

        [
            this.player01,
            this.player02
        ].forEach(player => {
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
        });
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

    buttonsFunctionality() {
        [
            this.buttonKick,
            this.buttonPunch,
            this.buttonWeapon,
            this.buttonSpecial
        ].forEach(e => e.inputEnabled = true);

        this.buttonKick.events.onInputDown.add(target => {
            this.kick.start();
        });
        this.buttonPunch.events.onInputDown.add(target => {
            this.closePunch.start();
        });
        this.buttonWeapon.events.onInputDown.add(target => {
            this.closerSlash.start();
        });
        this.buttonSpecial.events.onInputDown.add(target => {
            this.fartherSlash.start();
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
        // REMEMBER THAT IT IS VERY IMPORTANT TO DESTROY EVERYTHING HERE!
    }
}


/*
import React, { Component } from 'react';
import './App.css';

import * as Parse from 'parse';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: null,
      todosList: []
    }

    Parse.serverURL = "https://todotutorial.back4app.io";
    Parse.initialize('j3dBLz81KYQPLUKsmuP0ahny8d1vsPjLpw0fUtxR', 'kIBgtNiI0637TDIwxlReLrq5yHSTyw95hJmvCGnz');

    this.createSubscription();
  }

  componentDidMount() {
    //this.getNewTodoList();
  }

  componentDidUpdate() {

  }

  createSubscription = async () => {
    this.query = new Parse.Query('message');

    try {
      let subscription = await this.query.subscribe();
      let result = await this.query.ascending('createdAt').limit(25).find();
      this.messages = new Set(result);



      // this event is triggered if successfully connected
      subscription.on('open', () => {
        this.getNewTodoList();
        console.log('subscription opened :D');
      });

      subscription.on('create', object => {
        this.messages.add(object);
        this.getNewTodoList();
        console.log('Object created :D');
      });

      subscription.on('delete', object => {
        this.messages.forEach(message => {
          if (message.id === object.id)
            this.messages.delete(message);
        });
        this.getNewTodoList();
        console.log('Object destroyed D:');
      });

      subscription.on('update', object => {
        this.getNewTodoList();
        console.log('Object updated :D');
      });

    } catch (err) {
      console.log(err);
    }
  }

  onChangeHandler = event => {

    if (event.target.value.trim() !== '')
      this.setState({
        todo: event.target.value
      });
  }

  onClickHandler = () => {
    if (this.state.todo) {
      let Message = Parse.Object.extend('message');
      const message = new Message();

      message.set('name', this.state.todo);
      message.set('completed', false);
      message.save();

      const input = document.querySelector('input');
      input.value = '';
    }
  }

  getNewTodoList = () => {
    this.setState({
      todosList: [...this.messages]
    });
  }

  updateTodo = event => {
    this.state.todosList.forEach(e => {
      if (e.id === event.target.id) {
        e.set('completed', event.target.checked);
        e.save();
      }
    });
    console.log('update?');
  }

  deleteChecked = () => {
    this.state.todosList.forEach(e => {
      if (e.get('completed')) {
        e.destroy();
      }
    });
  }

  deleteAll = () => {
    this.state.todosList.forEach(e => {
      e.destroy();
    });
  }

  displayTodosList = () => {
    console.log('getting here?');

    

    return this.state.todosList.map(message => {
      console.log(message.get('completed'));

      return (
        <li key={message.id}>
          <label htmlFor={message.id}>{message.get('name')}</label>
          <input
            type="checkbox"
            name={message.get('name')}
            id={message.id}
            onChange={this.updateTodo}
            
            checked={message.get('completed')} />
        </li>
      );
    });

  }

  render() {
    const todosList = this.displayTodosList();

    return (
      <div className="App">
        <input type="text" onChange={this.onChangeHandler} />
        <button onClick={this.onClickHandler}>ADD</button>

        <ol>
          {todosList}
        </ol>

        <button onClick={this.deleteAll}>DELETE ALL</button>
        <button onClick={this.deleteChecked}>DELETE COMPLETED</button>

        </div>
        );
      }
    }
    
    export default App;
    */