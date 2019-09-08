/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-28 17:39:34
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-28 18:45:133
*/

import { Coordinate, LinePoints } from "../../interfaces/PolygonInterfaces";
import { ReactiveArea } from "../../math/ReactiveArea";

export class MetaLine extends PIXI.Graphics {
    public internalCoordinates: Coordinate[] = new Array();
    public isDebugging: boolean;
    public a: Coordinate;
    public b: Coordinate;

    private points: LinePoints;
    private weight = 3;

    constructor(points: LinePoints, debugMode?: boolean) {
        super();
        this.points = points;
        this.isDebugging = debugMode;

        this.toInternalCoordinates();

        this.pivot.x = 0;
        this.pivot.y = 3;

        this.addGuideLine();
        this.addReactiveArea();

        this.interactive = true;
    }

    public redraw () {
        this.clear();
        this.addGuideLine();
    }
    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------

    private toInternalCoordinates(): void {
        this.a = this.points.a;
        this.b = { x: this.points.b.x - this.a.x, y: this.points.b.y - this.a.y };
    }

    private addGuideLine(): void {
        this.lineStyle(1, 0xccffcc);
        this.moveTo(0, 0);

        this.position.set(this.a.x, this.a.y); // Start line vertex
        this.lineTo(this.b.x, this.b.y); // End line vertex
    }

    private addReactiveArea(): void {
        let areaCoordinates: PIXI.Polygon;

        if ((this.b.x > 0 && this.b.y > 0) || (this.b.x < 0 && this.b.y < 0)) {
            areaCoordinates = new PIXI.Polygon(ReactiveArea.rightDiagonal(this.weight, this.b));
        } else if ((this.b.x < 0 && this.b.y > 0) || (this.b.x > 0 && this.b.y < 0)) {
            areaCoordinates = new PIXI.Polygon(ReactiveArea.leftDiagonal(this.weight, this.b));
        } else if (this.b.x === 0) {
            areaCoordinates = new PIXI.Polygon(ReactiveArea.vertical(this.weight, this.b));
        } else if (this.b.y === 0) {
            areaCoordinates = new PIXI.Polygon(ReactiveArea.horizontal(this.weight, this.b));
        }

        areaCoordinates.close();

        if (!this.isDebugging) {
            this.lineStyle(null);
        }

        this.drawPolygon(areaCoordinates);
    }

}
