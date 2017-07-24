Ext.define('playground.model.Classroom', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'classroom_name', type: 'string' },
        { name: 'capacity', type: 'int' }
    ],

    associations: [
        { type: 'belongsTo', model: 'playground.model.Subject' };
    ]
});
