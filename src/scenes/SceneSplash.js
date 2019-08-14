import { Utils } from "../utils/utils";
import { Helper } from "../utils/helper";
import WebFont from 'webfontloader';

/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli, Kino A. Rose
 * @doc Splash State for displaying the game splash on completion
 * of load of assets.
 * @class SceneSplash
 * @extends {Phaser.State}
 */
export class SceneSplash extends Phaser.State {
    constructor() {
        super();
    }
    
    preload() {
        this.loadJsonData();
        this.loadFonts();
        this.loadImages();
        this.loadSpriteSheets();
    }

    create() {
        Utils.log("Scene Splash");
        const centerX = this.game.world.centerX;
        const centerY = this.game.world.centerY;

        this.loadingBar = this.add.sprite(centerX, centerY, "loading");
        this.loadingBar.animations.add("loading");
        this.loadingBar.animations.play("loading", 6, true);
        this.input.onTap.addOnce(this.startGame, this);

        Helper.centralize(this.loadingBar);
    }

    startGame() {
        this.game.state.start("SceneTitle");
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
        [
            'playerTest',
            'referenceDot',
            'tileSet',
            'temporarybg',
            'TV_BG',
            'white_layer',
            'black_layer',
            'back',
            'continue',
            'grey_wheel',
            'color_wheel',
            'colour_gradient_large',
            'character_preview',
        ].forEach(image => {
            this.game.load.image(`${image}`, `./assets/images/${image}.png`);
        });
    }

    /**
     * Loads sprite sheets.
     */
    loadSpriteSheets() {
        // Loading Atlas Spritesheet
        this.game.load.atlasJSONHash('character', './assets/images/assets_combined.png', './assets/data/assets_combined.json');
        this.game.load.atlasJSONHash('island', './assets/images/scene_islandmap.png', './assets/data/scene_islandmap.json');

        this.game.load.spritesheet('cc_panel_hands', './assets/images/cc_panel_hands.png', 48, 43, 4, 0, 0);
        this.game.load.spritesheet('cc_panel_button', './assets/images/cc_panel_button.png', 224, 59, 2, 0, 0);
        this.game.load.spritesheet('arrows', './assets/images/Menu_Arrows.png', 30, 31, 4, 1, 1);
        this.game.load.spritesheet('palette', './assets/images/Menu_Palette.png', 41, 41, 2, 0, 0); 
        this.game.load.spritesheet('eyes', './assets/images/eye_color_button.png', 48, 43, 2, 0, 0);
    }

    /**
     * Loads json files.
     * - 'Texts' are usually used for data checking.
     * - 'Tilemap' is for any scene that requires map.
     */
    loadJsonData() {
        this.game.load.text('Character_Pieces', './assets/data/assets_combined.json');
        this.game.load.text('Island_Buildings', './assets/data/scene_islandmap.json');

        this.game.load.tilemap('SceneMap', './assets/maps/SceneMap/map.json', null, Phaser.Tilemap.TILED_JSON);
    }
}