import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import * as RemoteMain from '@electron/remote/main'
import windowFunction from './components/window-function'
import callApi from './components/callapi'
import {Gpio} from 'onoff'

RemoteMain.initialize()

let mainWindow: BrowserWindow;
const appUrl: string = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "/../build/index.html")}`

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        title: `Application GPIO ver.${app.getVersion()}`,
        kiosk: false,
        width: 1024,
        height: 600
    });

    RemoteMain.enable(mainWindow.webContents)

    //mainWindow.setMenu(null)
    /**
     * Controllo di versione
     */
    mainWindow.loadURL(
        appUrl
    );

    mainWindow.on("close", () => mainWindow.destroy())

    mainWindow.once("ready-to-show", () => {
        new windowFunction(app, mainWindow)
        new callApi()
    })
}

app.on("ready", createWindow)
app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit()
})
app.on("activate", () => {
    mainWindow === null && createWindow()
})

/**
 * Auto updater
 */
ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on("start_gpio", (e: Electron.IpcMainInvokeEvent, args: any) => {
    const led = new Gpio(4, "out")
    if( led.readSync() === 0 ){
        led.writeSync(1)
    } else {
        led.writeSync(0)
    }

    setTimeout(()=> {
        led.writeSync(0)
        led.unexport();
    }, 10000)

    return true;
})