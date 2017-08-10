Ext.define('playground.Application', {
    name: 'playground',

    extend: 'Ext.app.Application',

    requires: [
        'playground.Constants',

        'Ext.toolbar.Paging',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
    ],

    views: [
        'playground.view.MenuTree',
        'playground.view.ColumnPanel',
        'playground.view.GridsPanel',
        'playground.view.RegularStudentsGrid',
        'playground.view.RegularStudentsForm',
        'playground.view.ScholarshipStudentsGrid',
        'playground.view.ScholarshipStudentsForm',
        'playground.view.SubjectsGrid',
        'playground.view.SubjectsForm',
        'playground.view.ClassroomsGrid',
        'playground.view.ClassroomsForm',
        'playground.view.CareersGrid'
    ],

    controllers: [
        'Main',
        // 'MainController',
        'RegularStudentController',
        'ScholarshipStudentController',
        'SubjectController',
        'ClassroomController',
    ],

    stores: [
        // TODO: add stores here
    ]
});