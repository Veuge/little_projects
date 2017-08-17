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
        { ref: 'btnNew', selector: '#btnNew' },
        { ref: 'btnDelete', selector: '#btnDelete' },
        { ref: 'btnNext', selector: '#btnNext' },
        { ref: 'btnSuggest', selector: '#btnSuggest' },
        { ref: 'btnChoose', selector: '#btnChoose' },

        { ref: 'formContainer', selector: 'frm-container' },
        { ref: 'regularPartialForm', selector: 'pnl-regulars-partial' },
        { ref: 'regularForm', selector: '#frmRegulars' },
        { ref: 'schedulePartialForm', selector: 'pnl-schedules-partial' },
        { ref: 'subjectPartialForm', selector: 'pnl-subjects-partial' },

        { ref: 'cmbSchedules', selector: '#cmbSchedules' }
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
            },

            '#btnSuggest': {
                click: me.suggestSchedulesClick
            },

            '#btnChoose': {
                click: me.chooseScheduleClick
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

    regularDetails: function (a, record, item, index, e, eOpts) {
        console.log("Double click!");
        console.log(record);
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
    },

    /**
     * Obtains the selected subjects with the preferred time to generate schedules
     * @param btn       Suggest schedules button
     * @param e         Click event
     * @param eOpts
     */
    suggestSchedulesClick: function(btn, e, eOpts){
        var me = this;
        var helpers = me.getController('Playground.controller.Helpers');

        var win = me.getFormContainer();
        var currentFormPanel = me.getSubjectPartialForm();
        var nextFormPanel = Ext.create('Playground.view.regulars.SchedulesPartialForm');
        var subjectsForm = currentFormPanel.down('form');
        var values = subjectsForm.getValues();
        var subjectsStore = Ext.create('Playground.store.Subjects');
        var suggestionsStore;

        var subjectsSelected = [];
        var subjectsSeparated = [];
        var graph;
        var paths;

        subjectsStore.load({
            scope: this,
            callback: function(records){
                subjectsSelected = helpers.getSelectableSubjects(values, records, values.preference);
                helpers.identifyConflicts(subjectsSelected);
                graph = me.schedulesGraph(subjectsSelected, subjectsSeparated);
                paths = me.findPaths(graph, subjectsSeparated);
                // console.log(paths);
                suggestionsStore = me.evaluatePaths(paths, subjectsSeparated, values.subjects.length);
                helpers.setupNextForm(nextFormPanel, suggestionsStore);

                console.log(suggestionsStore);
            }
        });

        win.remove(currentFormPanel, true);
        win.add(nextFormPanel);
    },

    /**
     * Saves the schedule information to the student
     * @param btn       Choose schedule button
     * @param e         Click event
     * @param eOpts
     */
    chooseScheduleClick: function(btn, e, eOpts){
        var me = this;

        var win = me.getFormContainer();
        var grid = me.getRegularsGrid();
        var cmbSchedules = me.getCmbSchedules();
        var currentFormPanel = win.down('form');

        var studentsStore = grid.getStore();
        var lastPage = Math.ceil(studentsStore.getTotalCount() / studentsStore.pageSize);

        var optionSelected = currentFormPanel.getValues();
        var schedulesStore = cmbSchedules.getStore();
        console.log(schedulesStore);

        var jsonObject = [];

        studentsStore.loadPage(lastPage, {
            callback: function (records) {
                var studentId = this.last().getId();
                console.log(studentId);

                for(var i = 0; i < schedulesStore.getCount(); i++){
                    var current = schedulesStore.getAt(i);
                    if(current.get('name') === optionSelected.name){
                        var selectedSubjects = current.get('subjects');

                        for(var j = 0; j < selectedSubjects.length; j++){
                            var subjectId = selectedSubjects[j].get('id');
                            var scheduleId = selectedSubjects[j].get('schedules').id;
                            jsonObject.push({
                                "subject_id": subjectId,
                                "schedule_id": scheduleId
                            });
                        }

                        console.log(jsonObject);
                        jsonObject = JSON.stringify(jsonObject);
                        console.log(jsonObject);

                        Ext.Ajax.request({
                            url: Playground.Constants.BASE_URL + 'regulars/' + studentId + '/subjects',
                            method: 'POST',
                            jsonData: jsonObject,
                            success: function(response){
                                console.log('success' + response);
                            }
                        });
                        break;
                    }
                }

                Ext.Msg.alert('Success', 'The regular student information was successfully saved.', function(){
                    win.close();
                    this.close();
                })
            }
        });

        /* (regular_id, subject_id, schedule_id) */

    },

    /* =========================================================================================================================== */


    /**
     * Assembles a graph of subjects and schedules
     * @param arraySubjects
     * @param subjectsSeparated
     */
    schedulesGraph: function(arraySubjects, subjectsSeparated) {
        var adjMatrix = Ext.create('Playground.model.helpers.AdjacencyMatrix');

        var graph = Ext.create('Playground.model.helpers.Graph');
        graph._constructor();

        graph.addVertices(arraySubjects, subjectsSeparated);
        adjMatrix._constructor(subjectsSeparated.length);

        graph.addEdges(subjectsSeparated, adjMatrix);

        graph.print();
        adjMatrix.print();

        return graph;
    },

    findPaths: function(graph, subjectsSeparated){
        var me = this;
        var helpers = me.getController('Playground.controller.Helpers');
        var i, j;

        var startSubjects = helpers.getByLevel(0, subjectsSeparated);
        var endSubjects = helpers.getByLevel(subjectsSeparated[subjectsSeparated.length - 1].level, subjectsSeparated);

        var paths = [];
        for(i = 0; i < startSubjects.length; i++){
            for(j = 0; j < endSubjects.length; j++){
                if(graph.pathFromTo(startSubjects[i], endSubjects[j])){
                    paths.push(graph.pathFromTo(startSubjects[i], endSubjects[j]));
                }
            }
        }
        return paths;
    },

    evaluatePaths: function(paths, subjectsSeparated, selectedQty){
        var me = this;
        var helpers = me.getController('Playground.controller.Helpers');

        var path;
        var evaluations = Ext.create('Playground.store.Suggestions');
        var evaluation;
        var score;
        var subjects = [];

        var i, j;
        for(i = 0; i < paths.length; i++){
            score = 0;
            j = i + 1;
            path = paths[i];
            score += Math.abs(selectedQty - path.length);
            subjects = me.filterPathSubjects(path, subjectsSeparated);
            score += helpers.scheduleDistance(subjects);

            evaluation = Ext.create('Playground.model.Suggestion', {
                name: 'Option ' + j,
                subjects: subjects,
                score: score
            });

            evaluations.add(evaluation);
        }
        return evaluations;
    },

    filterPathSubjects: function(path, subjectsSeparated){
        var me = this;
        var helpers = me.getController('Playground.controller.Helpers');
        
        var subjects = [];
        for(var i = 0; i < path.length; i++){
            subjects.push(subjectsSeparated[path.charAt(i)]);
        }

        subjects = helpers.order(subjects);
        return subjects;
    },
});