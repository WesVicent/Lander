/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-25 03:37:11
 */
// tslint:disable:object-literal-sort-keys

import { WorkBench } from "./sections/WorkBench";

let wBench: WorkBench;

window.onload = function() {
    wBench = new WorkBench({
        containerId: "container",
        w: window.innerWidth,
        h: window.innerHeight,
        debug: true,
        allowSleep: true,
    });

    window.addEventListener("mousedown", function(e) {
        console.log(e.clientX + " -- " + e.clientY);

        let graphics = new PIXI.Graphics();

        // set the line style to have a width of 5 and set the color to red
        graphics.lineStyle(1, 0xFFFFFF);

        // draw a rectangle
        graphics.drawRect(e.clientX, e.clientY, 4, 4);
        graphics.pivot.x = 2;
        graphics.pivot.y = 2;

        wBench.pixiApp.stage.addChild(graphics);

    });
};

