Ext.define('playground.view.RegularStudentsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.regularstudentsgrid',
    store: 'playground.store.RegularStudents',
    title: 'Regular Students grid',

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
            text: 'NEXT PAYMENT',
            flex: 2,
            dataIndex: 'next_payment',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            text: 'SUBJECTS ALLOWED',
            flex: 2,
            dataIndex: 'subjects_allowed',
        },
        {
            text: 'SUBJECTS',
            flex: 2,
            dataIndex: 'subjects',
            name: 'subjects',
            renderer: function(value, row){
                row.record.getSubject().then(function(response){
                    var arrayOfSubjects = response.data;
                    var str = "";

                    for(var i = 0; i < arrayOfSubjects.length; i++){
                        str += "<p>" + arrayOfSubjects[i].name + "</p>";
                    }
                    // console.log("here", arrayOfSubjects);
                    console.log(str);
                    return str;
                }, function(error){
                    console.log(error);
                });
            }
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
            store: 'playground.store.RegularStudents',
            dock: 'bottom',
            emptyMsg: 'No regular students to display',
            displayInfo: true
        }
    ]
});
