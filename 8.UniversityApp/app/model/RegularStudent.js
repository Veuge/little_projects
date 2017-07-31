Ext.define('UniversityApp.model.RegularStudent', {
    extend: 'UniversityApp.model.Student',

    fields: [
        { name: 'next_payment', type: 'date' },
        { name: 'subjects_allowed', type: 'int' }
    ],

    proxy: {
        type: 'rest',
        url: 'http://192.168.1.159:8000/api/regulars',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'pagination.total'
        },
        writer: {
            dateFormat: 'Y-m-d',
        }
    }
});