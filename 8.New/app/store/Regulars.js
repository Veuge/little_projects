Ext.define('Playground.store.Regulars', {
    extend: 'Ext.data.Store',

    model: 'Playground.model.Regular',
    autoSync: true,
    pageSize: 20
});