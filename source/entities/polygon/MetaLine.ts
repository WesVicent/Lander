/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-03-28 17:39:34
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-28 18:45:133
*/

import { Coordinate } from "../../interfaces/PolygonInterfaces";

export class MetaLine extends PIXI.Graphics {
    public internalCoordinates: Coordinate[] = new Array();

    constructor(coordinates: Coordinate[]) {
        super();

        // this.internalCoordinates.push({ x: coordinates[0].x - coordinates[0].x, y: coordinates[0].y - coordinates[0].y });
        // this.internalCoordinates.push({ x: coordinates[1].x - coordinates[0].x, y: coordinates[1].y - coordinates[0].y });

        this.internalCoordinates.push({ x: 0, y: 3 });
        this.internalCoordinates.push({ x: 250, y: 3 });

        if (this.internalCoordinates.length > 1) {
            let a = coordinates[0];
            let b = coordinates[1];

            this.pivot.x = 0;
            this.pivot.y = 3;

            this.position.set(a.x, a.y);

            this.lineStyle(1, 0xccffcc);
            this.moveTo(this.internalCoordinates[0].x, 0);
            this.lineTo(b.x - a.x, b.y - a.y);
            this.interactive = true;
            // this.beginFill(0xffffff, 0);
            // this.drawRect(0, 0, hipote, 6);
            // g.lineStyle(1, 0xccffcc, 0);
            // this.endFill();

            console.log(coordinates);
        }
    }
}
