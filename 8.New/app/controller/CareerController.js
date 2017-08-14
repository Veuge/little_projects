Ext.define('Playground.controller.CareerController', {
    extend: 'Ext.app.Controller',

    models: [
        'Playground.model.Career'
    ],

    stores: [
        'Playground.store.Careers'
    ],

    views: [
        'Playground.view.ColumnPanel',
        'Playground.view.GridPanel',
        'Playground.view.MenuTree',
        'Playground.view.FormContainer',

        'Playground.view.careers.CareersGrid'
    ],

    refs: [
        { ref: 'welcome', selector: '#welcome' },
        { ref: 'gridContainer', selector: '#grdContainer' },

        { ref: 'careersGrid', selector: '#grdCareers'}
    ],

    init: function(application){
        var me = this;

        me.control({
            'menutree': {
                treeclick: me.callCareers
            }
        });
    },

    /**
     * Function called once the Careers tab from the tree is clicked
     * @param itemClicked   Node from the menu tree
     */
    callCareers: function(itemClicked){
        var me = this;
        var grid;
        var welcome;
        var gridContainer;
        var items;

        if(itemClicked.getId() === Playground.Constants.CAREERS_ACTION){
            welcome = me.getWelcome();
            welcome.hide();

            gridContainer = me.getGridContainer();
            items = {
                items: [
                    { xtype: 'grd-careers' }
                ]
            };
            gridContainer.removeAll(true);
            gridContainer.add(items);

            grid = me.getCareersGrid();
            grid.getStore().load();
            grid.show();
        }
    }
});