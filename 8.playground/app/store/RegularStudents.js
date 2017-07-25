Ext.define('playground.store.RegularStudents', {
    extend: 'Ext.data.Store',

    autoSync: true,
    model: 'playground.model.RegularStudent',
    
    pageSize: 20
});
