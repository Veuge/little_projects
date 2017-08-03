Ext.define('playground.store.ScholarshipStudents', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'playground.model.ScholarshipStudent',

    pageSize: 20
})
