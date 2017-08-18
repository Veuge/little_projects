Ext.define('Playground.controller.RegularController', {
    extend: 'Ext.app.Controller',

    models: [
        'Playground.model.Regular',
        'Playground.model.Suggestion'
    ],

    stores: [
        'Playground.store.Regulars',
        'Playground.store.Suggestions'
    ],

    views: [
        'Playground.view.ColumnPanel',
        'Playground.view.GridPanel',
        'Playground.view.MenuTree',
        'Playground.view.FormContainer',

        'Playground.view.regulars.RegularsGrid',
        'Playground.view.regulars.RegularsPartialForm',
        'Playground.view.regulars.SchedulesPartialForm',
        'Playground.view.regulars.SubjectsPartialForm'
    ],

    refs: [
        { ref: 'welcome', selector: '#welcome' },
        { ref: 'gridContainer', selector: '#grdContainer' },
        { ref: 'regularsGrid', selector: '#grdRegulars'},
        { ref: 'formContainer', selector: 'frm-container' },
        { ref: 'regularForm', selector: '#frmRegulars' },
    ],

    init: function(application){
        var me = this;

        me.control({
            'menutree': {
                treeclick: me.callRegulars
            },

            '#grdRegulars':{
                itemdblclick: me.regularDetails
            },

            '#btnNew': {
                click: me.onNewClick
            },

            '#btnDelete': {
                click: me.deleteRegular
            },

            '#btnNext': {
                click: me.saveStudentInfo
            }
        });
    },

    /**
     * Function called once the Regular Student tab from the tree is clicked
     * @param itemClicked   Node from the menu tree
     */
    callRegulars: function(itemClicked){
        var me = this;
        var grid;
        var welcome;
        var gridContainer;
        var items;

        if(itemClicked.getId() === Playground.Constants.REGULARS_ACTION){
            welcome = me.getWelcome();
            welcome.hide();

            gridContainer = me.getGridContainer();
            items = {
                items: [
                    { xtype: 'grd-regulars' }
                ]
            };
            gridContainer.removeAll(true);
            gridContainer.add(items);

            grid = me.getRegularsGrid();
            grid.getStore().load();
            grid.show();
        }
    },

    /**
     * Function called once an item from the grid is selected and the Delete button is clicked
     * @param btn       Delete button
     * @param e         Click event
     * @param eOpts
     */
    deleteRegular: function(btn, e, eOpts){
        var me = this;

        var grid = me.getRegularsGrid();
        var record = grid.getSelectionModel().getSelection();
        var store = grid.getStore();

        Ext.Msg.confirm('Attention', 'Are you sure you want to delete this regular student?', function(buttonId, text, opt){
            if (buttonId === 'yes') {
                record[0].destroy();
                store.sync();
            }
        });
    },

    /**
     *
     * @param a
     * @param record
     * @param item
     * @param index
     * @param e
     * @param eOpts
     */
    regularDetails: function (a, record, item, index, e, eOpts) {
        var win = Ext.create('Playground.view.FormContainer');
        var regularDetailsPanel = Ext.create('Playground.view.regulars.RegularDetails');

        var jsonStudent;
        var string = "";

        Ext.Ajax.request({
            url: Playground.Constants.BASE_URL + 'regulars/' + record.getId(),
            method: 'GET',

            success: function (response) {
                jsonStudent = Ext.JSON.decode(response.responseText);
                string += "NAME: " + jsonStudent.data[0].name + " " + jsonStudent.data[0].last_name + "\n";
                string += "GENDER: " + jsonStudent.data[0].gender + "\n";
                string += "LAST PAYMENT: " + jsonStudent.data[0].last_payment + "\n";
                string += "NEXT PAYMENT: " + jsonStudent.data[0].next_payment + "\n";
                string += "SUBJECTS_ALLOWED: " + jsonStudent.data[0].subjects_allowed + "\n";

                if(jsonStudent.data[0].subjects.length > 0){
                    string += "=====SUBJECTS\n";

                    for(var i = 0; i < jsonStudent.data[0].subjects.length; i++){
                        string += "- " + jsonStudent.data[0].subjects[i].name + " " ;
                        string += jsonStudent.data[0].subjects[i].selected_schedule.day + " ";
                        string += jsonStudent.data[0].subjects[i].selected_schedule.start + ":00\n";
                    }
                }
                var items = [
                    {
                        xtype: 'text',
                        text: string
                    }
                ];
                regularDetailsPanel.add(items);
                win.add(regularDetailsPanel);
            }
        });
    },

    /**
     * Function called once the New button is clicked, displays the form to create new regular students
     * @param btn       New button
     * @param e         Click event
     * @param eOpts
     */
    onNewClick: function (btn, e, eOpts) {
        var win = Ext.create('Playground.view.FormContainer');
        var regularFormPanel = Ext.create('Playground.view.regulars.RegularsPartialForm');
        var regularForm = regularFormPanel.down('form');

        var record = Ext.create('Playground.model.Regular');
        record.deleteId();
        regularForm.loadRecord(record);

        win.add(regularForm);
    },

    /**
     * Function called when the Next button is clicked.
     * Saves the Regular student info and displays the Subjects form
     * @param btn       Next button
     * @param e         Click event
     * @param eOpts
     */
    saveStudentInfo: function (btn, e, eOpts) {
        var me = this;

        var win = me.getFormContainer();
        var currentForm = me.getRegularForm();
        var nextFormPanel = Ext.create('Playground.view.regulars.SubjectsPartialForm');

        currentForm.updateRecord();
        var newStudent = currentForm.getRecord();

        newStudent.save({
            action: 'create',
            proxy: {
                url: Playground.Constants.BASE_URL + 'regulars'
            },
            success: function(record, operation){
                console.log("Saved successfully");
            },
            failure: function(record, operation){
                console.log("Saved successfully");
            }
        });
        console.log(newStudent);

        win.removeAll(true);
        win.add(nextFormPanel);
    }
});