Ext.define('playground.view.ScholarshipStudentsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.scholarshipstudentsgrid',
    store: 'playground.store.ScholarshipStudents',
    title: 'Scholarship Students grid',
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
            text: 'DISCOUNT',
            flex: 2,
            dataIndex: 'discount'
        },
        {
            text: 'MIN GPA',
            flex: 2,
            dataIndex: 'min_gpa'
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
            store: 'playground.store.ScholarshipStudents',
            dock: 'bottom',
            emptyMsg: 'No emails to display',
            displayInfo: true
        }
    ]
});
