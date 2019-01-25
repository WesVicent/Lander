/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-25 18:45:33
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-25 19:31:28
 */

export class Vertex {
    private static pointG = new PIXI.Graphics();

    private static pts = [];
    private static polyG = new PIXI.Graphics();

    public static addPoint(x: number, y: number) {
        this.pointG.lineStyle(1.5, 0xFFFFFF);

        // draw a rectangle
        this.pointG.drawRect(x, y, 4, 4);
        this.pointG.pivot.x = 2;
        this.pointG.pivot.y = 2;

        return this.pointG;
    }

    public static addLine(x: number, y: number): ILine {
        this.pts.push(x);
        this.pts.push(y);

        this.polyG.lineStyle(0.5, 0xffffff);
        this.polyG.drawPolygon(this.pts);
        this.polyG.endFill();

        return { poly: this.polyG, points: this.pts };
    }

    public static highlightVertex() {

        this.pointG.on("mouseup", function() {
            this.pointG.currentPath.lineColor = 0xfff;
            console.log("0ver");

        });
    }
}

export interface ILine {
    poly: PIXI.Graphics;
    points: number[];
}
