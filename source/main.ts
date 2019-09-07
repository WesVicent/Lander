/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-06 23:38:25
 */
// tslint:disable:object-literal-sort-keys

import { WorkBench } from "./sections/WorkBench";
import { MetaPolygon } from "./entities/polygon/MetaPolygon";

let wBench: WorkBench;

window.onload = function () {
    wBench = new WorkBench({
        containerId: "container",
        w: window.innerWidth,
        h: window.innerHeight,
        debug: false,
        allowSleep: true,
    });

    let meta = new MetaPolygon();
    meta.debugMode = true;

    wBench.bench.on("click", function () {
        if (meta.isOpen) {
            meta.addVertex(
                wBench.mouse().x, wBench.mouse().y);
            if (meta.lines.length > 0) {
                wBench.add(meta.newLine());
            }
        }
    });

    wBench.bench.on("rightclick", function () {
        if (meta.lines.length >= 2) {
            wBench.add(meta.closeLine());
        }
    });

    let hLine = new PIXI.Graphics();
    hLine.position.set(0, wBench.height / 2);
    hLine.lineStyle(1, 0xffffff).moveTo(0, 0).lineTo(wBench.width, 0);

    let vLine = new PIXI.Graphics();
    vLine.position.set(wBench.width / 2, 0);
    vLine.lineStyle(1, 0xffffff).moveTo(0, 0).lineTo(0, wBench.height);

    wBench.add(hLine);
    wBench.add(vLine);
};
