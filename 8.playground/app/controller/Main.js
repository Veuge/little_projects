Ext.define('playground.controller.Main', {
    extend: 'Ext.app.Controller',

    models: [
        "playground.model.RegularStudent"
    ],
    stores: [
        "playground.store.RegularStudents"
    ],

    views: [
        "playground.view.RegularStudentsGrid",
        "playground.view.RegularStudentsForm"
    ],

    init: function(application){
        this.control({
            "grid": {
                render: this.onGridRender,
                itemdblclick: this.onEditClick
            },

            "regularstudentsgrid button#add": {
                click: this.onAddClick
            },

            "regularstudentsform button#cancel": {
                click: this.onCancelClick
            }
        });
    },

    onGridRender: function(grid, options){
        grid.getStore().load();
    },

    onAddClick: function(button, event, options){
        console.log("CLick!");
        var win = Ext.create("playground.view.RegularStudentsForm");
        win.setTitle("Create regular student");
    },

    onEditClick: function(row, record, item, index, event, options){
        var win = Ext.create("playground.view.RegularStudentsForm")
        win.setTitle("Edit regular student - " + record.get("name") + " " + record.get("last_name"));

        var form = win.down("form");
        form.loadRecord(record);
    },

    onCancelClick: function(button, event, options){
        var win = button.up("window");
        var form = win.down("form");
        form.getForm().reset();
        win.close();
    }
});
