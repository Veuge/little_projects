Ext.define('UniversityApp.store.RegularStudents', {
    extend: 'Ext.data.Model',
    model: 'UniversityApp.model.RegularStudent',
    autoLoad: true,
    autoSync: true,
    pageSize: 30
});