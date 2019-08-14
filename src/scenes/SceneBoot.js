import { Utils } from "../utils/utils";
/**
 * @by Evoloot Enterprises Inc.
 * @author Kino A. Rose, Victor V. Piccoli
 * @doc Preloads small assets into the game.
 * "Immediately" transitions to SceneSplash afterwards.
 * @class SceneBoot
 * @extends {Phaser.State}
 */
export class SceneBoot extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        this.setResponsive();
    }

    preload() {
        this.load.spritesheet("loading", "./assets/images/preloader.png", 64, 64, 12);
        this.load.image('window', "./assets/images/window.png");
        this.game.load
            .json('profanityDictionary', './assets/data/profanitydictionary.json');
        this.game.load.onFileComplete.add((progress, keyName) => {
            if (keyName === 'profanityDictionary')
                Utils.log("Dicitionary loaded");
        });
    }

    create() {
        Utils.log("Boot Complete");
        this.game.state.start("SceneSplash");
    }

    /**
     * Makes the game adapt into most of the existent screensizes.
     */
    setResponsive() {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    }
}
