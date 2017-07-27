Ext.define('playground.controller.ClassroomController', {
    // extend: 'Ext.app.Controller',
    // extend: 'Ext.app.MainController',

    models: [
        'playground.model.Classroom'
    ],
    stores: [
        'playground.store.Classrooms'
    ],

    views: [
        'playground.view.ClassroomsGrid',
        'playground.view.ClassroomsForm',
        'playground.view.MenuTree'
    ],

    init: function(application){
        this.control({
            'menutree': {
                dummyevent: this.callClassrooms
            },

            'classroomsform #saveClassroom': {
                click: this.onSaveClick
            },

            'classroomsgrid #delete': {
                click: this.onDeleteClick
            }
        });
    },

    callClassrooms: function(record){
        if(record.getId() === "callClassrooms"){
            var grid;
            var panel = Ext.ComponentQuery.query('gridspanel')[0];
            var welcome = Ext.ComponentQuery.query('#welcome')[0];
            welcome.hide();

            var cont = Ext.ComponentQuery.query('#gridscontainer')[0];
            var items = {
                items: [
                    { xtype: 'classroomsgrid' }
                ]
            };

            cont.removeAll(true);
            cont.add(items);

            grid = Ext.ComponentQuery.query('classroomsgrid')[0];
            grid.getStore().load();
            grid.show();
        }
    },

    onSaveClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('classroomsgrid')[0];
        var win = Ext.ComponentQuery.query('#formWindow')[0];
        var form = win.down('form');
        var store = grid.getStore();
        var record = form.getRecord();

        if(record){
            console.log("edit");
            form.updateRecord();
            record = form.getRecord();
        }
        else {
            console.log("create");
            var values = form.getValues();
            record = Ext.create('playground.model.Classroom', {
                classroom_name: values.classroom_name,
                capacity: values.capacity
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
        var grid = Ext.ComponentQuery.query('classroomsgrid')[0];
        var register = grid.getSelectionModel().getSelection();
        var store = register[0].store;

        Ext.Msg.confirm('Attention', 'Are you sure you want to delete this item?', function(buttonId, text, opt){
            if (buttonId === 'yes') {
                register[0].destroy();
                store.sync();
            }
        });
    }
});
