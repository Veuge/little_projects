Ext.define('Playground.store.Careers', {
    extend: 'Ext.data.Store',

    model: 'Playground.model.Career',
    autoSync: true,
    pageSize: 20
});