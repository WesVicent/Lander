/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-28 17:10:46
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-08 17:01:35
*/

import { MetaLine } from "./MetaLine";
import { Coordinate, LinePoints } from "../../interfaces/PolygonInterfaces";
import { MetaVertexPoint } from "./MetaVertexPoint";
import { Session } from "../../Session";

export class MetaPolygon {
    public isOpen = true;
    public debugMode = false;
    public lines: MetaLine[] = new Array();
    public vertices: MetaVertexPoint[] = new Array();

    private firstPoints: LinePoints;
    private midPoints: LinePoints;
    private lastPoints: LinePoints;

    public addVertex(coordinate: Coordinate): MetaVertexPoint {
        this.vertices.push((new MetaVertexPoint(coordinate, this.vertices.length)));

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

    public redraw (id: number) { // Loop
        console.log("a");
        console.log(this.lines[id].a);
        console.log("b");
        console.log(this.lines[id - 1].b);
        console.log("mouse");
        console.log(Session.getInstance().mouse());


        this.lines[id - 1].b = { x: this.lines[id - 1].b.x - this.lines[id].a.x, y: this.lines[id - 1].b.y - this.lines[id].a.y};
        this.lines[id].a = this.vertices[id].coordinate = Session.getInstance().mouse();

        this.lines[id - 1].redraw();
        this.lines[id].redraw();
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
