Ext.define('playground.model.RegularSubject', {
    extend: 'Ext.data.Model',

    require: [
        'playground.model.RegularStudent',
        'playground.model.Subject'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'regular_id', type: 'int' },
        { name: 'subject_id', type: 'int' }
    ],

    belongsTo: [
        {
            model: 'playground.model.RegularStudent',
            name: 'regular',
            instanceName: 'regular',
            getterName: 'getRegulars',
            setterName: 'setRegulars',
            associationKey: 'regulars',
            foreignKey: 'regular_id'
        },
        {
            model: 'playground.model.Subject',
            name: 'subject',
            instanceName: 'subject',
            getterName: 'getSubjects',
            setterName: 'setSubjects',
            associationKey: 'subjects',
            foreignKey: 'subject_id'
        }
    ]
    // associations: [
    //     {
    //         type: 'belongsTo',
    //         model: 'playground.model.RegularStudent',
    //         name: 'regular',
    //         foreignKey: 'regular_id'
    //     },
    //     {
    //         type: 'belongsTo',
    //         model: 'playground.model.Subject',
    //         name: 'subject',
    //         foreignKey: 'subject_id'
    //     }
    // ]
});
