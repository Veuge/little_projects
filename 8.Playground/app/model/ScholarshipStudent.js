Ext.define('playground.model.ScholarshipStudent', {
    extend: "playground.model.Student",

    fields: [
        { name: 'discount', type: 'int' },
        { name: 'min_gpa', type: 'float' }
    ],

    proxy: {
        type: 'rest',
        url : playground.Constants.BASE_URL + 'scholarships',
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

    associations: [
        { type: 'hasMany', model: 'playground.model.Subject' }
    ]
});
