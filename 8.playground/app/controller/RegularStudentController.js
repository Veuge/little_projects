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
        'playground.view.RegularStudentsForm',
        'playground.view.MenuTree'
    ],

    init: function(application){
        this.control({
            'menutree': {
                dummyevent: this.callRegulars
            },

            'regularstudentsform #save': {
                click: this.onSaveClick
            },

            'regularstudentsgrid #delete': {
                click: this.onDeleteClick
            }
        });
    },

    callRegulars: function(record){
        console.log(record);
        // if(record.getId() === "callRegulars"){
        //     var grid;
        //     var welcome = Ext.ComponentQuery.query('#welcome')[0];
        //     welcome.hide();
        //
        //     var cont = Ext.ComponentQuery.query('#gridscontainer')[0];
        //     var items = {
        //         items: [
        //             { xtype: 'regularstudentsgrid' }
        //         ]
        //     };

            // gridspanel.add(cont);
            // cont.removeAll(true);
            // cont.add(items);
            //
            // grid = Ext.ComponentQuery.query('regularstudentsgrid')[0];
            // grid.getStore().load();
            // grid.show();
        // }
    },

    onSaveClick: function(button, event, options){
        var grid = Ext.ComponentQuery.query('regularstudentsgrid')[0];
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
            record = Ext.create('playground.model.RegularStudent', {
                name: values.name,
                last_name: values.last_name,
                gender: values.gender,
                last_payment: values.last_payment,
                next_payment: values.next_payment,
                subjects_allowed: values.subjects_allowed
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
        var grid = Ext.ComponentQuery.query('regularstudentsgrid')[0];
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
