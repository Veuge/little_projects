Ext.define('Playground.view.regulars.RegularsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.grd-regulars',
    itemId: 'grdRegulars',
    store: 'Playground.store.Regulars',
    title: 'Regular Students Grid',

    stripeRows: true,

    columns: [
        {
            text: 'ID',
            flex: 1,
            dataIndex: 'id'
        },
        {
            text: 'NAME',
            flex: 2,
            dataIndex: 'name'
        },
        {
            text: 'LAST NAME',
            flex: 2,
            dataIndex: 'last_name'
        },
        {
            text: 'GENDER',
            flex: 1,
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
            flex: 1,
            dataIndex: 'subjects_allowed',
        },
       /* {
            text: 'SUBJECTS',
            flex: 3,
            dataIndex: 'subjects',
            name: 'subjects',
            renderer: function(value){
                var str = '';
                for(var i = 0; i < value.length; i++){
                    str += '<span>' + value[i].name + " </span>";
                }
                return str;
            }
        }*/
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'New',
                    itemId: 'btnNew'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    itemId: 'btnDelete'
                }

            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: 'Playground.store.Regulars',
            dock: 'bottom',
            emptyMsg: 'No regular students to display',
            displayInfo: true
        }
    ]
});
