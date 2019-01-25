/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-25 02:10:04
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-25 03:25:31
 * I'am back
 */

export class GridLayer {

    public static add(aboveOf: HTMLCanvasElement) {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "gridVie55w");
        canvas.style.cssText = "position: absolute; z-index: 2;";

        let context = canvas.getContext("2d");

        canvas.width = aboveOf.width;
        canvas.height = aboveOf.height;

        (<HTMLDivElement>aboveOf.parentNode)
            .insertBefore(canvas, document.body.getElementsByTagName("canvas")[0]);

        for (let x = 0.5; x < window.innerWidth; x += 50) {
            context.setLineDash([1, 3]);
            context.moveTo(x, 0);
            context.lineTo(x, window.innerHeight);
        }

        for (let y = 0.5; y < window.innerHeight; y += 50) {
            context.setLineDash([1, 3]);
            context.moveTo(0, y);
            context.lineTo(window.innerWidth, y);
        }

        context.strokeStyle = "#ddd";
        context.stroke();
    }
}
