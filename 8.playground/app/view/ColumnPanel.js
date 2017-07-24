Ext.define('playground.view.ColumnPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.columnpanel',
    itemId: 'columnPanel',

    title: 'Some nice title',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    // layout: 'column',
    items: [
        {
            xtype: 'menutree',
            flex: 1
        },
        // {
        //     xtype: 'panel',
        //     flex: 4,
        //     title: 'Welcome!',
        //     html: 'Please select an item from the tree menu to see the details',
        //     bodyPadding: 15
        // }
        {
            xtype: 'regularstudentsgrid',
            flex: 4
        }
    ]
})
