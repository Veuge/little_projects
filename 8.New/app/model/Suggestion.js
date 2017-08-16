Ext.define('Playground.model.Suggestion', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'subjects', type: 'auto' },
        { name: 'score', type: 'int' }
    ]
});