import dependencyContainer, { initBox2App } from "./config/InversionOfControl";
import { Box2AppService } from "./services/Box2AppService";

/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:41
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-12 09:23:06
 */

// tslint:disable:object-literal-sort-keys
initBox2App({
    debug: true,
    allowSleep: true,
    w: 800,
    h: 440,
});
let b2AppService = dependencyContainer.resolve<Box2AppService>(Box2AppService);
