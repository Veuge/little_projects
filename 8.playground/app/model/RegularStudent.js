Ext.define('playground.model.RegularStudent', {
    extend: "Ext.data.Model",

    fields: [
        { name: 'id', type: 'int'},
        { name: 'name', type: 'string'},
        { name: 'last_name', type: 'string'},
        { name: 'gender', type: 'string'},
        { name: 'last_payment', type: 'string'},
        { name: 'next_payment', type: 'string'},
        { name: 'subjects_allowed', type: 'int'}
    ],

    proxy: {
        type: 'rest',
        url : '/regulars'
    }
});
