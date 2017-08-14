Ext.define('Playground.view.ColumnPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.columnpanel',
    itemId: 'columnPanel',

    title: 'Some nice title',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'menutree',
            flex: 1
        },
        {
            xtype: 'gridspanel',
            flex: 4
        }
    ]
})
