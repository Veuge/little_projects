Ext.define('playground.controller.Main', {
    extend: 'Ext.app.Controller',

    statics: {
        CAREER_FORM: 'formCareer',
        RSTUDENT_FORM: 'regularStudentInfo',
        SUBJECT_FORM: 'subjectForm'
    },

    refs: [
        { ref: 'completeForm', selector: 'regularstudentsform' },
        { ref: 'formCareer', selector: 'formCareer' },
        { ref: 'formRStudent', selector: 'regularstudentinfo' }
    ],

    models: [
        'playground.model.RegularStudent',
        'playground.model.ScholarshipStudent',
        'playground.model.Subject',
        'playground.model.Career'
    ],
    stores: [
        'playground.store.RegularStudents',
        'playground.store.ScholarshipStudents',
        'playground.store.Subjects',
        'playground.store.Careers'
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
        'CareersGrid',
        // 'ClassroomsForm'
    ],

    init: function(application){
        // var me = this;

        this.control({

            'grid': {
                itemdblclick: this.onEditClick
            },

            'regularstudentsgrid button#add': {
                // click: me.onAddClick
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
            },

            'classroomsgrid button#add': {
                click: this.onAddClassroomClick
            },
            'regularstudentsform button#nextButton': {
                click: this.onNextButtonClick
            }
        });
    },

    // Shows the form :v
    onAddClick: function(button, e, options){
        var win = Ext.create('playground.view.RegularStudentsForm');
        var form = win.down('form');
        var formCareer = Ext.ComponentQuery.query('#formCareer')[0];
        // console.log('form career', formCareer);

        var storeCareers = Ext.create('playground.store.Careers');
        var radioItems = [];
        var radioGroup = Ext.ComponentQuery.query('#radio')[0];
        win.setTitle('Create regular student');

        storeCareers.load({
            callback: function(records, success){
                storeCareers.each(function(record){
                    radioGroup.add({
                        boxLabel: record.get('name'),
                        name: record.get('id'),
                        inputValue: record.get('id')
                    });
                }, this);

                // radioGroup.items = radioItems;
                // console.log('radio group', radioGroup);
                // radioGroup.updateLayout();
                // formCareer.add(this, radioGroup, 0);
                // formCareer.updateLayout();
            }
        });
    },

    // Shows the form with the instance of the record clicked
    onEditClick: function(row, record, item, index, e, options){
        var win = Ext.create('playground.view.RegularStudentsForm')
        var form = win.down('form');

        win.setTitle('Edit regular student - ' + record.get('name') + ' ' + record.get('last_name'));
        form.loadRecord(record);
    },

    onCancelClick: function(button, e, options){
        var win = button.up('window');
        var form = win.down('form');
        form.getForm().reset();
        win.close();
    },

    onAddScholarshipClick: function(button, e, options){
        var win = Ext.create('playground.view.ScholarshipStudentsForm');
        var form = win.down('form');
        win.setTitle('Create Scholarship student');
    },

    onAddSubjectClick: function(button, e, options){
        var win = Ext.create('playground.view.SubjectsForm');
        var form = win.down('form');
        win.setTitle('Create Subject');
    },

    onAddClassroomClick: function(button, e, options){
        var win = Ext.create('playground.view.ClassroomsForm');
        var form = win.down('form');
        win.setTitle('Create Classroom');
    },

    onNextButtonClick: function(button, e, options){
        var me = this;
        var form = me.getCompleteForm();
        var formChildren = form.items.items;

        var nextFormId = me.getNextForm(button);
        var nextForm = Ext.ComponentQuery.query('#' + nextFormId)[0];
    },


    // HELPER FUNCTIONS

    getNextForm: function(btn){
        var me = this;
        var controllerReference = me.getController('Main').self;

        var currentForm = btn.up('form');
        var currentFormId = currentForm.getItemId();

        if(currentFormId === controllerReference.CAREER_FORM){
            return controllerReference.RSTUDENT_FORM;
        }
        else if(currentFormId === controllerReference.RSTUDENT_FORM){
            return controllerReference.SUBJECT_FORM;
        }
    }
});
