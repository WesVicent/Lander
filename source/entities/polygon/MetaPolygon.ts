/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-28 17:10:46
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-29 07:37:42
*/

import { SharedPrefs } from "../../SharedPrefs";
import { MetaLine } from "./MetaLine";
import { Coordinate } from "../../interfaces/PolygonInterfaces";

export class MetaPolygon {
    public lines: PIXI.Graphics[] = new Array();
    public isOpen = true;

    public lineCoordinates: Coordinate[] = new Array();
    private shapeCoordinatesRaw: number[] = new Array();

    public addVertex(x: number, y: number) {
        this.shapeCoordinatesRaw.push(x, y);
        this.lineCoordinates.push({ x: x, y: y });

        if (this.shapeCoordinatesRaw.length / 2 === 2) {
            this.lines.push(new MetaLine(this.lineCoordinates));
        }
        if (this.shapeCoordinatesRaw.length / 2 > 2) {
            this.lineCoordinates.splice(0, 1);
            this.lines.push(new MetaLine(this.lineCoordinates));
        }
    }

    public newLine() {
        return this.lines[this.lines.length - 1];
    }

    public closeLine() {
        this.lines.push(new MetaLine([
            { x: this.lineCoordinates[1].x, y: this.lineCoordinates[1].y },
            { x: this.shapeCoordinatesRaw[0], y: this.shapeCoordinatesRaw[1] },
        ]));

        this.isOpen = false;

        return this.newLine();
    }
}
