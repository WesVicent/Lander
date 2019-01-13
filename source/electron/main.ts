/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:52
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-12 18:05:01
 */

import { app, BrowserWindow, globalShortcut } from "electron";

let win: BrowserWindow;
// tslint:disable:object-literal-sort-keys

function createWindow() {
    ////////////////// SETUP //////////////////
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false,
        },
        show: false,
    });
    win.maximize();
    win.setMenu(null);

    win.loadFile("./dist/index.html");

    globalShortcut.register("f5", function () {
        win.reload();
    });
    globalShortcut.register("f1", function () {
        win.webContents.openDevTools();
    });
    ///////////////////////////////////////////

    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
