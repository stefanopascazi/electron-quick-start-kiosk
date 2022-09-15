"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var RemoteMain = __importStar(require("@electron/remote/main"));
var window_function_1 = __importDefault(require("./components/window-function"));
// const database = new sqlite3.Database('./public/db/database.db', (err) => {
//     if (err) console.error('Database opening error: ', err);
// });
// database.all("SELECT * FROM repository", (err, rows) => {
//     console.log(rows);
// });
RemoteMain.initialize();
var mainWindow;
var appUrl = electron_is_dev_1.default ? "http://localhost:3000" : "file://".concat(path_1.default.join(__dirname, "../build/index.html"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        title: "Application GPIO ver.".concat(electron_1.app.getVersion()),
        kiosk: true
    });
    RemoteMain.enable(mainWindow.webContents);
    //mainWindow.setMenu(null)
    /**
     * Controllo di versione
     */
    mainWindow.loadURL(appUrl);
    mainWindow.on("close", function () { return mainWindow.destroy(); });
    mainWindow.once("ready-to-show", function () {
        new window_function_1.default(electron_1.app, mainWindow);
    });
};
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    process.platform !== "darwin" && electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    mainWindow === null && createWindow();
});
/**
 * Auto updater
 */
electron_1.ipcMain.on('app_version', function (event) {
    event.sender.send('app_version', { version: electron_1.app.getVersion() });
});
