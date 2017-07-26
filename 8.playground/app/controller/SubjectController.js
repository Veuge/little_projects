Ext.define('playground.controller.SubjectController', {
    extend: 'Ext.app.Controller',

    models: [
        'playground.model.Subject'
    ],
    stores: [
        'playground.store.Subjects'
    ],

    views: [
        'playground.view.MenuTree',
        'playground.view.SubjectsGrid',
        'playground.view.SubjectsForm'
    ],

    init: function(application){
        this.control({
            'menutree': {
                dummyevent: this.callSubjects,
            },

            'subjectsform #save': {
                click: this.onSaveClick
            },

            'subjectsgrid #delete': {
                click: this.onDeleteClick
            }
        });
    },

    callSubjects: function(record){
        if(record.getId() === 'callSubjects'){
            var grid = Ext.ComponentQuery.query('subjectsgrid')[0];
            var panel = Ext.ComponentQuery.query('gridspanel')[0];
            var children = panel.items.items;

            for(var i = 0; i < children.length; i++){
                children[i].hide();
            }

            grid.getStore().load();
            grid.show();
        }
    },

    onSaveClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('subjectsgrid')[0];
        var win = Ext.ComponentQuery.query('#formWindow')[0];
        var form = win.down('form');
        var store = grid.getStore();
        var record;

        if(record){
            console.log("edit");
            form.updateRecord();
            record = form.getRecord();
        }
        else{
            console.log("create");
            var values = form.getValues();
            record = Ext.create('playground.model.Subject', {
                name: values.name,
                description: values.description,
                credits: values.credits,
                classroom_id: values.classroom_id
            });
        }

        record.save({
            success: function(record, operation){
                console.log('Success');
            },

            failure: function(record, operation){
                console.log('Failed');
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
