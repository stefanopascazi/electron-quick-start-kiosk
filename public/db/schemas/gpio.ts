const gpioSchema = {
    type: 'object',
    properties: {
        event_id: {
            type: 'string'
        },
        label: {
            type: 'string',
        },
        status: {
            type: 'boolean',
            default: false
        },
        enable: {
            type: 'boolean',
            default: false
        },
        start: {
            type: 'number',
            default: 0
        },
        end: {
            type: 'number',
            default: 0
        }
    },
};

export default gpioSchema