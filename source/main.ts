/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-08 10:39:31
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
    meta.debugMode = false;

    wBench.bench.on("click", function () {
        if (meta.isOpen) {
            wBench.add(meta.addVertex({x: wBench.mouse().x, y: wBench.mouse().y}));
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
    hLine.lineStyle(1, 0xffffff, 0.2).moveTo(0, 0).lineTo(wBench.width, 0);

    let vLine = new PIXI.Graphics();
    vLine.position.set(wBench.width / 2, 0);
    vLine.lineStyle(1, 0xffffff, 0.2).moveTo(0, 0).lineTo(0, wBench.height);

    wBench.add(hLine);
    wBench.add(vLine);
};
