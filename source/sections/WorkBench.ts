/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-25 03:04:30
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-11 04:19:27
 */
// tslint:disable:object-literal-sort-keys

import { B2AppOptions } from "../Mon-chan";
import dependencyContainer, { initBox2App } from "../config/InversionOfControl";
import { Box2AppService } from "../services/Box2AppService";
import { GridLayer } from "../layers/GridLayer";
import { Poly } from "../entities/polygon/Poly";

export class WorkBench {
    public b2App: Box2AppService;
    public pixiApp: PIXI.Application;
    public bench = new PIXI.Graphics();

    public poly = new Poly();

    private clicks = 0;

    constructor(b2Options: B2AppOptions) {
        this.pixiApp = new PIXI.Application({
            width: b2Options.w,
            height: b2Options.h,
            antialias: true,
            transparent: true,
        });
        this.pixiApp.renderer.view.setAttribute("id", "pixiView");
        (<HTMLDivElement>document.getElementById(b2Options.containerId)).appendChild(this.pixiApp.view);

        this.bench.interactive = true;
        this.bench.beginFill(0x444444);
        this.bench.drawRect(0, 0, this.pixiApp.renderer.view.width, this.pixiApp.renderer.view.height);
        this.pixiApp.stage.addChild(this.bench);

        initBox2App(b2Options);
        this.b2App = dependencyContainer.resolve<Box2AppService>(Box2AppService);

        // GridLayer.add(this.b2App.app);
    }

    public drawPoly(x: number, y: number) {
        if (this.clicks === 0) {
            this.bench.addChild(this.poly.drawFirstVertex(x, y), this.poly.draw(x, y));
            this.clicks++;
        } else {
            if (this.poly.isOpen) {
                this.bench.removeChild(this.poly.firstVertex);

                this.poly.redraw();
                this.bench.addChild(this.poly.draw(x, y), this.poly.drawLastVertex(x, y));
                this.bench.addChild(this.poly.firstVertex);
                console.log("oi");

            }
        }
    }

    public addListenners() {
        this.poly.firstVertex.on("click", (e) => {
            this.poly.close();
            this.poly.redraw();
            console.log("polyClick");
        });
        this.bench.on("click", (e) => {
            this.drawPoly(this.pixiApp.renderer.plugins.interaction.mouse.global.x,
                this.pixiApp.renderer.plugins.interaction.mouse.global.y);

        });
    }
}
