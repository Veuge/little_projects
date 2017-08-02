// Ext.define('playground.controller.MainController', {
//     extend: 'Ext.app.Controller',
//
//     models: [
//         'playground.model.Classroom',
//         'playground.model.Subject',
//         'playground.model.RegularStudent',
//         'playground.model.ScholarshipStudent'
//     ],
//
//     stores: [
//         'playground.store.Classrooms',
//         'playground.store.Subjects',
//         'playground.store.RegularStudents',
//         'playground.store.ScholarshipStudents',
//     ],
//
//     views: [
//         'playground.view.ColumnPanel',
//         'playground.view.GridsPanel',
//         'playground.view.MenuTree',
//         'playground.view.Welcome',
//
//         'playground.view.ClassroomsForm',
//         'playground.view.ClassroomsGrid',
//         'playground.view.RegularStudentsForm',
//         'playground.view.RegularStudentsGrid',
//         'playground.view.SubjectsForm',
//         'playground.view.SubjectsGrid',
//         'playground.view.ScholarshipStudentsForm',
//         'playground.view.ScholarshipStudentsGrid',
//     ],
//
//     callCollection: function(record, grid){
//         var grid;
//         var panel = Ext.ComponentQuery.query('gridspanel')[0];
//         var welcome = Ext.ComponentQuery.query('#welcome')[0];
//         welcome.hide();
//
//         var cont = Ext.ComponentQuery.query('#gridscontainer')[0];
//         var items = {
//             items: [
//                 { xtype: grid }
//             ]
//         };
//
//         cont.removeAll(true);
//         cont.add(items);
//
//         grid = Ext.ComponentQuery.query(grid)[0];
//         grid.getStore().load();
//         grid.show();
//     }
// });
