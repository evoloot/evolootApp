/* eslint-disable */
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import WebFont from 'webfontloader';

// JSON OBJECT
import characterAssetsJsonObject from '../assets/data/character.json';

// JSON DATA 
import characterAssetsJsonPath from '../assets/data/character.txt';

// IMAGES/SPRITESHEETS
import characterAtlas from '../assets/images/character.png';
import colorWheel from '../assets/images/color_wheel.png';
import tileSet from '../assets/images/tileSet.png';
import temporaryBG from '../assets/images/temporarybg.png';
import tvBG from '../assets/images/TV_BG.png';
import whiteLayer from '../assets/images/white_layer.png';
import blackLayer from '../assets/images/black_layer.png';
import backButton from '../assets/images/back.png';
import continueButton from '../assets/images/continue.png';
import greyWheel from '../assets/images/grey_wheel.png';
import colourGradient from '../assets/images/colour_gradient_large.png';
import characterPreview from '../assets/images/character_preview.png';
import panelHands from '../assets/images/cc_panel_hands.png';
import panelButton from '../assets/images/cc_panel_button.png';
import arrows from '../assets/images/Menu_Arrows.png';
import palette from '../assets/images/Menu_Palette.png';
import eyes from '../assets/images/eye_color_button.png';

import { Piece } from '../prefabs/Piece';
import { TurningHands } from '../prefabs/TurningHands';
import { OptionArrows } from '../prefabs/OptionArrows';
import { ColorPalette } from '../prefabs/ColorPalette';
import { TextButton } from '../prefabs/TextButton';
import { Helper } from '../utils/helper';
import { Keyboard } from '../prefabs/Keyboard';

/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Displays character customization scene.
 * @class SceneCustomization
 * @extends {Phaser.State}
 */
export class SceneCustomization extends Phaser.State {
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
		this.customObject = {};
		this.panelPosition = new Map();
		this.loadedPieces = new Map();
		this.textButtons = new Map();
		this.optionArrows = new Map();
		this.types = [];
		this.game.add.image(0, 0, 'temporarybg');
		const layer = this.game.add.image(0, 0, 'white_layer');
		layer.alpha = 0.47;
		this.game.add.image(350, 112, 'TV_BG');
		this.character = {};

		this.addJSONLists();
		this.addCustomizableElementsPanel();
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

    /**
     * Loads single images.
     */
    loadImages() {
		this.game.load.image('color_wheel', colorWheel);
		this.game.load.image('tileSet', tileSet); // maybe not necessary here
		this.game.load.image('temporarybg', temporaryBG);
		this.game.load.image('TV_BG', tvBG);
		this.game.load.image('white_layer', whiteLayer);
		this.game.load.image('black_layer', blackLayer);
		this.game.load.image('back', backButton);
		this.game.load.image('continue', continueButton);
		this.game.load.image('grey_wheel', greyWheel);
		this.game.load.image('colour_gradient_large', colourGradient);
		this.game.load.image('character_preview', characterPreview);
    }

    /**
     * Loads sprite sheets.
     */
    loadSpriteSheets() {
		// Loading Atlas Spritesheet
        this.game.load.atlasJSONHash('character', characterAtlas , characterAssetsJsonPath); //characterAtlas,
		
        this.game.load.spritesheet('cc_panel_hands', panelHands, 48, 43, 4, 0, 0);
        this.game.load.spritesheet('cc_panel_button', panelButton, 224, 59, 2, 0, 0);
        this.game.load.spritesheet('arrows', arrows, 30, 31, 4, 1, 1);
        this.game.load.spritesheet('palette', palette, 41, 41, 2, 0, 0); 
        this.game.load.spritesheet('eyes', eyes, 48, 43, 2, 0, 0);
    }

    /**
     * Loads json files.
     * - 'Texts' are usually used for data checking.
     * - 'Tilemap' is for any scene that requires map.
     */
    loadJsonData() {
    }

	/** 
	 * Custom panel item factory
     * - Overall settings of the customization panel item.
    * @param text An descriptive text to the element.
    * @param side The side to place the element, 'Left' or 'Right', if Left blank('') or null defaults to right.
    * @param order The order to place inside the panel.
    * @param object The Piece to customize.
    * @param type The attribute that is going to be customized in the Object, e.g.: customObject.item, type = 'item'.
    */
	addPanelElement(text, side = 'Right', order, object = null, type = null) {
		const buttonW = 225;
		const buttonH = 60;
		const initialHeight = 270;
		const leftWidth = 349;
		const rightWidth = 1214;
		const marginTop = buttonH + 20;
		let posX;
		let posY;
		if (side === 'Left') {
			posX = leftWidth + (buttonW / 2);
		}
		else {
			posX = (rightWidth - buttonW);
		}
		if (order > 0) {
			posY = initialHeight + (order * marginTop) + 1;
		}
		else {
			posY = initialHeight;
		}
		const btn = new TextButton(this.game, side, posX, posY, text);
		this.panelPosition.set(type, { posX, posY, side });

		if (object) {
			this.pieceSide = 1;

			this.objectAnimations = object.getSides();

			this.textButtons.set(type, btn);
			this.types.push(type);
			object.tint = Phaser.Color.getRandomColor();

			this.loadedPieces.set(type, {
				type,
				object,
				index: 1,
				sizeIndex: 0,
				weaponIndex: 1
			});

			this.savePieceToCustomObject(type);
			this.attachColorWheel(type);
			this.itemOption(type);

		}
	}

	/**
	 * Removes piece from the temporary saved character.
	 * - Doesn't actually remove, but turn values to null.
	 * @param {String} type the piece type identifier.
	 */
	removePiecefromCustomObject(type) {
		this.customObject[type] = {
			key: null,
			tint: null
		};
		this.stringObject = JSON.stringify(this.customObject);
		sessionStorage.setItem('character', this.stringObject);
	}

	/**
     * Save the new piece to the temporary saved character.
     * @param {String} type the piece type identifier.
     */
	savePieceToCustomObject(type) {
		const object = this.loadedPieces.get(type).object;

		this.customObject[type] = {
			key: object.frameName,
			tint: object.tint
		};

		this.stringObject = JSON.stringify(this.customObject);
		sessionStorage.setItem('character', this.stringObject);
	}

	/**
     * Attach a color wheel to work on a specific piece.
	 * - color wheel is disabled if piece does not exist(key is null).
     * @param {String} type the piece type identifier.
     */
	attachColorWheel(type) {
		let colorWheel;
		let position = this.panelPosition.get(type);
		if (type != 'eyecolour') {
			if (position.side === 'Left')
				colorWheel = new ColorPalette(this.game, position.posX + (196 - 60), position.posY);
			else
				colorWheel = new ColorPalette(this.game, position.posX - 22, position.posY);
		}
		else {
			colorWheel = new ColorPalette(this.game, this.game.world.centerX - 80, 570, 'eyes');
		}

		if (this.customObject[type].key)
			colorWheel.events.onInputUp.add(() => {
				if (!colorWheel.colorWheelOpen) {
					this.openColorWheel = true;
					// color pallete
					colorWheel.showPalette(position.side);
					colorWheel.swatch.events.onInputDown.add(() => {
						const colors = colorWheel.selectedTint.split('');
						const colorFix = '0x' + colors.slice(4).join('');
						this.loadedPieces.get(type).object.tint = colorFix;
						this.savePieceToCustomObject(type);
					});
				}
				else {
					colorWheel.closeColorWheel();
				}
			}, this);
		else
			colorWheel.animations.play('disabled');
	}

	/**
     * Attach arrows for selection of another piece of the same type.
     * @param {String} type the piece type identifier.
     */
	itemOption(type) {
		const position = this.panelPosition.get(type);
		const object = this.loadedPieces.get(type).object;

		const leftArrow = new OptionArrows(this.game, 'Left', position.posX - 59, position.posY + 28);
		const rightArrow = new OptionArrows(this.game, 'Right', position.posX + 207, position.posY + 28);
		this.optionArrows.set(type, {
			leftArrow,
			rightArrow
		});

		this.optionArrows.get(type).leftArrow.events.onInputUp.add(() => {
			this.optionChanger(object, type, 'Left');
		}, this);

		this.optionArrows.get(type).rightArrow.events.onInputUp.add(() => {
			this.optionChanger(object, type, 'Right');
		}, this);
	}

	/**
     * - Adds keyboard responsiveness to the scene. Needs Update. Possibly deprecated.
     */
	/*
	panelSelect() {
		let panelIndex = 0;
		let panelMaxIndex = this.types.length - 1;
		this.textButtons.get('body').highlight();
		this.keyboard.arrows.up.onDown.add(() => {
			this.textButtons.get(this.types[panelIndex]).default();
			--panelIndex;
			panelIndex < 0 ? panelIndex = panelMaxIndex : panelIndex;
			this.textButtons.get(this.types[panelIndex]).highlight();
		});
		this.keyboard.arrows.down.onDown.add(() => {
			this.textButtons.get(this.types[panelIndex]).default();
			++panelIndex;
			panelIndex > panelMaxIndex ? panelIndex = 0 : panelIndex;
			this.textButtons.get(this.types[panelIndex]).highlight();
		});
		this.keyboard.arrows.left.onDown.add(() => {
			let index = this.loadedPieces.get(this.types[panelIndex]).index;
			const arrayCopy = this.copyArray(this.loadedPieces.get(this.types[panelIndex]).array);
			this.loadedPieces.get(this.types[panelIndex]).index = this.indexOperation(arrayCopy, index, 'Left');
			this.optionChanger(arrayCopy, this.loadedPieces.get(this.types[panelIndex]).index, this.loadedPieces.get(this.types[panelIndex]).object, this.types[panelIndex]);
			this.optionArrows.get(this.types[panelIndex]).leftArrow.playLeft();
		});
		this.keyboard.arrows.left.onUp.add(() => this.optionArrows.get(this.types[panelIndex]).leftArrow.playDefaultLeft());
		this.keyboard.arrows.right.onDown.add(() => {
			let index = this.loadedPieces.get(this.types[panelIndex]).index;
			const arrayCopy = this.copyArray(this.loadedPieces.get(this.types[panelIndex]).array);
			this.loadedPieces.get(this.types[panelIndex]).index = this.indexOperation(arrayCopy, index, 'Right');
			this.optionChanger(arrayCopy, this.loadedPieces.get(this.types[panelIndex]).index, this.loadedPieces.get(this.types[panelIndex]).object, this.types[panelIndex]);
			this.optionArrows.get(this.types[panelIndex]).rightArrow.playRight();
		});
		this.keyboard.arrows.right.onUp.add(() => this.optionArrows.get(this.types[panelIndex]).rightArrow.playDefaultRight());
		this.keyboard.setKeyOnDown('R', () => this.sideChanger('Right'));
		this.keyboard.setKeyOnDown('L', () => this.sideChanger('Left'));
		this.keyboard.setKeyOnDown('ENTER', () => {
			this.game.add.image(0, 0, 'temporarybg');
			if (this.sceneCustomizationModalButtonRow)
				this.sceneCustomizationModalButtonRow.parentNode.removeChild(this.sceneCustomizationModalButtonRow);

			this.signUpClickListener();
			this.goBackListener();
		});
		this.keyboard.setKeyOnDown('BACKSPACE', () => {

			if (this.sceneCustomizationModalTitleRow)
				this.sceneCustomizationModalTitleRow.parentNode.removeChild(this.sceneCustomizationModalTitleRow);
			if (this.sceneCustomizationModalButtonRow)
				this.sceneCustomizationModalButtonRow.parentNode.removeChild(this.sceneCustomizationModalButtonRow);

			this.reset();
			SceneManager.goto('SceneTitle');
		});
	} */
///////////////////
	/**
     * Copies an array. 
	 * - Deprecated.
     * @param array Array of keys.
     * @returns Returns a filtered copy of the array.
     */  
	copyArray(array) {
		let newArray = [];
		// @ts-ignore
		let arrayCopy = [];
		newArray = this.filterOptionsArray(array);
		return arrayCopy = newArray.slice();
	}

	/**
     * Filters the possible options according with the current body. 
	 * - Deprecated.
     * @param array Array of keys.
     * @returns Filtered array of options for the current body.
     */ 
	filterOptionsArray(array) {
		const verifyArray = array[0].split('_');
		if (verifyArray.length === 2) {
			return array;
		}
		const size = this.loadedPieces.get('body').object.key;
		const tempArr = size.split('_');
		// verifies if element's first and second key parts is equal to the body first and second parts
		return array.filter(e => e.split('_')[0] === tempArr[0] && e.split('_')[1] === tempArr[1]);
	}

	/**
     * Character overall equipment changes accordingly to fit a new body size.
     */
	clothesChange() {
		let type = [];
		let category = [];
		// gets the current types and categories of the pieces.
		this.loadedPieces.forEach(e => {
			if (e.object.frameName) {
				type.push(e.object.frameName.split('_')[3]);

				if (e.object.frameName.split('_')[6])
					category.push(
						e.object.frameName.split('_')[4] + '_' +
						e.object.frameName.split('_')[5] + '_' +
						e.object.frameName.split('_')[6]
					);
				else
					category.push(
						e.object.frameName.split('_')[4] + '_' +
						e.object.frameName.split('_')[5]
					);
			}
		});

		let newClothes = [];
		// assemble the settled types and categories to the new body type and its size.
		for (let i = 0; i < type.length; ++i) {
			newClothes.push(
				this.loadedPieces.get('body').object.frameName.split('_')[0] + '_' +
				this.loadedPieces.get('body').object.frameName.split('_')[1] + '_' +
				this.loadedPieces.get('body').object.frameName.split('_')[2] + '_' +
				type[i] + '_' +
				category[i]
			);
		}

		const x = 680;
		const y = 309;

		// loads the new pieces.
		newClothes.forEach(e => {
			let keyType = e.split('_')[3].toLowerCase();

			this.loadedPieces.get(keyType).object.destroy();

			if (this.characterPieces[e]) {
				const newPiece = new Piece(this.game, null, null, null, x, y, e);
				newPiece.tint = this.customObject[keyType].tint;
				newPiece.customPlay(this.objectAnimations[this.pieceSide]);
				this.loadedPieces.get(keyType).object = newPiece;
				this.savePieceToCustomObject(keyType);
				this.attachColorWheel(keyType);
			} else
				console.log('This asset is not available');
		});
	}

	/**
     * When a new piece is chosen, character is reset in the screen.
     * - If the object is the body, then everything else will be replaced respectively as well.
     * @param {String} type the piece type identifier.
     * @param {Piece} object The replacement object.
     */
	resetCharacter(type, object) {
		this.loadedPieces.get(type).object = object;

		// Now HERE
		if (type === 'body') {
			this.clothesChange();
			this.loadedPieces.forEach(e => {
				e.object.customPlay(this.objectAnimations[this.pieceSide]);
			});
		}

		this.loadedPieces.get(type).object.customPlay(this.objectAnimations[this.pieceSide]);

		this.characterShuffle();
	}

	/**
	 * Places each character piece in the correct z-index order.
	 */
	characterShuffle() {
		this.loadedPieces.forEach((e, key) => {
			this.character[`${key}`] = e.object;
		});

		Helper.shuffleCharacter(this.game, this.character);
	}

	/**
     * Adds a button to modify character's eyes color.
     * @param {Piece} object Character's eyes.
     * @param {String} type the piece type identifier.
     */
	addEyeColorModifiers(object, type) {
		this.pieceSide = 1;
		this.objectAnimations = object.getSides();
		object.tint = Phaser.Color.getRandomColor();
		this.loadedPieces.set(type, {
			type,
			object,
			array: null,
			index: 0
		});
		this.panelPosition.set(type, { posX: 0, posY: 0, side: 'Left' });

		this.savePieceToCustomObject(type);
		this.attachColorWheel(type);
	}

	/**
     * Adds 'turning hands'(Left and Right) to be able to look
     * the character from all angles/sides.
     */
	addTurnCharacter() {
		if (!this.keyboard) this.keyboard = new Keyboard(this.game); //null 

		this.lHand = new TurningHands(this.game, 'Left', this.game.world.centerX, 600, this.keyboard);
		this.rHand = new TurningHands(this.game, 'Right', this.game.world.centerX + 50, 600, this.keyboard);
		this.rHand.events.onInputDown.add(() => {
			this.sideChanger('Right');
		});
		this.lHand.events.onInputDown.add(() => {
			this.sideChanger('Left');
		});
	}

	/**
     * Updates an index position from a given array.
     * - If it reaches the top of the array, goes to 0(the start of the array),
     * - if it reaches below 0, goes to the max value(the end of the array);
     * @param {Array<any>} array Array from which the index position is to be tracked.
     * @param {Integer} index Current index position.
     * @param {String} side The two options here are 'Right' which increases index, and 'Left' which decreases index.
     */
	indexOperation(array, index, side) {
		if (side === 'Right') {
			if (index < array.length - 1) {
				++index;
			}
			else {
				index = 0;
			}
		}
		else {
			if (index > 0) {
				--index;
			}
			else {
				index = array.length - 1;
			}
		}
		return index;
	}

	/**
     * Plays the current side/angle animation of the character.
     * @param {String} side One of the four sides of a Piece object.
     */
	sideChanger(side) {
		this.pieceSide = this.indexOperation(this.objectAnimations, this.pieceSide, side);

		this.loadedPieces.forEach(element => {
			element.object.customPlay(this.objectAnimations[this.pieceSide]);//animations.play(this.objectAnimations[this.pieceSide]);
		});

		this.characterShuffle();
	}

	/**
     * Updates the new Piece to the character, destroyng the previous.
     * @param {Piece} object The current object.
     * @param {String} type the piece type identifier.
	 * @param {String} direction current facing of the character's direction.
     */
	optionChanger(object, type, direction) {
		this.loadedPieces.get(type).index = this.indexOperation(this.categories, this.loadedPieces.get(type).index, direction);

		const x = object.x;
		const y = object.y;
		let sizeIndex = this.loadedPieces.get('body').sizeIndex;
		let index = this.loadedPieces.get(type).index;
		let newFrameName;

		switch (type) {
			case 'body':
				if (index === 0 && direction === 'Right') {
					index = 1;
				} else {
					index = this.categories.length - 1;
				}

				this.loadedPieces.get(type).sizeIndex = this.indexOperation(this.sizes, this.loadedPieces.get(type).sizeIndex, direction);

				newFrameName = `${this.sizes[this.loadedPieces.get(type).sizeIndex]}_OverWorld_Body_${this.categories[index]}_Down2.png`
				break;

			case 'hairstyle':
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_HairStyle_${this.categories[index]}_Down2.png`;
				break;

			case 'facialhair':
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_FacialHair_${this.categories[index]}_Down2.png`
				break;

			case 'upperbody':
				index === 0 && direction === 'Right' ? index = 1 : index = this.categories.length - 1;
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_UpperBody_${this.categories[index]}_Down2.png`
				break;

			case 'lowerbody':
				index === 0 && direction === 'Right' ? index = 1 : index = this.categories.length - 1;
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_LowerBody_${this.categories[index]}_Down2.png`
				break;

			case 'headwear':
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_HeadWear_${this.categories[index]}_Down2.png`
				break;

			case 'facewear':
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_FaceWear_${this.categories[index]}_Down2.png`
				break;
			case 'hands':
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_Hands_${this.categories[index]}_Down2.png`
				break;

			case 'footwear':
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_FootWear_${this.categories[index]}_Down2.png`
				break;

			case 'weapon':
				this.loadedPieces.get(type).weaponIndex = this.indexOperation(this.handed, this.loadedPieces.get(type).weaponIndex, direction);
				const handedIndex = this.loadedPieces.get(type).weaponIndex;
				newFrameName = `${this.sizes[sizeIndex]}_OverWorld_Weapon_${this.handed[handedIndex].category}_Down_${this.handed[handedIndex].hand}.png`;
				
		}

		this.loadedPieces.get(type).object.destroy();

		if(type !== 'body') this.removePiecefromCustomObject(type);
		
		if (this.characterPieces[newFrameName]) {

			const newObject = new Piece(this.game, null, null, null, x, y, newFrameName);
			newObject.customPlay(this.objectAnimations[this.pieceSide]);
			newObject.tint = Phaser.Color.getRandomColor();

			this.resetCharacter(type, newObject);
			this.savePieceToCustomObject(type);
		}

		if(type !== 'body') this.attachColorWheel(type);
	}

	/**
     * Adds character Pieces' data.
     */
	addJSONLists() {
		this.characterPieces = characterAssetsJsonObject.frames; 

		this.categories = ['none', 'A'];
		this.sizes = ['Large_Feminine', 'Medium_Feminine', 'Small_Feminine', 'Large_Masculine', 'Medium_Masculine', 'Small_Masculine'];
		this.handed = [
			'none',
			{ hand: 'RightHanded2', category: 'A' },
			{ hand: 'LeftHanded2', category: 'A' }
		];
	}
	/**
     * Adds a panel to control the customization of each Piece of the character.
	 * - For each panel element created, optionally creates a Piece attached to it.
	 * - A panel element created without a Piece won't have any functionality.
     */
	addCustomizableElementsPanel() {
		const x = 680;
		const y = 309;

		const charBackground = this.game.add.image(x + 28, y + 27, 'character_preview');
		charBackground.height = 220;
		charBackground.width = 190;

		this.addPanelElement('Body Type', 'Left', 0, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_Body_A_Down2.png'), 'body');
		this.addPanelElement('Hairstyle', 'Left', 1, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_HairStyle_A_Down2.png'), 'hairstyle');
		this.addPanelElement('Facial Hair', 'Left', 2, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_FacialHair_A_Down2.png'), 'facialhair');
		this.addPanelElement('Upper Body', 'Left', 3, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_UpperBody_A_Down2.png'), 'upperbody');
		this.addPanelElement('Lower Body', 'Left', 4, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_LowerBody_A_Down2.png'), 'lowerbody');
		this.addPanelElement('Headwear', '', 0, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_HeadWear_A_Down2.png'), 'headwear');
		this.addPanelElement('Facewear', '', 1, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_FaceWear_A_Down2.png'), 'facewear');
		this.addPanelElement('Hands/Arms', '', 2, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_Hands_A_Down2.png'), 'hands');
		this.addPanelElement('Footwear', '', 3, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_FootWear_A_Down2.png'), 'footwear');
		this.addPanelElement('Weapon', '', 4, new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_Weapon_A_Down_RightHanded2.png'), 'weapon');
		this.addEyeColorModifiers(new Piece(this.game, null, null, null, x, y, 'Large_Feminine_OverWorld_EyeColour_A_Down2.png'), 'eyecolour');

		this.addTurnCharacter();

		this.characterShuffle();
	}

	/** 
	 * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene.
	 */  
	shutdown() {
		this.keyboard.destroyKeyboard();

		this.categories = null;
		this.sizes = null;
		this.handed = null;

		this.character = null;
		this.characterPieces = null;
		this.openColorWheel = null;
		this.panelPosition = null;
		this.textButtons = null;
		this.customObject = null;
		this.pieceSide = null;
		this.objectAnimations = null;
		this.stringObject = null;
		this.loadedPieces = null;
		this.types = null;
		this.optionArrows = null;
		this.lHand.destroy();
		this.rHand.destroy();
	}
}
