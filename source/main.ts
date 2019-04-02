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
    poly.pivot.x = 0;
    poly.pivot.y = 3;
    poly.lineStyle(1, 0xffffff);
    poly.drawPolygon(shape);
    poly.rotation = 3.14 + 1.57;

    let sqr = new PIXI.Graphics();
    sqr.lineStyle(1, 0xffcccc);
    sqr.pivot.set(100, 3);
    sqr.drawRect(wBench.width / 2 - 100, wBench.height / 2, 200, 6);

    let sqr2 = new PIXI.Graphics();
    sqr2.lineStyle(1, 0xffffff);
    sqr2.drawRect(200, 200, 100, 100);

    let circ = new PIXI.Graphics();
    circ.lineStyle(1, 0xffffff);
    circ.drawCircle(250, 250, 70);


    let meta = new MetaPolygon();

    /* wBench.bench.on("click", function () {

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
    }); */
	
	
	

    let a = sqr.position;
    let b: {x: number, y: number} = {x: 0, y: 0};

    let cA: number;
    let cO: number;
    let hy: number;
    let tg: number;

    wBench.bench.on("mousemove", function () {
        b.x = wBench.pixiApp.renderer.plugins.interaction.mouse.global.x;
        b.y = wBench.pixiApp.renderer.plugins.interaction.mouse.global.y;

        cA = b.x - a.x;
        cO = b.y - a.y;
        tg = cO / cA;

        sqr.rotation += 0.01;
    });

    wBench.pixiApp.stage.addChild(circ);
    wBench.pixiApp.stage.addChild(sqr2);
    wBench.pixiApp.stage.addChild(sqr);
    wBench.pixiApp.stage.addChild(poly);
};
