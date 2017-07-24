Ext.define('playground.store.RegularStudents', {
    extend: 'Ext.data.Store',

    autoSync: true,
    model: 'playground.model.RegularStudent',
    proxy: {
        type: 'ajax',
        url: 'http://192.168.1.159:8000/api/regulars',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        },
        writer: {
            writeRecordId: false,
            dateFormat: 'Y-m-d'
        }
    },
    pageSize: 20
});
