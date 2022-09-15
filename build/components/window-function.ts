import { ipcMain, dialog, BrowserWindow } from "electron";


export default class windowFunction {

    mainWindow;
    app;

    constructor(app: any, mainWindow: BrowserWindow)
    {
        this.app = app;
        this.mainWindow = mainWindow;

        this.run()
    }

    run = () => {
        /**
         * Custome default window function
         */

        ipcMain.on("quit", async () => {
            const response = await dialog.showMessageBox({
                buttons: ["Si", "Cancel"],
                message: "Sei sicuro di voler uscire?"
            })
            response.response === 0 && this.app.quit()
        })
    }
}