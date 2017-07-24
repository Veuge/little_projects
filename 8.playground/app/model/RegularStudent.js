Ext.define('playground.model.RegularStudent', {
    extend: 'playground.model.Student',

    fields: [
        { name: 'next_payment', type: 'date'},
        { name: 'subjects_allowed', type: 'int'}
    ],

    proxy: {
        type: 'rest',
        // url : 'http://192.168.1.159:8000/api/regulars'
        url : 'http://10.100.1.85:8000/api/regulars'
    },

    associations: [
        { type: 'hasMany', model: 'playground.model.Subject', name: 'subjects'},
    ]
});
