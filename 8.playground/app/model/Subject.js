Ext.define('playground.model.Subject', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'credits', type: 'int' },
        { name: 'classroom_id', type: 'int' },
    ],

    proxy: {
        type: 'rest',
        // url : 'http://192.168.1.159:8000/api/subjects'
        url : 'http://10.100.1.85:8000/api/subjects'
    }
});
