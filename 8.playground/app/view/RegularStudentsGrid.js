Ext.define("playground.view.RegularStudentsGrid", {
    extend: "Ext.grid.Panel",

    alias: "widget.regularstudentsgrid",
    store: "playground.store.RegularStudents",
    title: "Regular Students grid",

    columns: [
        {
            text: "ID",
            width: 35,
            dataIndex: "id"
        },
        {
            text: "NAME",
            width: 35,
            dataIndex: "name"
        },
        {
            text: "LAST NAME",
            width: 35,
            dataIndex: "last_name"
        },
        {
            text: "GENDER",
            width: 35,
            dataIndex: "gender"
        },
        {
            text: "LAST PAYMENT",
            width: 35,
            dataIndex: "last_payment"
        },
        {
            text: "NEXT PAYMENT",
            width: 35,
            dataIndex: "next_payment"
        },
        {
            text: "SUBJECTS ALLOWED",
            width: 35,
            dataIndex: "subjects_allowed"
        },
    ],
    dockedItems: [
        {
            xtype: "toolbar",
            dock: "top",
            items: [
                {
                    xtype: "button",
                    text: "New",
                },
                {
                    xtype: "button",
                    text: "Delete",
                }

            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: "playground.store.RegularStudents",
            dock: 'bottom',
            displayInfo: true
        }
    ]
});