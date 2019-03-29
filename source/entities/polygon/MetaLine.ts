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

            let width = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

            this.lineStyle(1, 0xccffcc);
            this.moveTo(this.internalCoordinates[0].x, this.internalCoordinates[0].y);
            this.lineTo(width, this.internalCoordinates[1].y);
            this.interactive = true;
            this.beginFill(0xffffff, 0);
            this.drawRect(0, 0, width, 6);
            // g.lineStyle(1, 0xccffcc, 0);
            this.endFill();

            let v = b.y - a.y / b.x - a.x;

            console.log(v);


            this.rotation = v;
            this.pivot.x = 0;
            this.pivot.y = 3;
            this.position.x = coordinates[0].x;
            this.position.y = coordinates[0].y;
        }
    }
}
