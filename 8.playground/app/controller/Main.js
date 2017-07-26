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
        'MenuTree',
        'ColumnPanel',
        'RegularStudentsGrid',
        'RegularStudentsForm',
        'ScholarshipStudentsGrid',
        'ScholarshipStudentsForm',
        'SubjectsGrid',
        'SubjectsForm',
        'ClassroomsGrid',
        // 'ClassroomsForm'
    ],

    init: function(application){
        this.control({
            'grid': {
                itemdblclick: this.onEditClick
            },

            'regularstudentsgrid button#add': {
                click: this.onAddClick('regularstudentsgrid')
            },

            'regularstudentsform button#cancel': {
                click: this.onCancelClick
            },

            'scholarshipstudentsgrid button#add': {
                click: this.onAddScholarshipClick
            },

            'subjectsgrid button#add': {
                click: this.onAddSubjectClick
            },

            'classroomsgrid button#add': {
                click: this.onAddClassroomClick
            }
        });
    },

    // Shows the form :v
    onAddClick: function(view){
        return function(button, event, options){
            var win = Ext.create('playground.view.RegularStudentsForm');
            var form = win.down('form');
            win.setTitle('Create regular student');
        }
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
        win.setTitle('Create Scholarship student');
    },

    onAddSubjectClick: function(button, event, options){
        var win = Ext.create('playground.view.SubjectsForm');
        var form = win.down('form');
        win.setTitle('Create Subject');
    },

    onAddClassroomClick: function(button, event, options){
        var win = Ext.create('playground.view.ClassroomsForm');
        var form = win.down('form');
        win.setTitle('Create Classroom');
    },
});
