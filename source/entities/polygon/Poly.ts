/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-01-25 18:45:33
 * @Last Modified by: WesFerreiraaa
 * @Last Modified time: 2019-03-27 02:21:2777
*/
// tslint:disable:object-literal-sort-keys

import { SharedPrefs } from "../../SharedPrefs";
import { Graphics } from "pixi.js";

export class Poly extends PIXI.Graphics {
    public mainVertex = new PIXI.Graphics();
    public lines: {
        lineTo: { x: number, y: number },
        moveTo: { x: number, y: number },
        entity: PIXI.Graphics,
    } = {
            lineTo: { x: null, y: null },
            moveTo: { x: null, y: null },
            entity: new PIXI.Graphics(),

        };

    public vertexPointList: PIXI.Graphics[] = new Array();
    public isOpen = true;

    // private vertexCoodinates: number[] = [];
    private polygonShape: PIXI.Polygon;

    private vertexCoodinates: {
        raw: number[],
        vertex: VertexCoordinate[],
    } = {
            raw: new Array(),
            vertex: new Array(),
        };

    private vertexDragging = false;


    constructor() {
        super();
    }

    public draw(x: number, y: number): PIXI.Graphics {
        this.vertexCoodinates.raw.push(x);
        this.vertexCoodinates.raw.push(y);

        let coord: VertexCoordinate = { x: x, y: y };
        this.vertexCoodinates.vertex.push(coord);

        this.polygonShape = new PIXI.Polygon(this.vertexCoodinates.raw);

        this.interactive = true;
        this.lineStyle(1, SharedPrefs.getInstance().color.white);
        this.pivot.set(0.5);
        this.endFill();
        this.drawPolygon(this.polygonShape);

        this.on("click",  (e) => {
            this.clear();
            this.lineStyle(2, SharedPrefs.getInstance().color.secondary);

            this.beginFill(SharedPrefs.getInstance().color.white, 0);
            this.drawPolygon(this.polygonShape);
            console.log("poly");

        });

        return this;
    }

    public addMainVertex(x: number, y: number): PIXI.Graphics {
        this.mainVertex = this.mainVertexStyle(this.mainVertex, x, y);
        this.mainVertex.name = this.vertexPointList.length.toString();

        this.vertexPointList.push(this.mainVertex);

        this.mainVertex.on("mouseover", (e) => {
            this.mainVertex.clear();
            this.mainVertex = this.mainVertexOverStyle(this.mainVertex, x, y);
        });

        this.mainVertex.on("mouseout", (e) => {
            this.mainVertex.clear();
            this.mainVertex = this.mainVertexStyle(this.mainVertex, x, y);
        });

        return this.mainVertex;
    }

    public addVertex(x: number, y: number): PIXI.Graphics {
        let vertex = new PIXI.Graphics();

        vertex = this.vertexStyle(vertex, x, y);
        vertex.name = this.vertexPointList.length.toString();

        this.vertexPointList.push(vertex);
        let index: number;

        vertex.on("mouseover", () => {
            index = Number.parseInt(vertex.name);

            // Adds event style
            vertex.clear();
            vertex = this.vertexOverStyle(vertex, this.vertexCoodinates.vertex[index].x,
                this.vertexCoodinates.vertex[index].y);
        });
        vertex.on("mouseout", () => {
            index = Number.parseInt(vertex.name);
            // Adds event style
            vertex.clear();
            vertex = this.vertexStyle(vertex, this.vertexCoodinates.vertex[index].x,
                this.vertexCoodinates.vertex[index].y);
        });
        vertex.on("mousedown", () => {
            index = Number.parseInt(vertex.name);
            SharedPrefs.getInstance().clickedVertex = index; // Store the value to prevent loses

            // Adds event style
            vertex.clear();
            vertex = this.vertexDownStyle(vertex,
                this.vertexCoodinates.vertex[index].x,
                this.vertexCoodinates.vertex[index].y);

            this.vertexDragging = true;
        });
        vertex.on("mouseup", () => {
            index = Number.parseInt(vertex.name);
            // Adds event style
            vertex.clear();
            vertex = this.vertexOverStyle(vertex, this.vertexCoodinates.vertex[index].x,
                this.vertexCoodinates.vertex[index].y);

            this.vertexDragging = false;

            // Updates the position
            vertex.position.x = this.vertexCoodinates.vertex[SharedPrefs.getInstance().clickedVertex].x;
            vertex.position.y = this.vertexCoodinates.vertex[SharedPrefs.getInstance().clickedVertex].y;

            delete (SharedPrefs.getInstance().clickedVertex); // Cleans to next
        });
        vertex.on("rightclick", () => {
            index = Number.parseInt(vertex.name); // Update name

            this.vertexPointList.splice(index, 1); // Remove from array
            vertex.destroy(true);   // Destroy removed
            this.vertexCoodinates.vertex.splice(index, 1);
            this.vertexCoodinates.raw.splice(index + index, 2);

            for (let i = 0; i <= this.vertexPointList.length - 1; i++) {
                this.vertexPointList[i].name = i.toString(); // Rename all vertex points
            }

            this.redraw();
        });
        vertex.on("mousemove", () => {
            if (this.vertexDragging) {
                // Updates the coordenades of polygon, then redraw <REFACT>
                this.vertexCoodinates.raw[
                    SharedPrefs.getInstance().clickedVertex +
                    SharedPrefs.getInstance().clickedVertex] =
                    this.vertexCoodinates.vertex[SharedPrefs.getInstance().clickedVertex].x =
                    this.vertexPointList[SharedPrefs.getInstance().clickedVertex].position.x =
                    SharedPrefs.getInstance().mouseX;

                this.vertexCoodinates.raw[
                    SharedPrefs.getInstance().clickedVertex +
                    SharedPrefs.getInstance().clickedVertex + 1] =
                    this.vertexCoodinates.vertex[SharedPrefs.getInstance().clickedVertex].y =
                    this.vertexPointList[SharedPrefs.getInstance().clickedVertex].position.y =
                    SharedPrefs.getInstance().mouseY;

                this.redraw();
            }
        });

        return vertex;
    }

    /* public drawLine(x: number, y: number) {
        let line = new PIXI.Graphics();

        if (this.lines.lineTo.x === null) {
            this.lines.lineTo.x = x;
            this.lines.lineTo.y = y;
        } else {
            this.lines.lineTo.x = this.lines.moveTo.x;
            this.lines.lineTo.y = this.lines.moveTo.y;
        }

        this.lines.moveTo.x = x;
        this.lines.moveTo.y = y;

        line.lineStyle(1, SharedPrefs.getInstance().color.main);

        line.moveTo(
            this.lines.moveTo.x,
            this.lines.moveTo.y,
        );
        line.lineTo(
            this.lines.lineTo.x,
            this.lines.lineTo.y,
        );
        line.endFill();

        return line;
    } */

    public close() {
        this.polygonShape.close();
        this.isOpen = false;
    }

    public redraw() {
        this.clear();
        this.lineStyle(1, SharedPrefs.getInstance().color.white);
        this.beginFill(SharedPrefs.getInstance().color.white, 0.3);
        this.drawPolygon(this.polygonShape);
    }

    //////////////////////////////      STYLES      ///////////////////////////////////
    private vertexStyle(vertex: PIXI.Graphics, x: number, y: number): PIXI.Graphics {
        vertex.interactive = true;
        vertex.beginFill(SharedPrefs.getInstance().color.white);
        vertex.pivot.x = 2;
        vertex.pivot.y = 2;
        vertex.position.x = x;
        vertex.position.y = y;
        vertex.drawRect(0, 0, 4, 4);
        return vertex;
    }
    private vertexOverStyle(vertex: PIXI.Graphics, x: number, y: number): PIXI.Graphics {
        vertex.interactive = true;

        vertex.beginFill(SharedPrefs.getInstance().color.white, 0);
        vertex.lineStyle(1, SharedPrefs.getInstance().color.main);
        vertex.pivot.x = 4;
        vertex.pivot.y = 4;
        vertex.position.x = x;
        vertex.position.y = y;
        vertex.drawRect(0, 0, 8, 8);
        return vertex;
    }
    private vertexDownStyle(vertex: PIXI.Graphics, x: number, y: number): PIXI.Graphics {
        vertex.interactive = true;

        vertex.beginFill(SharedPrefs.getInstance().color.white);
        vertex.lineStyle(1, SharedPrefs.getInstance().color.main);
        vertex.pivot.x = 4;
        vertex.pivot.y = 4;
        vertex.position.x = x;
        vertex.position.y = y;
        vertex.drawRect(0, 0, 8, 8);
        return vertex;
    }
    private mainVertexStyle(vertex: PIXI.Graphics, x: number, y: number): PIXI.Graphics {
        vertex.interactive = true;
        vertex.beginFill(SharedPrefs.getInstance().color.main);
        vertex.pivot.x = 2.5;
        vertex.pivot.y = 2.5;
        vertex.position.x = x;
        vertex.position.y = y;
        vertex.drawRect(0, 0, 5, 5);
        return vertex;
    }
    private mainVertexOverStyle(vertex: PIXI.Graphics, x: number, y: number): PIXI.Graphics {
        vertex.interactive = true;
        vertex.beginFill(SharedPrefs.getInstance().color.white, 0);
        vertex.lineStyle(1, SharedPrefs.getInstance().color.white);
        vertex.pivot.x = 4;
        vertex.pivot.y = 4;
        vertex.position.x = x;
        vertex.position.y = y;
        vertex.drawRect(0, 0, 8, 8);
        return vertex;
    }
    ////////////////////////////////////////////////////////////////////////////////////

}

interface VertexCoordinate {
    x: number;
    y: number;
}
