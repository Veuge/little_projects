Ext.define('playground.controller.Main', {
    extend: 'Ext.app.Controller',

    models: [
        "playground.model.RegularStudent"
    ],
    stores: [
        "playground.store.RegularStudents"
    ],

    views: [
        "playground.view.RegularStudentsGrid"
    ]
});
