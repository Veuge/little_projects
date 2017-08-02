Ext.define('playground.view.ClassroomsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.classroomsgrid',
    itemId: 'classroomsGrid',
    store: 'playground.store.Classrooms',

    title: 'Classrooms grid',
    columns: [
        {
            text: 'ID',
            flex: 1,
            dataIndex: 'id'
        },
        {
            text: 'NAME',
            flex: 3,
            dataIndex: 'classroom_name'
        },
        {
            text: 'CAPACITY',
            flex: 3,
            dataIndex: 'capacity'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            itenId: 'addClassroom',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    itemId: 'add'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    itemId: 'delete'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: 'playground.store.Classrooms',
            dock: 'bottom',
            displayInfo: true
        }
    ]
});
