Ext.define('Playground.view.careers.CareersGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.grd-careers',
    itemId: 'grdCareers',
    store: 'Playground.store.Careers',
    title: 'Careers Grid',

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
            text: 'DESCRIPTION',
            flex: 2,
            dataIndex: 'description'
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
            store: 'Playground.store.Careers',
            dock: 'bottom',
            emptyMsg: 'No careers to display',
            displayInfo: true
        }
    ]
});
