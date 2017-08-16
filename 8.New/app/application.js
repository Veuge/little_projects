Ext.define('Playground.Application', {
    name: 'Playground',

    extend: 'Ext.app.Application',

    /**
     * Constants singleton added to be able to access to "global variables"
     */
    requires:[
        'Playground.Constants'
    ],

    views: [
        'Playground.view.ColumnPanel',
        'Playground.view.FormContainer',
        'Playground.view.GridPanel',
        'Playground.view.MenuTree',

        'Playground.view.careers.CareersGrid',

        'Playground.view.regulars.RegularsGrid',
        'Playground.view.regulars.RegularsPartialForm',
        'Playground.view.regulars.SchedulesPartialForm',
        'Playground.view.regulars.SubjectsPartialForm',

        'Playground.view.subjects.SubjectsGrid'
    ],

    controllers: [
        'Playground.controller.CareerController',
        'Playground.controller.RegularController',
        'Playground.controller.SubjectController',

        'Playground.controller.Helpers'
    ],

    stores: [
        'Playground.store.Careers',
        'Playground.store.Regulars',
        'Playground.store.Subjects'
    ]
});
