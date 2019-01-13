/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-02 07:01:52
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-12 17:52:25
 */

import { injectable, inject } from "inversify";

export namespace Mon {
    export namespace Helpers {
        @injectable()
        export class Box2App implements IBox2App {
            public app: HTMLCanvasElement;
            public world: Box2D.Dynamics.b2World;
            public scale = 30;

            public set: IBox2AppSetters = {
                animation: {
                    positionIterations: (positionIterations: number) => {
                        this.positionIterations = positionIterations;
                    },
                    timeStep: (timeStep: number) => {
                        this.timeStep = timeStep;
                    },
                    velocityIterations: (velocityIterations: number) => {
                        this.velocityIterations = velocityIterations;
                    },
                },
                debug: {
                    fillAlpha: (alpha: number) => {
                        this.fillAlpha = alpha;
                    },
                    flags: (flags: number) => {
                        this.flags = flags;
                    },
                    lineThickness: (lineThickness: number) => {
                        this.lineThickness = lineThickness;
                    },
                },
            };

            private w: number;
            private h: number;

            // Animation
            private timeStep = 1 / 60;
            private velocityIterations = 8;
            private positionIterations = 3;

            // Debug
            private fillAlpha = 0.5;
            private lineThickness = 1;
            private flags = Box2D.Dynamics.b2DebugDraw.e_shapeBit || Box2D.Dynamics.b2DebugDraw.e_jointBit;

            public applyPhysics = () => {
                this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);

                this.world.ClearForces();
                this.world.DrawDebugData();

                setTimeout(this.applyPhysics, this.timeStep);
            }

            constructor(@inject("B2AppOptions") options: B2AppOptions) {
                if (options.w) {
                    this.w = options.w;
                }
                if (options.h) {
                    this.h = options.h;
                }

                if (!options.gravity) { // Default gravity.
                    options.gravity = new Box2D.Common.Math.b2Vec2(0, 9.8);
                }

                this.world = new Box2D.Dynamics.b2World(options.gravity, options.allowSleep);

                if (options.debug) {
                    this.app = this.addDebugView(options.containerId, options.customStyles, options.addClass);
                    this.setupDebugDraw();
                }
            }

            public removeCanvasFuzz(minWidth: number, minHeight: number): void {
                this.app.width = minWidth * 2;
                this.app.height = minHeight * 2;
                this.app.getContext("2d").scale(2, 2);
            }

            private addDebugView(containerId: string, customStyles: string, addClass: string) {
                let box2App = document.createElement("canvas");
                box2App.setAttribute("id", "debugView");
                if (this.w) {
                    box2App.width = this.w;
                }
                if (this.h) {
                    box2App.height = this.h;
                }
                if (customStyles) {
                    box2App.style.cssText = customStyles;
                } else {
                    box2App.style.cssText = "background-color: rgba(255, 255, 255, 0.4); position: absolute;";
                }
                if (addClass) {
                    box2App.className += addClass;
                }
                if (containerId) {
                    return (<HTMLDivElement>document.getElementById(containerId))
                        .insertBefore(box2App, document.body.getElementsByTagName("canvas")[0]);
                } else {
                    return document.body.insertBefore(box2App, document.body.getElementsByTagName("canvas")[0]);
                }
            }

            private setupDebugDraw() {
                let debugDraw = new Box2D.Dynamics.b2DebugDraw();
                debugDraw.SetSprite((<HTMLCanvasElement>document.getElementById("debugView")).getContext("2d"));
                debugDraw.SetDrawScale(this.scale);
                debugDraw.SetFillAlpha(this.fillAlpha);
                debugDraw.SetLineThickness(this.lineThickness);
                debugDraw.SetFlags(this.flags);
                this.world.SetDebugDraw(debugDraw);
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////
//                               INTERFACES                                     //
//////////////////////////////////////////////////////////////////////////////////
export interface IBox2App {
    app: HTMLCanvasElement;
    world: Box2D.Dynamics.b2World;
    scale: number;
    set: IBox2AppSetters;
    applyPhysics: () => void;
    removeCanvasFuzz(minWidth: number, minHeight: number): void;
}

export interface IBox2AppSetters {
    animation: {
        positionIterations: (positionIterations: number) => void,
        timeStep: (timeStep: number) => void,
        velocityIterations: (velocityIterations: number) => void,
    };
    debug: {
        fillAlpha: (alpha: number) => void,
        flags: (flags: number) => void,
        lineThickness: (lineThickness: number) => void,
    };
}

export interface B2AppOptions {
    debug?: boolean;
    containerId?: string;
    customStyles?: string;
    addClass?: string;
    gravity?: Box2D.Common.Math.b2Vec2;
    allowSleep?: boolean;
    w?: number;
    h?: number;
}
