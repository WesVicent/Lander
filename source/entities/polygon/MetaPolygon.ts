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


        if (this.vertices.length === 2) {
            this.processFirstLinePoints();
            this.lines.push(new MetaLine(this.firstPoints, this.debugMode));
        }
        if (this.vertices.length > 2) {
            this.processMidLinePoints();
            this.lines.push(new MetaLine(this.midPoints, this.debugMode));
        }

        return this.vertices[this.vertices.length - 1];
    }

    public newLine(): MetaLine {
        return this.lines[this.lines.length - 1];
    }

    public closeLine(): MetaLine {
        this.processLastLinePoints();
        this.lines.push(new MetaLine(this.lastPoints, this.debugMode));

        this.isOpen = false;

        return this.newLine();
    }

    public redraw(id: number) { // Loop
        this.updateVertexPosition(id);
    }

    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------

    private updateVertexPosition(id: number) {
        this.lines[id].redraw();
        this.vertices[id].coordinate = this.lines[id].a = Session.getInstance().mouse();

        // this.vertices[id].rearrange();

        if (id === 0) { // First vertex
            this.lines[this.lines.length - 1].b = Session.getInstance().mouse().diffAway(this.lines[this.lines.length - 1].a);
            this.lines[id].b = this.lines[id].selfAway(this.lines[id + 1].a);

            this.lines[this.lines.length - 1].redraw();
        } else
            if (id === this.lines.length - 1) { // Last vertex
                this.lines[id - 1].b = Session.getInstance().mouse().diffAway(this.lines[id - 1].a);
                this.lines[id].b = this.lines[id].selfAway(this.lines[0].a);

                this.lines[id - 1].redraw();
            } else { // Mid vertices
                this.lines[id - 1].b = Session.getInstance().mouse().diffAway(this.lines[id - 1].a);
                this.lines[id].b = this.lines[id].selfAway(this.lines[id + 1].a);

                this.lines[id - 1].redraw();
            }
    }

    private processFirstLinePoints(): void {
        this.firstPoints = { a: this.vertices[0].coordinate, b: this.vertices[1].coordinate };
    }
    private processMidLinePoints(): void {
        this.midPoints = { a: this.vertices[this.vertices.length - 2].coordinate, b: this.vertices[this.vertices.length - 1].coordinate };
    }
    private processLastLinePoints(): void {
        this.lastPoints = { a: this.vertices[this.vertices.length - 1].coordinate, b: this.vertices[0].coordinate };
    }
}
