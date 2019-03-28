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
    /*
        wBench.addListenners();

        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 18) { // ALT
                wBench.enableToClosePoly();
            }
        });

        window.addEventListener("mousemove", function (e) {

            SharedPrefs.getInstance().mouseX = e.clientX;
            SharedPrefs.getInstance().mouseY = e.clientY;

        }); */

    let g = new PIXI.Graphics();

    g.lineStyle(1, 0xccffcc);

    g.moveTo(0, 3);
    g.lineTo(250, 3);
    g.interactive = true;
    g.beginFill(0xffffff, 0);
    g.lineStyle(1, 0xccffcc, 0);
    g.drawRect(0, 0, 250, 6);
    g.endFill();
    g.position.x = 500;
    g.position.y = 200;

    g.on("click", function () {
        console.log("MetaClick");

    });

    wBench.pixiApp.stage.addChild(g);
};

