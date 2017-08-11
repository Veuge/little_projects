Ext.define('Playground.model.Career', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
    ],

    proxy: {
        type: 'rest',
        url: Playground.Constants.BASE_URL + 'careers',

        reader: {
            type: 'json',
            root: 'data',
        },

        writer: {
            writeRecordId: false
        }
    }
});