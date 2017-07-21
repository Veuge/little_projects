Ext.define('Ext.store.Subjects', {
    extend: 'Ext.data.Store',

    proxy: {
        type: 'ajax',
        url: 'http://10.100.1.85:8000/subjects',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        },
        writer: {
            writeRecordId: false,
            dateFormat: 'Y-m-d'
        }
    }
});
