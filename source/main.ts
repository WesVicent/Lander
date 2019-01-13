/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-12 22:17:26
 */

import dependencyContainer, { initBox2App } from "./config/InversionOfControl";
import { Box2AppService } from "./services/Box2AppService";

// tslint:disable:object-literal-sort-keys
initBox2App({
    containerId: "container",
    customStyles: "background: #fff;",
    addClass: "col-8-16 col-offset-4-16",
    debug: true,
    allowSleep: true,
});
let b2App = dependencyContainer.resolve<Box2AppService>(Box2AppService);
b2App.removeCanvasFuzz(600, 600);

let ctx = b2App.app.getContext("2d");

ctx.rect(20, 20, 100, 100);
ctx.stroke();

