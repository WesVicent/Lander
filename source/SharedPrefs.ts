/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-03-27 02:17:25
 * @Last Modified by:   WesFerreira
 * @Last Modified time: 2019-03-27 02:17:25
 */

export class SharedPrefs {
    private static _instance: SharedPrefs;

    public mouseX: number;
    public mouseY: number;
    public bench: PIXI.Graphics; // <IMPROVE> add WorkBench depencency in Poly.
    public clickedVertex: number; // <IMPROVE>

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        //
    }
}
