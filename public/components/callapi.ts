import { dialog, ipcMain } from 'electron'
import axios from 'axios'
import FormData from 'form-data'
import path from 'path';
import fs from 'fs'

export default class callApi {

    store;
    jwt;
    app;
    mainWindow;

    constructor(store: any, jwt: string, app: any, mainWindow: any)
    {
        this.store = store;
        this.jwt = jwt;
        this.app = app;
        this.mainWindow = mainWindow;

        this.run();
    }
    run = () => {

        ipcMain.handle("getdata", async (e: any, args: any) => {
            return;
        })

        ipcMain.handle("uploadimages", async (e: any, args: any) => {
            const { url, headers } = args;
            headers.headers["Authorization"] = `Bearer ${this.store.get(this.jwt)}`

            let filepath: any = undefined;
            let file: any;

            let properties: any;
            if( process.platform !== 'darwin' )
            {
                properties = {
                    properties: ['openFile', 'multiSelections']
                }
            } else {
                properties = {
                    properties: ['openFile', 'openDirectory', 'multiSelections']
                }
            }
            
            // Resolves to a Promise<Object>
            file = await dialog.showOpenDialog({
                title: 'Select the File to be uploaded',
                buttonLabel: 'Upload',
                // Restricting the user to only Text Files.
                filters: [
                    {
                        name: 'Image Files',
                        extensions: ['jpg', 'png', 'gif', 'jpeg']
                    }, ],
                // Specifying the File Selector Property
                properties: properties.properties
            });
            
            if (!file.canceled) {
                // Updating the GLOBAL filepath variable 
                // to user-selected file.
                filepath = file.filePaths;
                const formData: any = new FormData();
                if( filepath.length > 0 )
                {
                    for( var i = 0; i < filepath.length; i++ )
                    {
                        formData.append("file[]", fs.createReadStream(filepath[i]))
                    }
                    headers.headers["Content-Type"] = `multipart/form-data; boundary=${formData._boundary}`
                    try {
                        const res = await axios.post(url, formData, headers)
                        if (res.status === 200) {
                            return {
                                status: res.data
                            }
                        } else {
                            return {
                                status: false,
                                message: res.data.message
                            };
                        }
                    } catch (err) {
                        return err
                    }
                }
            }
        })
    }
}