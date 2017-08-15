Ext.define('Playground.controller.SubjectController', {
    extend: 'Ext.app.Controller',

    models: [
        'Playground.model.Subject'
    ],

    stores: [
        'Playground.store.Subjects'
    ],

    views: [
        'Playground.view.ColumnPanel',
        'Playground.view.GridPanel',
        'Playground.view.MenuTree',
        'Playground.view.FormContainer',

        'Playground.view.subjects.SubjectsGrid'
    ],

    refs: [
        { ref: 'welcome', selector: '#welcome' },
        { ref: 'gridContainer', selector: '#grdContainer' },

        { ref: 'subjectsGrid', selector: '#grdSubjects'}
    ],

    init: function(application){
        var me = this;

        me.control({
            'menutree': {
                treeclick: me.callSubjects
            }
        });
    },

    /**
     * Function called once the Subjects tab from the tree is clicked
     * @param itemClicked   Node from the menu tree
     */
    callSubjects: function(itemClicked){
        var me = this;
        var grid;
        var welcome;
        var gridContainer;
        var items;

        if(itemClicked.getId() === Playground.Constants.SUBJECTS_ACTION){
            welcome = me.getWelcome();
            welcome.hide();

            gridContainer = me.getGridContainer();
            items = {
                items: [
                    { xtype: 'grd-subjects' }
                ]
            };
            gridContainer.removeAll(true);
            gridContainer.add(items);

            grid = me.getSubjectsGrid();
            grid.getStore().load();
            grid.show();
        }
    }
});