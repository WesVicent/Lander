/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-09-08 10:11:42
 * @Last Modified by: WesFerreiraa
 * @Last Modified time: 2019-09-08 13:46:544
*/

import { Coordinate } from "../../interfaces/PolygonInterfaces";
import { Session } from "../../Session";

export class MetaVertexPoint extends PIXI.Graphics {

    public coordinate: Coordinate;
    public id: number;

    private isMoving = false;

    constructor(coordinate: Coordinate, id: number) {
        super();

         this.coordinate = coordinate;
        this.id = id;

        this.interactive = true;
        this.beginFill(0xffffff);
        this.pivot.x = 2;
        this.pivot.y = 4;
        this.position.x = this.coordinate.x;
        this.position.y = this.coordinate.y;
        this.drawRect(0, 0, 4, 4);

        this.addListeners();
    }

    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------

    private rearrange(): void {
        this.position.x = this.coordinate.x - 1;
        this.position.y = this.coordinate.y - 1;
    }

    private addListeners(): void {
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
            this.rearrange();
        });
        this.on("rightclick", () => { // TODO: Remove point
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
            if (this.isMoving) { // Updates the coordenades of polygon, then redraw
                this.position.x = Session.getInstance().mouse().x;
                this.position.y = Session.getInstance().mouse().y + 4;

                Session.getInstance().emitRedrawMetaPoly(this.id);
            }
        });
    }

    //////////////////////////////      STYLES      ///////////////////////////////////
    private vertexStyle(): void {
        this.interactive = true;
        this.beginFill(Session.getInstance().color.white);
        this.pivot.x = 2;
        this.pivot.y = 4;
        this.position.x = this.coordinate.x;
        this.position.y = this.coordinate.y;
        this.drawRect(0, 0, 4, 4);
    }
    private vertexOverStyle(): void {
        this.interactive = true;

        this.beginFill(Session.getInstance().color.white, 0);
        this.lineStyle(1, Session.getInstance().color.main);
        this.pivot.x = 4;
        this.pivot.y = 8;
        this.position.x = this.coordinate.x;
        this.position.y = this.coordinate.y;
        this.drawRect(0, 0, 8, 8);
    }
    private vertexDownStyle(): void {
        this.interactive = true;

        this.beginFill(Session.getInstance().color.white);
        this.lineStyle(1, Session.getInstance().color.main);
        this.pivot.x = 4;
        this.pivot.y = 8;
        this.position.x = this.coordinate.x;
        this.position.y = this.coordinate.y;
        this.drawRect(0, 0, 8, 8);
    }
    ////////////////////////////////////////////////////////////////////////////////////
}
