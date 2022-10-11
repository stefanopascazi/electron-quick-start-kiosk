import {  ipcMain } from 'electron'
import EventStore from '../db/stores/eventsStore'
import GpioStore from '../db/stores/gpioStore'
import { IGpio } from '../interface/GPio'

const gpio: Array<IGpio> = [{
    label : "GPIO 4",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 5",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 6",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 7",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 20",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 21",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 29",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 33",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 25",
    status: false,
    enable: false,
    start: 0,
    end: 0
},{
    label : "GPIO 26",
    status: false,
    enable: false,
    start: 0,
    end: 0
}]

export default class callApi {

    constructor()
    {
        this.run();
    }
    run = () => {

        ipcMain.handle("create_event", async (e: Electron.IpcMainInvokeEvent, args: any) => {            

            const events = await EventStore.create(args)

            //const result = gpio.map( async(v) => await GpioStore.create({...v,event_id: events?._id}))            

            return events
        })

        
    }
}