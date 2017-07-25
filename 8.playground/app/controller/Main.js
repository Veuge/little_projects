Ext.define('playground.controller.Main', {
    extend: 'Ext.app.Controller',

    models: [
        'playground.model.RegularStudent',
        'playground.model.ScholarshipStudent',
        'playground.model.Subject'
    ],
    stores: [
        'playground.store.RegularStudents',
        'playground.store.ScholarshipStudents',
        'playground.store.Subjects'
    ],

    views: [
        'playground.view.MenuTree',
        'playground.view.ColumnPanel',
        'playground.view.RegularStudentsGrid',
        'playground.view.RegularStudentsForm',
        'playground.view.ScholarshipStudentsGrid',
        'playground.view.ScholarshipStudentsForm',
        'playground.view.SubjectsGrid',
        'playground.view.SubjectsForm'
    ],

    init: function(application){
        this.control({
            'grid': {
                itemdblclick: this.onEditClick
            },

            'regularstudentsgrid button#add': {
                click: this.onAddClick
            },

            'regularstudentsform button#cancel': {
                click: this.onCancelClick
            },

            'scholarshipstudentsgrid button#add': {
                click: this.onAddScholarshipClick
            },

            'subjectsgrid button#add': {
                click: this.onAddSubjectClick
            }
        });
    },

    // Shows the form :v
    onAddClick: function(button, event, options){
        var win = Ext.create('playground.view.RegularStudentsForm');
        var form = win.down('form');

        var record = new playground.model.RegularStudent({});
        form.loadRecord(record);
        win.setTitle('Create regular student');
    },

    // Shows the form with the instance of the record clicked
    onEditClick: function(row, record, item, index, event, options){
        var win = Ext.create('playground.view.RegularStudentsForm')
        var form = win.down('form');

        win.setTitle('Edit regular student - ' + record.get('name') + ' ' + record.get('last_name'));
        form.loadRecord(record);
    },

    onCancelClick: function(button, event, options){
        var win = button.up('window');
        var form = win.down('form');
        form.getForm().reset();
        win.close();
    },

    onAddScholarshipClick: function(button, event, options){
        var win = Ext.create('playground.view.ScholarshipStudentsForm');
        var form = win.down('form');

        var record = new playground.model.ScholarshipStudent({});
        form.loadRecord(record);
        win.setTitle('Create Scholarship student');
    },

    onAddSubjectClick: function(button, event, options){
        var win = Ext.create('playground.view.SubjectsForm');
        var form = win.down('form');

        var record = new playground.model.Subject({});
        record.set('classroom_id', 1);
        form.loadRecord(record);
        win.setTitle('Create Subject');
    },
});
