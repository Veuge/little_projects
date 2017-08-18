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
        'Playground.view.careers.CareersGrid',

        // 'Playground.view.regulars.RegularDetails',
        'Playground.view.regulars.RegularsGrid',
        'Playground.view.regulars.RegularsPartialForm',
        'Playground.view.regulars.SchedulesPartialForm',
        'Playground.view.regulars.SubjectsPartialForm',

        'Playground.view.subjects.SubjectsGrid',

        'Playground.view.ColumnPanel',
        'Playground.view.FormContainer',
        'Playground.view.GridPanel',
        'Playground.view.MenuTree'
    ],

    controllers: [
        'Playground.controller.CareerController',
        'Playground.controller.RegularController',
        'Playground.controller.StudentController',
        'Playground.controller.SubjectController',

        'Playground.controller.Helpers'
    ],

    stores: [
        'Playground.store.Careers',
        'Playground.store.Classrooms',
        'Playground.store.Regulars',
        'Playground.store.Scholarships',
        'Playground.store.Subjects',
        'Playground.store.Suggestions'
    ]
});
