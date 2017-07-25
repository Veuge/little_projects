Ext.define('playground.store.Classrooms', {
    extend: 'Ext.data.Store',

    autoSync: true,
    model: 'playground.model.Classroom',
    pageSize: 20
});
