Ext.define('playground.model.Classroom', {
    extend: 'Ext.data.Model',

    fields: [
        // { name: 'id', type: 'int', persist: false },
        { name: 'classroom_name', type: 'string' },
        { name: 'capacity', type: 'int' }
    ],

    proxy: {
        type: 'rest',
        url: 'http://10.100.1.85:8000/api/classrooms',
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

    hasMany: [
        { model: 'playground.model.Subject', name: 'getSubjects' }
    ]
});
