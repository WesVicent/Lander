/*
* @Author: WesFerreira - https://github.com/WesFerreira
* @Date: 2019-09-07 22:09:07
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-09-07 22:19:133
*/

import { Coordinate } from "../interfaces/PolygonInterfaces";

export class ReactiveArea {
    public static rightDiagonal(weight: number, b: Coordinate): number[] {
        return [ 0 + weight, 0 - weight, b.x + weight, b.y - weight, b.x - weight, b.y + weight, 0 - weight, 0 + weight];
    }

    public static leftDiagonal(weight: number, b: Coordinate): number[] {
        return [0 + weight, 0 + weight, b.x + weight, b.y + weight, b.x - weight, b.y - weight, 0 - weight, 0 - weight];
    }

    public static vertical(weight: number, b: Coordinate): number[] {
        return [0 + weight, 0,  b.x + weight, b.y, b.x - weight, b.y, 0 - weight, 0];
    }

    public static horizontal(weight: number, b: Coordinate): number[] {
        return [0, 0 - weight, b.x, b.y - weight, b.x, b.y + weight, 0, 0 + weight];
    }
}
