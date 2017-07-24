Ext.define('playground.view.SubjectsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.subjectsgrid',
    store: 'playground.store.Subjects',
    title: 'Subjects grid',
    stripeRows: true,

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
            text: 'DESCRIPTION',
            flex: 3,
            dataIndex: 'description'
        },
        {
            text: 'CREDITS',
            flex: 2,
            dataIndex: 'credits'
        }
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
            store: 'playground.store.Subjects',
            dock: 'bottom',
            emptyMsg: 'No emails to display',
            displayInfo: true
        }
    ]
});
