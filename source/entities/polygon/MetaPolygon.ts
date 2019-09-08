/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-28 17:10:46
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-08 13:14:58
*/

import { MetaLine } from "./MetaLine";
import { Coordinate, LinePoints } from "../../interfaces/PolygonInterfaces";
import { MetaVertexPoint } from "./MetaVertexPoint";

export class MetaPolygon {
    public isOpen = true;
    public debugMode = false;
    public lines: MetaLine[] = new Array();
    public vertices: MetaVertexPoint[] = new Array();

    private firstPoints: LinePoints;
    private midPoints: LinePoints;
    private lastPoints: LinePoints;

    public addVertex(coordinate: Coordinate): MetaVertexPoint {
        this.vertices.push((new MetaVertexPoint(coordinate)));

        this.processLinePoints();

        if (this.vertices.length === 2) {
            this.lines.push(new MetaLine(this.firstPoints, this.debugMode));
        }
        if (this.vertices.length > 2) {
            this.lines.push(new MetaLine(this.midPoints, this.debugMode));
        }

        return this.vertices[this.vertices.length - 1];
    }

    public newLine(): MetaLine {
        return this.lines[this.lines.length - 1];
    }

    public closeLine(): MetaLine {
        this.lines.push(new MetaLine(this.lastPoints, this.debugMode));

        this.isOpen = false;

        return this.newLine();
    }

    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------

    private processLinePoints (): void {
        this.firstPoints = { a: this.vertices[0], b: this.vertices[1] };
        this.midPoints = { a: this.vertices[this.vertices.length - 2], b: this.vertices[this.vertices.length - 1] };
        this.lastPoints = { a: this.vertices[this.vertices.length - 1].coordinate, b: this.vertices[0].coordinate };
    }
}
