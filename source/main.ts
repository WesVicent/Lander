/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-03-11 04:20:13
 */
// tslint:disable:object-literal-sort-keys

import { WorkBench } from "./sections/WorkBench";

let wBench: WorkBench;

window.onload = function () {
    wBench = new WorkBench({
        containerId: "container",
        w: window.innerWidth,
        h: window.innerHeight,
        debug: false,
        allowSleep: true,
    });

    wBench.addListenners();


};

