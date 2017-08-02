Ext.define('playground.controller.Main', {
    extend: 'Ext.app.Controller',

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
            },

            'classroomsgrid button#add': {
                click: this.onAddClassroomClick
            }
        });
    },

    // Shows the form :v
    // onAddClick: function(view){
    //     return function(button, event, options){
    //         var win = Ext.create('playground.view.RegularStudentsForm');
    //         var form = win.down('form');
    //         win.setTitle('Create regular student');
    //     }
    // },
    //
    onAddClick: function(button, event, options){
        var win = Ext.create('playground.view.RegularStudentsForm');
        var form = win.down('form');
        var formCareer = Ext.ComponentQuery.query('#formCareer')[0];
        console.log('form career', formCareer);
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
                // // radioGroup.updateLayout();
                // formCareer.add(this, radioGroup, 0);
                // formCareer.updateLayout();
            }
        });
    },

    // onAddClick: function(button, event, options){
    //     var storeCareers = Ext.create('playground.store.Careers');
    //     var radioItems = [];
    //
    //     storeCareers.load({
    //         callback: function(records, success){
    //             storeCareers.each(function(record){
    //                 radioItems.push({
    //                 boxLabel: record.get('name'),
    //                     name: record.get('id'),
    //                     inputValue: record.get('id')
    //                 });
    //
    //                 var form = Ext.create('Ext.window.Window', {
    //                     height: 400,
    //                     width: 500,
    //                     title: 'Create Regular Student',
    //
    //                     layout: {
    //                         type: 'accordion',
    //                         titleCollapse: false,
    //                         animate: true,
    //                         activeOnTop: true,
    //                     },
    //                     autoShow: true,
    //                     items: [
    //                         {
    //                             xtype: 'form',
    //                             title: 'Career',
    //                             bodyPadding: 15,
    //                             defaults: {
    //                                 anchor: '100%',
    //                             },
    //                             items: [
    //                                 {
    //                                     xtype: 'radiogroup',
    //                                     itemId: 'radio',
    //                                     fieldLabel: 'Career',
    //                                     name: 'whatever',
    //                                     columns: 1,
    //                                     vertical: true,
    //                                     items: radioItems
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             xtype: 'regularstudentinfo',
    //                             title: 'Regular Student',
    //                             bodyPadding: 15,
    //                             defaults: {
    //                                 anchor: '100%'
    //                             },
    //                             items: [
    //                                 {
    //                                     xtype: 'textfield',
    //                                     name: 'name',
    //                                     fieldLabel: 'Student name',
    //                                 },
    //                                 {
    //                                     xtype: 'textfield',
    //                                     name: 'last_name',
    //                                     fieldLabel: 'Student last name'
    //                                 },
    //                                 {
    //                                     xtype: 'combo',
    //                                     name: 'gender',
    //                                     fieldLabel: 'Gender',
    //                                     queryMode: 'local',
    //                                     displayField: 'gender',
    //                                     store: {
    //                                         fields: ['gender'],
    //                                         data: [
    //                                             { 'gender': 'Female' },
    //                                             { 'gender': 'Male' },
    //                                         ]
    //                                     }
    //                                 },
    //                                 {
    //                                     xtype: 'datefield',
    //                                     name: 'last_payment',
    //                                     fieldLabel: 'Last payment',
    //                                     format: 'Y/m/d',
    //                                     maxValue: new Date()
    //                                 },
    //                                 {
    //                                     xtype: 'datefield',
    //                                     name: 'next_payment',
    //                                     fieldLabel: 'Next payment',
    //                                     format: 'Y/m/d'
    //                                 },
    //                                 {
    //                                     xtype: 'numberfield',
    //                                     name: 'subjects_allowed',
    //                                     fieldLabel: 'Subjects allowed'
    //                                 },
    //                                 {
    //                                     xtype: 'combo',
    //                                     fieldLabel: 'Subjects',
    //                                     store: 'playground.store.Subjects',
    //                                     name: 'subjects',
    //                                     displayField: 'name',
    //                                     valueField: 'id',
    //                                     multiSelect: true
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }).show();
    //
    //             }, this);
    //         }
    //     });
    //
    //
    // },

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
