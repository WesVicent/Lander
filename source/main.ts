/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-06 23:38:25
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

    let pos = new Array();
    let i = 0;
    let l = new PIXI.Graphics();
    wBench.bench.on("click", function () {

        if (meta.isOpen) {
            meta.addVertex(
                wBench.pixiApp.renderer.plugins.interaction.mouse.global.x,
                wBench.pixiApp.renderer.plugins.interaction.mouse.global.y);
            if (meta.lines.length > 0) {
                wBench.pixiApp.stage.addChild(meta.newLine());
            }
        }



        /* if (i > 0) {
            pos.push(wBench.pixiApp.renderer.plugins.interaction.mouse.global.x);
            pos.push(wBench.pixiApp.renderer.plugins.interaction.mouse.global.y);

            l.lineStyle(1, 0xffffff).moveTo(0, 0).lineTo(pos[2] - pos[0], pos[3] - pos[1]);
            pos.splice(0, 2);
                wBench.pixiApp.stage.addChild(l);
        } else {
            pos.push(wBench.pixiApp.renderer.plugins.interaction.mouse.global.x);
            pos.push(wBench.pixiApp.renderer.plugins.interaction.mouse.global.y);

            l.position.set(pos[0], pos[1]);
        }

        i++; */
    });

    wBench.bench.on("rightclick", function () {
        if (meta.lines.length >= 2) {
            wBench.pixiApp.stage.addChild(meta.closeLine());
        }
    });

    let hLine = new PIXI.Graphics();
    hLine.position.set(0, wBench.height / 2);
    hLine.lineStyle(1, 0xffffff).moveTo(0, 0).lineTo(wBench.width, 0);

    let vLine = new PIXI.Graphics();
    vLine.position.set(wBench.width / 2, 0);
    vLine.lineStyle(1, 0xffffff).moveTo(0, 0).lineTo(0 , wBench.height);


    wBench.pixiApp.stage.addChild(hLine);
    wBench.pixiApp.stage.addChild(vLine);


    /* let a = sqr.position;
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
    wBench.pixiApp.stage.addChild(poly); */
};
