Ext.define('playground.controller.RegularStudentController', {
    extend: 'Ext.app.Controller',

    models: [
        'playground.model.RegularStudent'
    ],
    stores: [
        'playground.store.RegularStudents'
    ],

    views: [
        'playground.view.RegularStudentsGrid',
        'playground.view.RegularStudentsForm'
    ],

    init: function(application){
        this.control({
            'grid': {
                render: this.callRegulars,
            },

            'regularstudentsform #save': {
                click: this.onSaveClick
            },

            'regularstudentsgrid #delete': {
                click: this.onDeleteClick
            }
        });
    },

    callRegulars: function(){
        var grid = Ext.ComponentQuery.query('regularstudentsgrid');
        grid[0].getStore().load();
    },

    onSaveClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('regularstudentsgrid')[0];
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
        var grid = button.up('panel');
        var register = grid.getSelectionModel().getSelection();
        var store = register[0].store;

        Ext.Msg.confirm('Attention', 'Are you sure you want to delete this item?', function(buttonId, text, opt){
            if (buttonId === 'yes') {
                register[0].destroy();
            }
        });
    }
});
