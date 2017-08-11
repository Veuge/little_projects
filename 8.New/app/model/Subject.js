Ext.define('Playground.model.Subject', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'credits', type: 'int' },
        { name: 'classroom_id', type: 'int' },
        { name: 'career_id', type: 'int' },
        { name: 'schedules', type: 'auto' }
    ],

    validations: [
        { type: 'presence', field: 'name' },
        { type: 'length', field: 'name', min: 3 },
        { type: 'presence', field: 'classroom_id' },
        { type: 'presence', field: 'career_id' }
    ],

    proxy: {
        type: 'rest',
        url: Playground.Constants.BASE_URL + 'subjects',

        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        },

        writer: {
            writeRecordId: false
        }
    }
});