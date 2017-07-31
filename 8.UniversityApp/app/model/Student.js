Ext.define('UniversityApp.model.Student', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'last_payment', type: 'date' },
        { name: 'career_id', type: 'int' },
    ],

    validations: [
        { type: 'presence', field: 'name' },
        { type: 'length', field: 'name', min: 3 },
        { type: 'presence', field: 'last_name' },
        { type: 'length', field: 'last_name', min: 3 },
        { type: 'presence', field: 'gender' },
        { type: 'inclusion', field: 'gender', list: ['Female', 'Male'] },
        { type: 'presence', field: 'last_payment' },
    ]
});