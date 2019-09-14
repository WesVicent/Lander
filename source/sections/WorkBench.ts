/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-25 03:04:30
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-08 15:47:51
 */
// tslint:disable:object-literal-sort-keys

import { B2AppOptions } from "../Mon-chan";
import dependencyContainer, { initBox2App } from "../config/InversionOfControl";
import { Box2AppService } from "../services/Box2AppService";
import { GridLayer } from "../layers/GridLayer";
import { Session } from "../Session";
import { Coordinate, MouseCoordinate } from "../interfaces/PolygonInterfaces";
import { MetaPolygon } from "../entities/polygon/MetaPolygon";

export class WorkBench {
    public b2App: Box2AppService;
    public bench = new PIXI.Graphics();
    public width: number;
    public height: number;
    public mouse: () => MouseCoordinate;
    public polygon: MetaPolygon;

    private pixiApp: PIXI.Application;

    constructor(b2Options: B2AppOptions) {
        this.width = b2Options.w;
        this.height = b2Options.h;

        this.setupPixiApp(b2Options.containerId);

        initBox2App(b2Options);
        this.b2App = dependencyContainer.resolve<Box2AppService>(Box2AppService);

        this.addListenners();
        // GridLayer.add(this.b2App.app);
    }


    public add = (child: PIXI.Graphics) => { this.pixiApp.stage.addChild(child); };

    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------

    private addListenners() {
        this.bench.on("mousedown", () => {
            if (this.polygon.isOpen) {
                this.add(this.polygon.addVertex({ x: this.mouse().x, y: this.mouse().y }));
                if (this.polygon.lines.length > 0) {
                    this.add(this.polygon.newLine());
                }
            }
        });

        this.bench.on("mouseup", () => {});

        this.bench.on("rightclick", () => {
            if (this.polygon.lines.length >= 2) {
                this.add(this.polygon.closeLine());
            }
        });
    }

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

        this.mouse = (): MouseCoordinate => {
            return {
                x: this.pixiApp.renderer.plugins.interaction.mouse.global.x,
                y: this.pixiApp.renderer.plugins.interaction.mouse.global.y,
                diffAway: (difference: Coordinate): Coordinate => { // Removes difference away from coordinates
                    return {
                        x: this.pixiApp.renderer.plugins.interaction.mouse.global.x - difference.x,
                        y: this.pixiApp.renderer.plugins.interaction.mouse.global.y - difference.y,
                    };
                },
            };
        };
    }

    private setupBench(): void {
        this.bench.interactive = true;
        this.bench.beginFill(0x444444);
        this.bench.drawRect(0, 0, this.width, this.height);
        Session.getInstance().bench = this;

        this.polygon = new MetaPolygon();
        this.polygon.debugMode = false;
    }
}
