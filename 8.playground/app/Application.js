Ext.define('playground.Application', {
    name: 'playground',

    extend: 'Ext.app.Application',

    requires: [
        "Ext.toolbar.Paging",
        "Ext.form.Panel",
        "Ext.form.field.ComboBox",
        "Ext.form.field.Date",
    ],

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
        "Main"
    ],

    stores: [
        // TODO: add stores here
    ]
});
