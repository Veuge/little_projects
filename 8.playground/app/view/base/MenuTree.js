// Ext.define('playground.view.base.MenuTree', {
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.menutree',
//     itemId: 'menuTree',
//     title: 'Menu',
//     listeners: {
//         cellclick: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts){
//             this.fireEvent('dummyevent', record);
//         }
//     },
//     store: {
//         xtype: 'tree',
//         root: {
//             text: 'Root',
//             expanded: true,
//             children: [
//                 {
//                     text: 'Careers',
//                     leaf: true
//                 },
//                 {
//                     text: 'Subjects',
//                     leaf: true,
//                     id: 'callSubjects'
//                 },
//                 {
//                     text: 'Classrooms',
//                     leaf: true,
//                     id: 'callClassrooms'
//                 },
//                 {
//                     text: 'Students',
//                     leaf: false,
//                     children: [
//                         {
//                             text: 'Regular Students',
//                             leaf: true,
//                             id: 'callRegulars'
//                         },
//                         {
//                             text: 'Scholarship Students',
//                             leaf: true,
//                             id: 'callScholarships'
//                         }
//                     ]
//                 },
//             ]
//         }
//     }
// });
