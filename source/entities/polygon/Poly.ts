/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-25 18:45:33
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-25 19:31:28
 */

export class Poly extends PIXI.Graphics {
    public firstVertex = new PIXI.Graphics();
    public lastVertex = new PIXI.Graphics();
    public isOpen = true;

    private vertexList: number[] = [];
    private vertexPoints = new PIXI.Polygon(this.vertexList);

    constructor() {
        super();
    }

    public draw(x: number, y: number): PIXI.Graphics {
        this.vertexList.push(x);
        this.vertexList.push(y);
        this.vertexPoints = new PIXI.Polygon(this.vertexList);

        this.lineStyle(1, 0xffffff);
        this.beginFill(0xffffff, 0.3);
        this.pivot.set(0.5);
        this.drawPolygon(this.vertexPoints);

        return this;
    }

    public drawFirstVertex(x: number, y: number): PIXI.Graphics {
        this.firstVertex.interactive = true;
        this.firstVertex.beginFill(0xf45342);
        this.firstVertex.pivot.x = 2.5;
        this.firstVertex.pivot.y = 2.5;
        this.firstVertex.drawRect(x, y, 5, 5);

        return this.firstVertex;
    }

    public drawLastVertex(x: number, y: number): PIXI.Graphics {
        this.lastVertex.interactive = true;
        this.lastVertex.beginFill(0xffffff);
        this.lastVertex.pivot.x = 2;
        this.lastVertex.pivot.y = 2;
        this.lastVertex.drawRect(x, y, 4, 4);

        return this.lastVertex;
    }
    public close() {
        this.vertexPoints.close();
        // this.drawLastVertex(this.vertexList[0], this.vertexList[1]);
        this.isOpen = false;
    }

    public redraw() {
        this.clear();
        this.beginFill(0xffffff, 0.3);
        this.lineStyle(1, 0xffffff);
        this.drawPolygon(this.vertexList);
    }
}
