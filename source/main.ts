/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-25 18:54:10
 */
// tslint:disable:object-literal-sort-keys

import { WorkBench } from "./sections/WorkBench";

let wBench: WorkBench;

window.onload = function() {
    wBench = new WorkBench({
        containerId: "container",
        w: window.innerWidth,
        h: window.innerHeight,
        debug: true,
        allowSleep: true,
    });

    window.addEventListener("mousedown", function(e) {
        if (e.button === 0) { // If left button
            wBench.drawPoly(e.clientX, e.clientY);
        }
    });
};

