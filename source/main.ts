/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-29 07:36:35
 */
// tslint:disable:object-literal-sort-keys

import { WorkBench } from "./sections/WorkBench";
import { SharedPrefs } from "./SharedPrefs";
import { MetaPolygon } from "./entities/polygon/MetaPolygon";
import { MetaLine } from "./entities/polygon/MetaLine";

let wBench: WorkBench;

window.onload = function () {
    wBench = new WorkBench({
        containerId: "container",
        w: window.innerWidth,
        h: window.innerHeight,
        debug: false,
        allowSleep: true,
    });

    let poly = new PIXI.Graphics();
    let shape = new PIXI.Polygon(0, 0, 250, 0, 250, 6, 0, 6);
    shape.close();
    poly.position.x = 45;
    poly.position.y = 45;
    poly.lineStyle(1, 0xffffff);
    poly.drawPolygon(shape);

    let meta = new MetaPolygon();

    wBench.bench.on("click", function () {
        meta.lineCoordinates.push({ x: 0, y: 0 });

        if (meta.isOpen) {
            meta.addVertex(
                wBench.pixiApp.renderer.plugins.interaction.mouse.global.x,
                wBench.pixiApp.renderer.plugins.interaction.mouse.global.y);
            if (meta.lines.length > 0) {
                wBench.pixiApp.stage.addChild(meta.newLine());
            }
        }
    });

    wBench.bench.on("rightclick", function () {
        if (meta.lines.length >= 2) {
            wBench.pixiApp.stage.addChild(meta.closeLine());
        }
    });

    wBench.bench.on("mousemove", function () {
        if (wBench.pixiApp.renderer.plugins.interaction.mouse.global.x === 0 &&
            wBench.pixiApp.renderer.plugins.interaction.mouse.global.y === 0) {
                console.log(0);

            }
    });

    wBench.pixiApp.stage.addChild(poly);
};

