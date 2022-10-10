import Datastore from 'nedb-promises'
import Ajv from 'ajv'
import eventsSchema from '../schemas/events';
import path from 'path'

interface IEvent {
    title: string
}

class EventsStore {

    schemaValidator;
    db;
    
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(eventsSchema);
        const dbPath = `${path.join(__dirname, "../events.db")}`;
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data: IEvent) {
        return this.schemaValidator(data);
    }

    create(data: IEvent) {
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

export default new EventsStore()