Ext.define('playground.model.Career', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'name', type: 'string'},
        { name: 'description', type: 'description'}
    ],

    proxy: {
        type: 'rest',
        url: 'http://10.100.1.85:8000/api/careers',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        }
    }
});
