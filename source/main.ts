/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-03 00:12:27
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-09 06:10:48
 *
 * LET'S GOOO!!
 */

// tslint:disable:object-literal-sort-keys
import IDENTFIER from "./Identifiers";

// Globals
let pixiApp: PIXI.Application;

let w = window.innerWidth;
let h = window.innerHeight;

document.body.onload = function () {

    ////////////////// SETUP //////////////////
    pixiApp = new PIXI.Application({
        width: w,
        height: h,
        antialias: true,
        backgroundColor: 0xcccccc,
    });
    document.body.appendChild(pixiApp.renderer.view);

    ///////////////////////////////////////////

    // tslint:disable-next-line:no-empty
    pixiApp.ticker.add((delta) => {

    });
};

