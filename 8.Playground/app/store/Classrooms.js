Ext.define('playground.store.Classrooms', {
    extend: 'Ext.data.Store',

    storeId: 'classroomsStore',
    autoSync: true,
    model: 'playground.model.Classroom',
    pageSize: 20
});
