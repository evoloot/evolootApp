import { Helper } from "../utils/helper";
/**
 * @by: Evoloot Enterprises Inc.
 * @author: Victor V. Piccoli
 * @doc: Creates a Building.
 * @class Building
 * @extends {Phaser.Sprite}
 */
export class Building extends Phaser.Sprite {
    constructor(game, initialFrameName, buildingEntrance = null, scene = null, x = 0, y = 0) {
        //, x, y,
        super(game, x, y, 'island');
        if (buildingEntrance) {
            this.x = buildingEntrance.x + (buildingEntrance.width / 2);
            this.y = buildingEntrance.y;

            this.inputEnabled = true;
            this.events.onInputOver.add(target => {
                this.setInteractLocation(buildingEntrance);
            });
            this.events.onInputOut.add(target => {
                Helper.setBuildLocation();
            });
        }

        this.islandBuildings = JSON.parse(this.game.cache.getText('Island_Buildings')).frames;

        this.scene = scene;

        this.frameName = initialFrameName;
        this.anchor.setTo(.5, 1);
        this.smoothed = false;
        this.scale.setTo(4);

        this.game.add.existing(this);
    }

    /**
     * Globally sets the building 'entrance' area and the scene it directs to.
     * @param {Object} buildingEntrance object holding information of the entrance area.
     */
    setInteractLocation(buildingEntrance) {
        Helper.setBuildLocation(
            {
                x: buildingEntrance.x + (buildingEntrance.width / 2),
                y: buildingEntrance.y + (buildingEntrance.height / 2),
                scene: this.scene
            }
        );
    }
}
