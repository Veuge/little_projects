Ext.define('playground.model.RegularStudent', {
    extend: 'playground.model.Student',

    fields: [
        { name: 'next_payment', type: 'date'},
        { name: 'subjects_allowed', type: 'int'}
    ],

    proxy: {
        type: 'rest',
        url : 'http://192.168.1.159:8000/api/regulars'
    }
});
