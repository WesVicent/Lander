/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-27 02:33:52
 */
// tslint:disable:object-literal-sort-keys

import { WorkBench } from "./sections/WorkBench";
import { SharedPrefs } from "./SharedPrefs";

let wBench: WorkBench;

window.onload = function () {
    wBench = new WorkBench({
        containerId: "container",
        w: window.innerWidth,
        h: window.innerHeight,
        debug: false,
        allowSleep: true,
    });

    wBench.addListenners();

    window.addEventListener("keydown", function(e) {
        if (e.keyCode === 18) { // ALT
            wBench.enableToClosePoly();
        }
    });

    window.addEventListener("mousemove", function (e) {

        SharedPrefs.getInstance().mouseX = e.clientX;
        SharedPrefs.getInstance().mouseY = e.clientY;

    });

    wBench.pixiApp.view.addEventListener("mousemove", function () { // <MOVE>
        /* SharedPrefs.getInstance().mouseX = wBench.pixiApp.renderer.plugins.interaction.mouse.global.x;
        SharedPrefs.getInstance().mouseY = wBench.pixiApp.renderer.plugins.interaction.mouse.global.y; */

        // console.log("bX:", SharedPrefs.getInstance().mouseX, " bY:", SharedPrefs.getInstance().mouseY);

    });
};

