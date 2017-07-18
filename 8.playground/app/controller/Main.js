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
                render: this.onGridRender
            },

            "button": {
                click: this.onAddClick
            }
        });
    },

    onGridRender: function(grid, options){
        grid.getStore().load();
    },

    onAddClick: function(button, event, options){
        console.log("CLick!");
    }
});
