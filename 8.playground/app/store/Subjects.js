Ext.define('playground.store.Subjects', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,

    model: 'playground.model.Subject',
    proxy: {
        type: 'ajax',
        // url: 'http://192.168.1.159:8000/api/subjects',
        url: 'http://10.100.1.85:8000/api/subjects',
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
