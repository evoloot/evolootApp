import { Utils } from '../utils/utils';
import { SceneManager } from '../managers/SceneManager';
import { WindowManager } from '../managers/WindowManager';
import { Building } from '../prefabs/Building';
import { Piece } from '../prefabs/Piece';
import { Helper } from '../utils/helper';
import { Keyboard } from '../prefabs/Keyboard';
import * as MapTemplates from '../templates/SceneMapTemplates';
import * as Auth from '../parse/user';
import * as Parse from 'parse';
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
    }

    preload() {
        this.loadCharacter();
    }

    create() {
        const body = document.getElementById('root');
        body.insertAdjacentHTML('afterbegin', MapTemplates.alertPopup);
        this.sceneMapConfirmationPopup = document.getElementById('id03');
        this.sceneMapEnterQuestion = document.getElementById('enter-question');
        this.sceneMapConfirmationPopup.style.display = 'none';

        //this.addVersionText();
        ////////////
        this.sceneMapConfirmationPopup;

        this.stateStack = [];
        this.SceneModal;
        this.sceneReturn;

        this.createModalStates();

        // Generic, must be made global
        this.nextStateLevel('start'); // Helper.nextStateLevel(mapKey, this.setButtonFunctions() {...});

        this.setButtonFunctions('start');

        this.userLogout();
        /////////////

    }

    update() {
        if (Helper.sceneMapPopupContext) {
            this.addPopUpWindow(Helper.sceneMapPopupContext.scene, Helper.sceneMapPopupContext.text);
            Helper.sceneMapPopupContext = null;
        }
        Helper.shuffleCharacter(this.game, this.character, [this.nightLayer], this.decorationAfterPlayer);

        this.return();
    }


	/**
     * Sets the specific navigation, header, dialog and content box based on the 'mapKey' to show on the screen.
	 * - Each page is that is not heavy game based will usually be composed by a html modal on top. 
	 * - calls insertNewModalContent() function.
	 * - calls setsetButtonFunctions() function.
	 * - inserts current state to the stateStack Array, if not yet added.
     * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
     */
    nextStateLevel(mapKey) {
        const modalTemplate = `<div id="modal">${this.pageState.get(mapKey).nav}</div>`;

        this.insertNewModalContent(modalTemplate);
        this.setButtonFunctions(mapKey);

        if (!this.stateStack.find(e => e === mapKey)) this.stateStack.push(mapKey);
    }

    /**
	 * Creates a Map to keep the modal states this scene will have.
	 * - Each page state has a key associted to the action and its level(if present).
	 * - Each modal object is usually composed by the main elements of navigation, header, content and footer.
	 * - The attributes are html strings.
	 */
    createModalStates() {
        this.pageState = new Map();

        this.pageState.set('start', {
            nav: MapTemplates.headerBox,
            header: '&nbsp',
            content: '&nbsp',
            footer: '&nbsp'
        });
    }

    /**
	 * Displays a new modal to the top a Scene.
	 * - This removes and replaces any current modal displaying.
	 * - Modal is inserted inside the 'root' container.
	 * @param {string} modalTemplate : A html string.
	 */
    insertNewModalContent(modalTemplate) {
        if (this.SceneModal)
            this.SceneModal.parentNode.removeChild(this.SceneModal);

        const body = document.getElementById('root');
        body.insertAdjacentHTML('afterbegin', modalTemplate);
        this.SceneModal = document.getElementById('modal');
        this.sceneReturn = document.getElementById('return');
    }

	/**
     * Sets the functionality of the current 'content' components of the current modal state and level(if present).
     * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
     */
    setButtonFunctions(mapKey) {
        /*
		switch (mapKey) {

            case 'start':
            break;
        } */
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

        this.characterPieces = JSON.parse(this.game.cache.getText('Character_Pieces'));

        try {
            if (!localStorage.getItem('character')) {
                this.convertedCharacter = await this.getCharacter();
                localStorage.setItem('character', JSON.stringify(this.convertedCharacter));
            } else
                this.convertedCharacter = JSON.parse(localStorage.getItem('character'));

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
     * Retrieves user's character data from database.
     */
    async getCharacter() {
        const Character = Parse.Object.extend('Character');
        const query = new Parse.Query(Character);

        try {
            query.equalTo('parent', Auth.currentUser()).toJSON();
            const search = await query.first();

            const turn = JSON.stringify(search);
            const character = JSON.parse(turn);

            return character;
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
                this.character[`${key}`] = new Piece(this.game, characterPiece, this.wall, this.map, x, y, null, this.keyboard)
        });
        this.attachCharacterExpSystem(this.character);
    }

    attachCharacterExpSystem(character) {
        addExpSignals(character);
    }

    // TEST
    addWindow() {
        //Add Window To Map Scene 
        const testWindow = WindowManager.createWindow('', 100, 100, 125, 100);
        testWindow.setTextString('Evoloot The Game', true);
        testWindow.setWordWrap(true);
        testWindow.setWordWrapWidth(100);
        this.game.add.existing(testWindow);
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

    /**
     * Throws a popup window asking the user how he wants to proceed after an interaction with a building.
     * - On corfimation: destroys popup, redirect user to next scene.
     * - On negation: destroys popup, the user remains in the map.
     * @param {string} scene key name of which scene to switch to.
     * @param {string} text custom text content of the popup window.
     */
    addPopUpWindow(scene, text) {
        let popupButtons = `&nbsp`;

        if (scene) {
            popupButtons = `${MapTemplates.popupButtonYesNo}`;
        } else {
            popupButtons = `${MapTemplates.popupButtonOk}`;
        }

        this.sceneMapEnterQuestion.insertAdjacentHTML('afterbegin', `
            <div id='question-text'>${text}</div>
        `);

        this.sceneMapEnterQuestion.insertAdjacentHTML('afterend', `
            <div id="buttons">${popupButtons}</div>
        `);

        this.sceneMapConfirmation = document.getElementById('yes');
        this.sceneMapNegation = document.getElementById('no');

        this.sceneMapConfirmationPopup.style.display = 'block';

        const garbage = document.getElementById('question-text');
        const garbage2 = document.getElementById('buttons');

        if (this.sceneMapConfirmation)
            this.sceneMapConfirmation.addEventListener('click', event => {
                event.preventDefault();

                if (garbage)
                    garbage.parentNode.removeChild(garbage);

                if (garbage2)
                    garbage2.parentNode.removeChild(garbage2);

                this.sceneMapConfirmationPopup.style.display = 'none';

                this.reset();

                SceneManager.goto(scene);
            });

        if (this.sceneMapNegation)
            this.sceneMapNegation.addEventListener('click', event => {
                event.preventDefault();

                if (garbage)
                    garbage.parentNode.removeChild(garbage);

                if (garbage2)
                    garbage2.parentNode.removeChild(garbage2);

                this.sceneMapConfirmationPopup.style.display = 'none';
            });

    }

    // TEST, possibly deprecated.
    savePlayerPosition() {
        const { x, y } = this.character.body;
        this.playerPosition = new Phaser.Point(x, y);
    }

    shutdown() {
        //this.savePlayerPosition();
    }

    /**
	 * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene. 
	 * - Use when heading to another Scene.
	 */
    reset() {
        if (this.sceneMapConfirmationPopup)
            this.sceneMapConfirmationPopup.parentNode.removeChild(this.sceneMapConfirmationPopup);

        if (this.SceneModal)
            this.SceneModal.parentNode.removeChild(this.SceneModal);

        this.stateStack = null;
        this.SceneModal = null;
        this.sceneReturn = null;
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
     * Listens for any click in 'logout' and calls logout() async function. Needs improvement.
     */
    userLogout() {
        const logout = document.getElementById('logout');

        if (logout) logout.addEventListener('click', e => {
            e.preventDefault();
            console.log('I\'ve been clicked to logout :D');

            this.logout();
        });
    }

    /**
     * Performs user logout, directing him to the SceneTitle.
     * - It will remove 'remember' from localStorage, meaning the user will have to login next time.
     * - It will remove user's character from localStorage.
     */
    async logout() {
        try {
            await Auth.signOut();

            this.reset();

            if (localStorage.getItem('remember')) localStorage.removeItem('remember');
            if (localStorage.getItem('character')) localStorage.removeItem('character');

            SceneManager.goto('SceneTitle');
        } catch (error) {
            console.log(error);
        }
    }

    /**
	 * Returns to previous state or state level(if existent), else, returns to a previous Scene.
	 * - Case there is a previous state, it will remove the current(last) from the stateStack Array.
	 */
    return() {

        if (this.sceneReturn && this.sceneReturn.checked) {
            this.stateStack.pop();

            if (this.stateStack.length > 0) {
                const previousTemplate = this.stateStack[this.stateStack.length - 1];
                this.nextStateLevel(previousTemplate);
            } else {
                console.log('I\'ve been checked.');

                if (JSON.parse(localStorage.getItem('remember')).remember) {
                    this.reset();

                    SceneManager.goto('SceneTitle');
                }
                else this.logout();

            }

        }
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
