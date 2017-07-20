Ext.define('playground.controller.Main', {
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
                render: this.onGridRender,
                itemdblclick: this.onEditClick
            },

            'regularstudentsgrid button#add': {
                click: this.onAddClick
            },

            'regularstudentsgrid button#delete': {
                click: this.onDeleteClick
            },

            'regularstudentsform button#cancel': {
                click: this.onCancelClick
            },

            'regularstudentsform button#add': {
                click: this.onSaveClick
            }
        });
    },

    onGridRender: function(grid, options){
        grid.getStore().load();
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

    onSaveClick: function(button, event, options){
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();

        form.updateRecord();
        var record = form.getRecord();
        console.log(record);

        if(record.getId() === 0){
            delete record.data.id;
        }

        record.save({
            failure: function(record, operation){
                console.log('Failed');
            },

            success: function(record, operation){
                console.log('Success');
            }
        });
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
