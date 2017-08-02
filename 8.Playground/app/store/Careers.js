Ext.define('playground.store.Careers', {
    extend: 'Ext.data.Store',
    model: 'playground.model.Career',
    autoSync: true,
    pageSize: 20
});
