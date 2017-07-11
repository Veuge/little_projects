Ext.define('HelloWorld.Application', {
    name: 'HelloWorld',
    extend: 'Ext.app.Application',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: 'Hello World Extjs',
                    html : 'Hello Vero! Welcome to Ext JS.'
                }
            ]
        });
    }
});
