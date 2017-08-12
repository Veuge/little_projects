Ext.define('Playground.store.Scholarships', {
    extend: 'Ext.data.Store',

    model: 'Playground.model.Scholarship',
    autoSync: true,
    pageSize: 20
});