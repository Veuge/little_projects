Ext.define('Playground.store.Classrooms', {
    extend: 'Ext.data.Store',

    model: 'Playground.model.Classroom',
    autoSync: true,
    pageSize: 20
});