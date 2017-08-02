Ext.define('playground.view.CareersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.careersgrid',
    store: 'playground.store.Careers',
    title: 'Careers list',
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
            flex: 4,
            dataIndex: 'description'
        },
    ],
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'playground.store.Careers',
            dock: 'bottom',
            emptyMsg: 'No careers to display',
            displayInfo: true
        }
    ]
});
