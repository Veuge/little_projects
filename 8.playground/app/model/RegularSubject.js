Ext.define('playground.model.RegularSubject', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'regular_id', type: 'int' },
        { name: 'subject_id', type: 'int' }
    ],

    associations: [
        {
            type: 'belongsTo',
            model: 'playground.model.RegularStudent',
            name: 'regular',
            foreignKey: 'regular_id'
        },
        {
            type: 'belongsTo',
            model: 'playground.model.Subject',
            name: 'subject',
            foreignKey: 'subject_id'
        }
    ]
});
