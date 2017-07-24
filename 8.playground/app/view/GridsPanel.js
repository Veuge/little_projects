Ext.define('playground.view.GridsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gridspanel',

    items: [
        {
            xtype: 'panel',
            flex: 4,
            title: 'Welcome!',
            html: 'Please select an item from the tree menu to see the details',
            bodyPadding: 15,
            itemId: 'welcome'
        },
        {
            xtype: 'regularstudentsgrid',
            hidden: true
        },
        {
            xtype: 'scholarshipstudentsgrid',
            hidden: true
        },
        {
            xtype: 'subjectsgrid',
            hidden: true
        }
    ]
});
