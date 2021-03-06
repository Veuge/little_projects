Ext.define('playground.controller.ScholarshipStudentController', {
    extend: 'Ext.app.Controller',

    models: [
        'playground.model.ScholarshipStudent'
    ],
    stores: [
        'playground.store.ScholarshipStudents'
    ],

    views: [
        'playground.view.MenuTree',
        'playground.view.ScholarshipStudentsGrid',
        'playground.view.ScholarshipStudentsForm'
    ],

    init: function(application){
        this.control({
            'menutree': {
                dummyevent: this.callScholarships,
            },

            'scholarshipstudentsform #save': {
                click: this.onSaveClick
            },

            'scholarshipstudentsgrid #delete': {
                click: this.onDeleteClick
            }
        });
    },

    callScholarships: function(record){
        if(record.getId() === 'callScholarships'){
            var grid;
            var welcome = Ext.ComponentQuery.query('#welcome')[0];
            var gridspanel = Ext.ComponentQuery.query('gridspanel')[0];
            welcome.hide();
            var cont = Ext.ComponentQuery.query('#gridscontainer')[0];
            var items = {
                items: [
                    { xtype: 'scholarshipstudentsgrid' }
                ]
            };

            cont.removeAll(true);
            cont.add(items);

            grid = Ext.ComponentQuery.query('scholarshipstudentsgrid')[0];
            grid.getStore().load();
            grid.show();
        }
    },

    onSaveClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('scholarshipstudentsgrid')[0];
        var win = Ext.ComponentQuery.query('#formWindow')[0];
        var form = win.down('form');
        var values = form.getValues();
        var store = grid.getStore();
        var record;

        form.updateRecord();
        record = form.getRecord();

        record.save({
            failure: function(record, operation){
                console.log('Failed');
            },

            success: function(record, operation){
                console.log('Success');
            }
        });
        store.sync();
        win.close();
    },

    onDeleteClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('scholarshipstudentsgrid')[0];
        var register = grid.getSelectionModel().getSelection();
        var store = register[0].store;

        Ext.Msg.confirm('Attention', 'Are you sure you want to delete this item?', function(buttonId, text, opt){
            if (buttonId === 'yes') {
                register[0].destroy();
            }
        });
    }
});
