Ext.define('playground.store.ScholarshipStudents', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'playground.model.ScholarshipStudent',
    proxy: {
        type: 'ajax',
        url: 'http://192.168.1.159:8000/api/scholarships',
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
})
