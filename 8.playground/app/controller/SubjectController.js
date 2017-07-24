Ext.define('playground.controller.SubjectController', {
    extend: 'Ext.app.Controller',

    models: [
        'playground.model.Subject'
    ],
    stores: [
        'playground.store.Subjects'
    ],

    views: [
        'playground.view.SubjectsGrid',
        'playground.view.SubjectsForm'
    ],

    init: function(application){
        this.control({
            'subjectsgrid': {
                render: this.callScholarships,
            },

            'subjectsform #save': {
                click: this.onSaveClick
            },

            'subjectsgrid #delete': {
                click: this.onDeleteClick
            }
        });
    },

    callScholarships: function(){
        var grid = Ext.ComponentQuery.query('subjectsgrid');
        grid[0].getStore().load();
    },

    onSaveClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('subjectsgrid')[0];
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
        var grid = Ext.ComponentQuery.query('subjectsgrid')[0];
        var register = grid.getSelectionModel().getSelection();
        var store = register[0].store;

        Ext.Msg.confirm('Attention', 'Are you sure you want to delete this item?', function(buttonId, text, opt){
            if (buttonId === 'yes') {
                register[0].destroy();
            }
        });
    }
});
