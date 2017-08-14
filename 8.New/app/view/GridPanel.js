Ext.define('Playground.view.GridPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gridspanel',
    layout: 'fit',

    items: [
        {
            xtype: 'panel',
            flex: 4,
            alias: 'widget.welcome',
            itemId: 'welcome',
            title: 'Welcome!',
            html: 'Please select an item from the tree menu to see the details',
            bodyPadding: 15
        },
        {
            xtype: 'container',
            alias: 'widget.grd-container',
            // layout: 'fit',
            itemId: 'grdContainer'
        }
    ]
});
