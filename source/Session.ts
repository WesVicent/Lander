/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-27 02:17:25
 * @Last Modified by: WesFerreiraa
 * @Last Modified time: 2019-09-08 15:48:366
*/

import { WorkBench } from "./sections/WorkBench";
import { Coordinate } from "./interfaces/PolygonInterfaces";

// tslint:disable: member-ordering
export class Session {
    private static _instance: Session;
    private clickedPointId: number;

    public bench: WorkBench; // <IMPROVE> add WorkBench depencency in Poly.
    public mouse = (): Coordinate => this.bench.mouse();
    public clickedVertex: number; // <IMPROVE>
    public color = {
        main: 0xffd428,
        secondary: 0xbe0cff,
        white: 0xffffff,
    };

    private redrawMetaPoly = false;

    public emitRedrawMetaPoly (id: number) {
        this.redrawMetaPoly = true;
        this.clickedPointId = id;
    }

    public static getInstance(): Session {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        this.addListeners();
    }

    private addListeners() {
        window.addEventListener("mousedown", () => {});
        window.addEventListener("mouseup", () => {
            this.redrawMetaPoly = false;
        });
        window.addEventListener("mousemove", () => {
            if (this.redrawMetaPoly) {
                this.bench.polygon.redraw(this.clickedPointId);
            }
        });
    }
}
