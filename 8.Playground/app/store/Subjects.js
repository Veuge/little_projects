Ext.define('playground.store.Subjects', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,

    model: 'playground.model.Subject',
    pageSize: 20
});
