import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import '../sass/main.scss';

import * as ParseB from './parse/index';
import { SceneBoot } from './scenes/SceneBoot';
import { SceneSplash } from './scenes/SceneSplash';
import { SceneTitle } from './scenes/SceneTitle';
import { SceneCustomization } from './scenes/SceneCustomization';
import { SceneMap } from './scenes/SceneMap';
import { SceneAuction } from './scenes/SceneAuction';
import { SceneForum } from './scenes/SceneForum';
import { SceneDebug } from './scenes/SceneDebug';
import { AudioManager } from './managers/AudioManager';
import { SceneManager } from './managers/SceneManager';
import { WindowManager } from './managers/WindowManager';
import { ChatFilter } from './utils/chatfilter';
import { Utils } from './utils/utils';
import { GameConfig } from './GameConfig';
import { http } from './http';
import { Facebook } from './utils/facebook';
//import * as User from './firebase/user';

//////////////////////////////////////////////////////////////////////////////
/**
 * @by: Evoloot Enterprises Inc.
 * @author: Victor V. Piccoli, Kino A. Rose
 * @doc: Init script
*/
////////////////////////////////////////////////////////////////////////
// Initialize Phaser application
window.onload = () => {
    Utils.initialize();
    // Creates the game object with the imported game object.
    const game = new Phaser.Game(GameConfig);
    //Initialize Managers
    SceneManager.initialize(game);
    AudioManager.initialize(game);
    WindowManager.initialize(game);
    ChatFilter.initialize(game);
    //Debug Managers
    Utils.exposeObject('ChatFilter', ChatFilter);
    Utils.exposeObject('SceneManager', SceneManager);
    Utils.exposeObject('API', http);
    //Add Game Scenes
    game.state.add('SceneBoot', SceneBoot, true);
    game.state.add('SceneSplash', SceneSplash, false);
    game.state.add('SceneTitle', SceneTitle, false);
    game.state.add('SceneCustomization', SceneCustomization, false);
    game.state.add('SceneMap', SceneMap, false);
    game.state.add('SceneAuction', SceneAuction, false);
    game.state.add('SceneForum', SceneForum, false);
    game.state.add('SceneDebug', SceneDebug, false);
    //Initialize Facebook
    Facebook.initialize();
    Utils.exposeObject('Facebook', Facebook);
    // @ts-ignore
    const gameOptions = {
        playSound: true,
        playMusic: true
    };
    // @ts-ignore
    let musicPlayer;

    //app.initialize();
};
