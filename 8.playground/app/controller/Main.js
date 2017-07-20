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
                itemdblclick: this.onEditClick
            },

            'regularstudentsgrid button#add': {
                click: this.onAddClick
            },

            'regularstudentsform button#cancel': {
                click: this.onCancelClick
            },
        });
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
    }
});
