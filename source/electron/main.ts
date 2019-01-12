/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-12 07:42:52
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-12 09:14:17
 */


import { app, BrowserWindow, globalShortcut } from "electron";

let win: BrowserWindow;

function createWindow() {
    // tslint:disable:object-literal-sort-keys
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false,

        },
    });

    globalShortcut.register("f5", function () {
        win.reload();
    });


    win.setMenu(null);
    win.maximize();

    // and load the index.html of the app.
    win.loadFile("./dist/index.html");

    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.