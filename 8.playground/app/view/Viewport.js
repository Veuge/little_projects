Ext.define('playground.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'playground.view.RegularStudentsGrid',
        'playground.view.ScholarshipStudentsGrid'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'columnpanel'
    }]
});
