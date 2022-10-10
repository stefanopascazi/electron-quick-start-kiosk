import Datastore from 'nedb-promises'
import Ajv from 'ajv'
import gpioSchema from '../schemas/gpio';
import path from 'path'

class GpioStore {

    schemaValidator;
    db;


    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(gpioSchema);
        const dbPath = `${path.join(__dirname, "../gpio.db")}`;
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data: any) {
        return this.schemaValidator(data);
    }

    create(data: any) {
        const isValid = this.validate(data);
        if (isValid) {
            return this.db.insert(data);
        }
    }

    read(_id: string) {
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        return this.db.find({}).exec()
    }

    readActive() {
        return this.db.find({}).exec();
    }

    archive({_id}: any) {
        return this.db.update({_id}, {$set: {isDone: true}})
    }
}

export default new GpioStore()