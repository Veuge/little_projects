Ext.define('playground.model.RegularStudent', {
    extend: 'playground.model.Student',

    require: [
        'playground.model.RegularSubject'
    ],

    fields: [
        { name: 'next_payment', type: 'date'},
        { name: 'subjects_allowed', type: 'int'},
    ],
    proxy: {
        type: 'rest',
        url : playground.Constants.BASE_URL + 'regulars',
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
        {
            model: 'playground.model.RegularSubject',
            foreignKey: 'subject_id',
            associationKey: 'subjects',
            name: 'subjects'
        }
    ]
});
