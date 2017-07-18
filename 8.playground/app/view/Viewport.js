Ext.define('playground.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'playground.view.Main',
        'playground.view.RegularStudentsGrid'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'regularstudentsgrid'
    }]
});
