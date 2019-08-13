/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import WebFont from 'webfontloader';

// JSON OBJECT
import characterAssetsJsonObject from '../assets/data/character.json';

// DATA
import characterAssetsJsonPath from '../assets/data/character.txt';
import islandAssetsJsonPath from '../assets/data/island.txt';
import tileMapJson from '../assets/maps/SceneMap/map.txt';

// IMAGES/SPRITESHEETS
import islandAtlas from '../assets/images/island.png';
import characterAtlas from '../assets/images/character.png';
import tileSet from '../assets/images/tileSet.png';
import temporaryBG from '../assets/images/temporarybg.png';
import whiteLayer from '../assets/images/white_layer.png';

import { Utils } from '../utils/utils';
import { Building } from '../prefabs/Building';
import { Piece } from '../prefabs/Piece';
import { Helper } from '../utils/helper';
import { Keyboard } from '../prefabs/Keyboard';
import * as user from '../parse/user';
import * as userCharacter from '../parse/userCharacter';
import { addExpSignals } from "../xpengine/engine";

/** 
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli, Kino A. Rose
 * @doc Map scene for displaying the game map and for the player
 * to transition between the other attractions.
 * @class SceneMap
 * @extends {Phaser.State}
 */
export class SceneMap extends Phaser.State {
    constructor() {
        super();
    }

    /**
     * @param {Object} entrance contains new 'point' information for player to start at when back to this scene.
     */
    init(entrance) {
        entrance ? this.entrance = entrance : this.entrance = null;
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        
    }

    preload() {
        this.loadJsonData();
        this.loadFonts();
        this.loadImages();
        this.loadSpriteSheets();
        
        this.loadCharacter();
    }

    /**
     * Loads fonts for Phaser.
     */
    loadFonts() {
        WebFont.load({
            custom: {
                families: [
                    'Fixedsyswoff'
                ]
            }
        });
    }

    loadSpriteSheets() {
		// Loading Atlas Spritesheet
        this.game.load.atlasJSONHash('character', characterAtlas , characterAssetsJsonPath); //characterAtlas,
		
		// MAP
		this.game.load.atlasJSONHash('island', islandAtlas, islandAssetsJsonPath);
    }

     /**
     * Loads single images.
     */
    loadImages() {
		this.game.load.image('tileSet', tileSet); // maybe not necessary here
		this.game.load.image('temporarybg', temporaryBG);
		this.game.load.image('white_layer', whiteLayer);
    }

     /**
     * Loads json files.
     * - 'Texts' are usually used for data checking.
     * - 'Tilemap' is for any scene that requires map.
     */
    loadJsonData() {
        this.game.load.text('island', islandAssetsJsonPath); 
		this.game.load.text('character', characterAssetsJsonPath); 
		
		
		//this.game.load.text('isometrics', isometricsJson); // this is for the arena
		
		
        this.game.load.tilemap('SceneMap', tileMapJson, null, Phaser.Tilemap.TILED_JSON);
    }

    create() {}

    update() {
        if (Helper.sceneMapPopupContext) {
            //this.addPopUpWindow(); //Helper.sceneMapPopupContext.scene, Helper.sceneMapPopupContext.text
            Helper.sceneMapPopupContext = null;
        }
        Helper.shuffleCharacter(this.game, this.character, [this.nightLayer], this.decorationAfterPlayer);
    }

    addVersionText() {
        this['versionText'] =
            this.game.add.text(0, 0, `Version: ${Utils.VERSION}`, { font: '20px', fill: 'white' });
    }

    /**
     * Adds the map to scene and sets its properties.
     * - Path is the walkable area.
     * - Wall is the forbidden area, where collision is applied.
     * - Entrances are small walkable areas in front of each interactable building.
     * These data is extracted from the respective json map data, 'MapObjects'.
     */
    addMapData() {
        this.timeZone = new Date();
        this.map = this.game.add.tilemap('SceneMap');

        // tileMapData
        this.map.addTilesetImage('tileSet', 'tileSet');
        this.path = this.map.createLayer('Path');
        this.wall = this.map.createLayer('Wall');
        this.entrances = this.map.createLayer('Entrances');
        this.badTiles = [1];

        //collison tile list far from perfect but plugin reads them just fine
        this.map.setCollision(this.badTiles, true, this.wall);

        this.entranceLocations = new Map([
            ['boat', this.map.objects['MapObjects'][0]],
            ['vendor', this.map.objects['MapObjects'][1]],
            ['arena', this.map.objects['MapObjects'][2]],
            ['bar', this.map.objects['MapObjects'][3]],
            ['vote', this.map.objects['MapObjects'][4]],
            ['temple', this.map.objects['MapObjects'][5]],
        ]);

        this.island = new Building(this.game, 'Island_Base.png');
        this.island.anchor.setTo(0);
        this.island.scale.setTo(1);
        this.island.width = 1600;
        this.island.height = 896;

        // TEST //////////
        // :DDDD 
        //this.game.add.image(0, 0, 'temporarybg');


        //if (this.timeZone.getHours() >= 18 && this.timeZone.getHours() < 24 || this.timeZone.getHours() < 7)
        //this.nightLayer = this.game.add.image(0, 0, 'black_layer');
        //console.log('timezone: ' + this.timeZone.getHours());
        //////////////////
    }

    /**
     * Adds buildings to the scene.
     * - Remember to add anything created here into the buildings Array.
     */
    addBuildings() {
        // adding buildings
        this.boat = new Building(this.game, 'Ship_4.png', null, null, this.game.world.centerX - 602, this.game.world.centerY + 452);
        this.boat.animations.add('default', Phaser.Animation.generateFrameNames('Ship_', 0, 4, '.png'), 2, false);
        this.boat.play('default');

        this.vendor = new Building(this.game, 'Building_Vendors.png', this.entranceLocations.get('vendor'));
        this.vendor.x += 14;
        this.vendor.y += 60;

        this.arena = new Building(this.game, 'Building_Stadium_0.png', this.entranceLocations.get('arena'), 'SceneAuction');
        this.arena.y += 84;
        this.arena.animations.add('default', Phaser.Animation.generateFrameNames('Building_Stadium_', 0, 2, '.png'), 1, true);
        this.arena.play('default');

        this.bar = new Building(this.game, 'Building_TheSpot.png', this.entranceLocations.get('bar'));
        this.bar.x += 6;
        this.bar.y += 12;

        // player gets behind it
        this.barTop = new Building(this.game, 'Building_TheSpot_Sign_Base_0.png', this.entranceLocations.get('bar'));
        this.barTop.animations.add('default', Phaser.Animation.generateFrameNames('Building_TheSpot_Sign_Base_', 0, 5, '.png'), 3, true);
        this.barTop.play('default');
        this.barTop.y -= 200;

        // player gets behind it
        this.barLogo = new Building(this.game, 'Building_TheSpot_Sign_Logo.png', this.entranceLocations.get('bar'));
        this.barLogo.y -= 200;

        this.vote = new Building(this.game, 'Building_VotingStation.png', this.entranceLocations.get('vote'));
        this.vote.y += 3;

        this.temple = new Building(this.game, 'Building_Temple_0.png', this.entranceLocations.get('temple'));
        this.temple.y += 160;
        this.temple.x -= 2;
        this.temple.animations.add('default', Phaser.Animation.generateFrameNames('Building_Temple_', 0, 4, '.png'), 8, true);
        this.temple.play('default');

        this.buildings = [
            this.boat,
            this.vendor,
            this.arena,
            this.bar,
            this.barLogo,
            this.barTop,
            this.vote,
            this.temple
        ];
    }

    /**
     * Adds decorations to the scene.
     * - Remember to add anything created here into the enviroment Array.
     */
    addEnviroment() {

        // easy to control multiple sprites which share the same frameName if they are placed in a group.
        this.torches = this.add.group();
        [
            { x: this.game.world.centerX - 698, y: this.game.world.centerY + 160 },
            { x: this.game.world.centerX - 562, y: this.game.world.centerY + 160 },
            { x: this.game.world.centerX - 394, y: this.game.world.centerY + 20 },
            { x: this.game.world.centerX - 154, y: this.game.world.centerY + 220 },
            { x: this.game.world.centerX - 58, y: this.game.world.centerY + 220 },
            { x: this.game.world.centerX + 542, y: this.game.world.centerY - 63 },
            { x: this.game.world.centerX + 674, y: this.game.world.centerY - 63 },
        ].forEach(axis => {
            this.torches.add(new Building(this.game, 'Torch_0.png', null, null, axis.x, axis.y));
        });
        this.torches.forEach(torch => {
            torch.animations.add('default', Phaser.Animation.generateFrameNames('Torch_', 0, 4, '.png'), 8, true);

            torch.play('default');
        });

        this.templeFountain = new Building(this.game, 'Building_Temple_Fountain_0.png', null, null, this.game.world.centerX + 610, this.game.world.centerY + 32);
        this.templeFountain.animations.add('default', Phaser.Animation.generateFrameNames('Building_Temple_Fountain_', 0, 3, '.png'), 2, true);
        this.templeFountain.play('default');

        this.squirt = new Building(this.game, 'Building_Temple_Squirt_6.png', null, null, this.game.world.centerX + 610, this.game.world.centerY - 12);
        this.squirt.animations.add('default', Phaser.Animation.generateFrameNames('Building_Temple_Squirt_', 0, 6, '.png'), 8, false);

        // turns invisible when animation completes.
        this.squirt.alpha = 0;
        this.squirt.events.onAnimationComplete.add(() => this.squirt.alpha = 0);

        // plays every two and a halph seconds(1000ms * 2.5) and sprite becomes visible.
        const squirtPlay = this.game.time.events.loop(Phaser.Timer.SECOND * 2.5, () => {
            this.squirt.play('default');
            this.squirt.alpha = 1;
        });

        //const squirtPlayInterval = this.game.time.events.loop(interval + 1000, () => this.squirt.alpha = 0);

        this.beachFire = new Building(this.game, 'BeachFire_0.png', null, null, this.game.world.centerX - 260, this.game.world.centerY + 376);
        this.beachFire.animations.add('default', Phaser.Animation.generateFrameNames('BeachFire_', 0, 3, '.png'), 10, true);
        this.beachFire.play('default');

        this.beachChair = new Building(this.game, 'Building_BeachChairs.png', null, null, this.game.world.centerX + 662, this.game.world.centerY + 312);

        this.bird = new Building(this.game, 'Birdie_Idle.png', null, null, this.game.world.centerX + 600, this.game.world.centerY + 208);

        this.volleyballNet = new Building(this.game, 'Building_VolleyBallNet.png', null, null, this.game.world.centerX + 402, this.game.world.centerY + 390);

        this.bushA1 = new Building(this.game, 'Bush_A.png', null, null, this.game.world.centerX + 610, this.game.world.centerY + 121);
        this.bushA2 = new Building(this.game, 'Bush_A.png', null, null, this.game.world.centerX + 710, this.game.world.centerY + 69);
        this.bushB = new Building(this.game, 'Bush_B.png', null, null, this.game.world.centerX - 322, this.game.world.centerY - 3);
        this.bushC = new Building(this.game, 'Bush_C.png', null, null, this.game.world.centerX + 355, this.game.world.centerY + 189);
        this.bushD1 = new Building(this.game, 'Bush_D.png', null, null, this.game.world.centerX + 286, this.game.world.centerY + 25);
        this.bushD2 = new Building(this.game, 'Bush_D.png', null, null, this.game.world.centerX + 450, this.game.world.centerY + 25);
        this.bushD2.scale.setTo(-4, 4);
        this.bushE = new Building(this.game, 'Bush_E.png', null, null, this.game.world.centerX - 226, this.game.world.centerY + 141);

        this.GUI_ButtonArea = new Building(this.game, 'GUI_ButtonArea.png');
        this.GUI_ButtonArea.anchor.setTo(0);

        this.treeB1 = new Building(this.game, 'Tree_B.png', null, null, this.game.world.centerX - 738, this.game.world.centerY + 72);
        this.treeB2 = new Building(this.game, 'Tree_B.png', null, null, this.game.world.centerX + 454, this.game.world.centerY - 104);

        this.plant1 = new Building(this.game, 'Plant_A.png', null, null, this.game.world.centerX - 510, this.game.world.centerY + 24);
        this.plant2 = new Building(this.game, 'Plant_A.png', null, null, this.game.world.centerX - 26, this.game.world.centerY + 136);
        this.plant3 = new Building(this.game, 'Plant_A.png', null, null, this.game.world.centerX + 514, this.game.world.centerY + 165);

        this.enviroment = [
            this.templeFountain,
            this.squirt,
            this.beachFire,
            this.beachChair,
            this.bird,
            this.volleyballNet,
            this.bushA1,
            this.bushA2,
            this.bushB,
            this.bushC,
            this.bushD1,
            this.bushD2,
            this.bushE,
            this.GUI_ButtonArea,
            this.treeB1,
            this.treeB2,
            this.plant1,
            this.plant2,
            this.plant3
        ]
    }

    /**
     * Creates and Array with everything that needs to go on top of the character.
     * - By default the z-index order is the order of creation, so the character being the 
     * last one created, it is on top of everything.
     */
    addDecorationAfterPlayer() {
        this.decorationAfterPlayer = [
            this.barTop,
            this.barLogo,
            this.bushA1,
            this.bushC,
            this.bushE,
            this.plant2,
            this.plant3,
            this.squirt,
            this.beachFire
        ];
    }

    /**
     * Loads the player's character data before scene starts.
     * - Gathers character's pieces data.
     * - On success: If character is not in localStorage, calls getCharacter() async function.
     * Assembles all the pieces of the character into a Map, for better control.
     * Starts preloading scene.
     */
    async loadCharacter() {

        this.characterPieces = characterAssetsJsonObject;

        try {
            //if (!localStorage.getItem('character') || localStorage.getItem('character') === undefined) {
                this.convertedCharacter = await userCharacter.getCharacter(user.currentUser());
                sessionStorage.setItem('character', JSON.stringify(this.convertedCharacter));
            //} else
               // this.convertedCharacter = JSON.parse(localStorage.getItem('character'));

            this.characterAssembled = new Map([
                ['body', JSON.parse(this.convertedCharacter.body)],
                ['eyecolour', JSON.parse(this.convertedCharacter.eyecolour)],
                ['facewear', JSON.parse(this.convertedCharacter.facewear)],
                ['facialhair', JSON.parse(this.convertedCharacter.facialhair)],
                ['footwear', JSON.parse(this.convertedCharacter.footwear)],
                ['hairstyle', JSON.parse(this.convertedCharacter.hairstyle)],
                ['hands', JSON.parse(this.convertedCharacter.hands)],
                ['headwear', JSON.parse(this.convertedCharacter.headwear)],
                ['lowerbody', JSON.parse(this.convertedCharacter.lowerbody)],
                ['upperbody', JSON.parse(this.convertedCharacter.upperbody)],
                ['weapon', JSON.parse(this.convertedCharacter.weapon)]
            ]);

            // the order is important!
            this.load.onLoadComplete.addOnce(() => {
                this.addMapData();
                this.addCharacter();
                this.addBuildings();
                this.addEnviroment();
                this.addDecorationAfterPlayer();
            });

            this.load.start();
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Adds character to the scene.
     * - He is placed at a custom entrance location(if existent) or on the boat.
     */
    addCharacter() {
        this.keyboard = new Keyboard(this.game);
        this.character = {};
        const boat = this.entranceLocations.get('boat');
        let x;
        let y;

        // if begining, else start in front of the last building
        if (this.entrance) {
            x = this.entrance.x;
            y = this.entrance.y;
        } else {
            x = boat.x + (boat.width / 2);
            y = boat.y - (boat.height / 2);
        }

        // calling an existent character
        this.characterAssembled.forEach((characterPiece, key) => {
            if (characterPiece.key)
                this.character[`${key}`] = new Piece(this.game, characterPiece, this.wall, this.map, x, y, null,this.keyboard); 
        });
        this.attachCharacterExpSystem(this.character);
    }

    attachCharacterExpSystem(character) {
        addExpSignals(character);
    }

    // TEST
    addWindow() {
        //Add Window To Map Scene
        /*
        const testWindow = WindowManager.createWindow('', 100, 100, 125, 100);
        testWindow.setTextString('Evoloot The Game', true);
        testWindow.setWordWrap(true);
        testWindow.setWordWrapWidth(100);
        this.game.add.existing(testWindow); */
    }

    /* deprecated, too complex, needs a complete rewrite.
    keyboardInteractListener(entranceLocations, characterBody) {
        const bar = entranceLocations.get('bar');
        this.game.input.keyboard.addCallbacks(this, event => {
            if (characterBody.body)
                if (event.key === 'e') {
                    if ((characterBody.body.x >= bar.x && characterBody.body.x <= (bar.x + bar.width)) &&
                        (characterBody.body.y >= bar.y && characterBody.body.y <= (bar.y + bar.height))) {
                        const text = `<p id='question-text'> Enter Forum? </p>`;
                        // Now make the window for the SceneForum pop up :D
                        this.sceneMapConfirmationPopup.style.display = 'block';
                        this.sceneMapEnterQuestion.insertAdjacentHTML('afterbegin', text);
                        this.sceneMapConfirmation.addEventListener('click', event => {
                            event.preventDefault();
                            const garbage = document.getElementById('question-text');
                            if (garbage)
                                garbage.parentNode.removeChild(garbage);
                            //this.enterQuestion.removeChild(document.getElementById('question-text'));
                            this.sceneMapConfirmationPopup.style.display = 'none';
                            SceneManager.goto('SceneForum');
                        });
                        this.sceneMapNegation.addEventListener('click', event => {
                            event.preventDefault();
                            const garbage = document.getElementById('question-text');
                            if (garbage)
                                garbage.parentNode.removeChild(garbage);
                            //this.enterQuestion.removeChild(document.getElementById('question-text'));
                            this.sceneMapConfirmationPopup.style.display = 'none';
                        });
                    }
                }
        });
    }*/


    // TEST, possibly deprecated.
    savePlayerPosition() {
        const { x, y } = this.character.body;
        this.playerPosition = new Phaser.Point(x, y);
    }

    /**
	 * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene. 
	 */
    shutdown() {
         //this.savePlayerPosition();

        this.timeZone = null;

        this.badTiles = null;
        this.entranceLocations = null;

        this.entrance = null;

        this.path.destroy();
        this.wall.destroy();
        this.entrances.destroy();
        this.map.destroy();

        this.buildings.forEach(e => e.destroy());
        this.enviroment.forEach(e => e.destroy());

        this.keyboard.destroyKeyboard();

        this.characterAssembled.forEach((characterPiece, key) => {
            if (characterPiece.key) this.character[`${key}`].destroy();
        });

        this.character = null;
        this.characterAssembled = null;
    }


    /**
     * Debug purposes.
     */
    render() {

        //if (this.character)
        //Visible character collision box
        //this.game.debug.body(this.character.body);
    }
}
