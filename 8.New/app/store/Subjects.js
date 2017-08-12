Ext.define('Playground.store.Subjects', {
    extend: 'Ext.data.Store',

    model: 'Playground.model.Subject',
    autoSync: true,
    pageSize: 20
});