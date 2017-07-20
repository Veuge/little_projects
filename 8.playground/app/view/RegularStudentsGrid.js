Ext.define('playground.view.RegularStudentsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.regularstudentsgrid',
    store: 'playground.store.RegularStudents',
    title: 'Regular Students grid',

    columns: [
        {
            text: 'ID',
            flex: 1,
            dataIndex: 'id'
        },
        {
            text: 'NAME',
            flex: 3,
            dataIndex: 'name'
        },
        {
            text: 'LAST NAME',
            flex: 3,
            dataIndex: 'last_name'
        },
        {
            text: 'GENDER',
            flex: 2,
            dataIndex: 'gender'
        },
        {
            text: 'LAST PAYMENT',
            flex: 2,
            dataIndex: 'last_payment',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            text: 'NEXT PAYMENT',
            flex: 2,
            dataIndex: 'next_payment',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            text: 'SUBJECTS ALLOWED',
            flex: 2,
            dataIndex: 'subjects_allowed'
        },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'New',
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
            store: 'playground.store.RegularStudents',
            dock: 'bottom',
            emptyMsg: 'No emails to display',
            displayInfo: true
        }
    ]
});
