/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-09-08 10:11:42
 * @Last Modified by: WesFerreiraa
 * @Last Modified time: 2019-09-08 13:46:544
*/

import { Coordinate } from "../../interfaces/PolygonInterfaces";
import { Session } from "../../Session";

export class MetaVertexPoint extends PIXI.Graphics {

    public x: number;
    public y: number;
    public coordinate: Coordinate;
    public id: number;

    private isMoving = false;

    constructor (coordinate: Coordinate, id: number) {
        super();

        this.coordinate = coordinate;
        this.id = id;
        this.setup();

        this.interactive = true;
        this.beginFill(0xffffff);
        this.pivot.x = 2;
        this.pivot.y = 4;
        this.position.x = this.x;
        this.position.y = this.y;
        this.drawRect(0, 0, 4, 4);

        this.addListeners();
    }

    private setup () {
        this.x = this.coordinate.x;
        this.y = this.coordinate.y;
    }

    private addListeners (): void {
        this.on("mouseover", () => {
            // Adds event style
            this.clear();
            this.vertexOverStyle();
        });
        this.on("mouseout", () => {
            // Adds event style
            this.clear();
            this.vertexStyle();
        });
        this.on("mousedown", () => {
            // Adds event style
            this.clear();
            this.vertexDownStyle();

            this.isMoving = true;
        });
        this.on("mouseup", () => {
            // Adds event style
            this.clear();
            this.vertexOverStyle();

            this.isMoving = false;

            // Updates the position
            // vertex.position.x = this.vertexCoodinates.vertex[SharedPrefs.getInstance().clickedVertex].x;
            // vertex.position.y = this.vertexCoodinates.vertex[SharedPrefs.getInstance().clickedVertex].y;

            // delete (SharedPrefs.getInstance().clickedVertex); // Cleans to next
        });
        this.on("rightclick", () => {
            /* index = Number.parseInt(vertex.name); // Update name

            this.vertexPointList.splice(index, 1); // Remove from array
            this.destroy(true);   // Destroy removed
            this.vertexCoodinates.vertex.splice(index, 1);
            this.vertexCoodinates.raw.splice(index + index, 2);

            for (let i = 0; i <= this.vertexPointList.length - 1; i++) {
                this.vertexPointList[i].name = i.toString(); // Rename all vertex points
            }

            this.redraw(); */
        });
        this.on("mousemove", () => {
            if (this.isMoving) {
                // Updates the coordenades of polygon, then redraw <REFACT>
                this.x = Session.getInstance().mouse().x;

                this.y = Session.getInstance().mouse().y + 4;

                Session.getInstance().emitRedrawMetaPoly(this.id);
            }
        });
    }

    /* private redraw() {
        this.clear();
        this.lineStyle(1, SharedPrefs.getInstance().color.white);
        this.beginFill(SharedPrefs.getInstance().color.white, 0.3);
        this.drawPolygon(this.polygonShape);
    } */

    private vertexStyle(): void {
        this.interactive = true;
        this.beginFill(Session.getInstance().color.white);
        this.pivot.x = 2;
        this.pivot.y = 4;
        this.position.x = this.x;
        this.position.y = this.y;
        this.drawRect(0, 0, 4, 4);
    }
    private vertexOverStyle(): void {
        this.interactive = true;

        this.beginFill(Session.getInstance().color.white, 0);
        this.lineStyle(1, Session.getInstance().color.main);
        this.pivot.x = 4;
        this.pivot.y = 8;
        this.position.x = this.x;
        this.position.y = this.y;
        this.drawRect(0, 0, 8, 8);
    }
    private vertexDownStyle(): void {
        this.interactive = true;

        this.beginFill(Session.getInstance().color.white);
        this.lineStyle(1, Session.getInstance().color.main);
        this.pivot.x = 4;
        this.pivot.y = 8;
        this.position.x = this.x;
        this.position.y = this.y;
        this.drawRect(0, 0, 8, 8);
    }
    private mainVertexStyle(): void {
        this.interactive = true;
        this.beginFill(Session.getInstance().color.main);
        this.pivot.x = 2.5;
        this.pivot.y = 2.5;
        this.position.x = this.x;
        this.position.y = this.y;
        this.drawRect(0, 0, 5, 5);
    }
    private mainVertexOverStyle(): void {
        this.interactive = true;
        this.beginFill(Session.getInstance().color.white, 0);
        this.lineStyle(1, Session.getInstance().color.white);
        this.pivot.x = 4;
        this.pivot.y = 4;
        this.position.x = this.x;
        this.position.y = this.y;
        this.drawRect(0, 0, 8, 8);
    }
}
