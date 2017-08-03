Ext.define('playground.model.Career', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'name', type: 'string'},
        { name: 'description', type: 'description'}
    ],

    proxy: {
        type: 'rest',
        url: playground.Constants.BASE_URL + 'careers',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        }
    },

    hasMany: {
        model: 'playground.model.Subject', name: 'subjects'
    }
});
