Ext.define('playground.Application', {
    name: 'playground',

    extend: 'Ext.app.Application',

    requires: [
        'Ext.toolbar.Paging',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
    ],

    views: [
        'playground.view.MenuTree',
        'playground.view.ColumnPanel',
        'playground.view.RegularStudentsGrid',
        'playground.view.RegularStudentsForm',
        'playground.view.ScholarshipStudentsGrid',
        'playground.view.ScholarshipStudentsForm'
    ],

    controllers: [
        // TODO: add controllers here
        'Main',
        'RegularStudentController',
        'ScholarshipStudentController'
    ],

    stores: [
        // TODO: add stores here
    ]
});
