/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-28 17:39:34
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-28 18:45:133
*/

import { Coordinate } from "../../interfaces/PolygonInterfaces";

export class MetaLine extends PIXI.Graphics {
    public internalCoordinates: Coordinate[] = new Array();
    public isDebugging: boolean;

    private coordinates: Coordinate[];
    private a: Coordinate;
    private b: Coordinate;

    constructor(coordinates: Coordinate[], debugMode?: boolean) {
        super();
        this.coordinates = coordinates;
        this.isDebugging = debugMode;

        this.toInternalCoordinates();

        this.pivot.x = 0;
        this.pivot.y = 3;

        this.addGuideLine();
        this.addReactiveArea();

        this.interactive = true;
    }

    // ------------------------------------------------------------------------------------------
    //                                          PRIVATES
    // ------------------------------------------------------------------------------------------

    private toInternalCoordinates(): void {
        this.a = this.coordinates[0];
        this.b = { x: this.coordinates[1].x - this.a.x, y: this.coordinates[1].y - this.a.y };
    }

    private addGuideLine(): void {
        this.lineStyle(1, 0xccffcc);
        this.moveTo(0, 0);

        this.position.set(this.a.x, this.a.y); // Start line vertex
        this.lineTo(this.b.x, this.b.y); // End line vertex
    }

    private addReactiveArea(): void {
        let reactAreaWeight = 3;

        let shapeCoord = new PIXI.Polygon(
            0 + reactAreaWeight, 0 - reactAreaWeight,
            this.b.x + reactAreaWeight, this.b.y - reactAreaWeight,
            this.b.x - reactAreaWeight, this.b.y + reactAreaWeight,
            0 - reactAreaWeight, 0 + reactAreaWeight,
        );

        shapeCoord.close();

        if (!this.isDebugging) {
            this.lineStyle(null);
        }

        this.drawPolygon(shapeCoord);
    }

}
