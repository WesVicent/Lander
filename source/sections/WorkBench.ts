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
import { SharedPrefs } from "../SharedPrefs";
import { Coordinate } from "../interfaces/PolygonInterfaces";

export class WorkBench {
    public b2App: Box2AppService;
    public bench = new PIXI.Graphics();
    public width: number;
    public height: number;
    public mouse: Function;

    private pixiApp: PIXI.Application;

    constructor(b2Options: B2AppOptions) {
        this.width = b2Options.w;
        this.height = b2Options.h;

        this.setupPixiApp(b2Options.containerId);

        initBox2App(b2Options);
        this.b2App = dependencyContainer.resolve<Box2AppService>(Box2AppService);

        // GridLayer.add(this.b2App.app);
    }

    public addListenners() {
        this.bench.on("click", (e) => { });
    }

    public add = (child: PIXI.Graphics) => { this.pixiApp.stage.addChild(child); };

    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------
    private setupPixiApp(container: string): void {
        this.pixiApp = new PIXI.Application({
            width: this.width,
            height: this.height,
            antialias: true,
            transparent: true,
        });

        this.pixiApp.renderer.view.setAttribute("id", "pixiView");
        (<HTMLDivElement>document.getElementById(container)).appendChild(this.pixiApp.view);

        this.setupBench();
        this.pixiApp.stage.addChild(this.bench);

        this.mouse = (): Coordinate => {
            return {
                x: this.pixiApp.renderer.plugins.interaction.mouse.global.x,
                y: this.pixiApp.renderer.plugins.interaction.mouse.global.y,
            };
        };
    }

    private setupBench(): void {
        this.bench.interactive = true;
        this.bench.beginFill(0x444444);
        this.bench.drawRect(0, 0, this.width, this.height);
        SharedPrefs.getInstance().bench = this.bench;
    }
}
