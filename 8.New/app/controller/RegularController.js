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
        { ref: 'schedulePartialForm', selector: 'pnl-schedules-partial' },
        { ref: 'subjectPartialForm', selector: 'pnl-subjects-partial' }
    ],

    init: function(application){
        var me = this;

        me.control({
            'menutree': {
                treeclick: me.callRegulars
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

    /**
     * Function called once the New button is clicked, displays the form to create new regular students
     * @param btn       New button
     * @param e         Click event
     * @param eOpts
     */
    onNewClick: function (btn, e, eOpts) {
        var me = this;

        var win = Ext.create('Playground.view.FormContainer');
        var regularForm = Ext.create('Playground.view.regulars.RegularsPartialForm');

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
        var currentFormPanel = me.getRegularPartialForm();
        var currentForm = currentFormPanel.down('form');
        var nextFormPanel = Ext.create('Playground.view.regulars.SubjectsPartialForm');

        var values = currentForm.getValues();

        var newStudent = Ext.create('Playground.model.Regular', {
            name:               values.name,
            last_name:          values.last_name,
            gender:             values.gender,
            last_payment:       values.last_payment,
            next_payment:       values.next_payment,
            subjects_allowed:   values.subjects_allowed,
            career_id:          values.career_id
        });

        newStudent.deleteId();

        newStudent.save({
            success: function(record, operation){
                console.log("Student saved successfully");
            },
            failure: function(record, operation){
                console.log("Something went wrong");
            }
        });

        win.remove(currentFormPanel, true);
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
                me.setupNextForm(nextFormPanel, suggestionsStore);

                console.log(suggestionsStore);
            }
        });

        win.remove(currentFormPanel, true);
        win.add(nextFormPanel);
    },

    /**
     * Saves the schedule information to the student
     * @param btn       Choose schedule button
     * @param e         Click even
     * @param eOpts
     */
    chooseScheduleClick: function(btn, e, eOpts){
        var me = this;

        console.log("One step closer");
        var win = me.getFormContainer();
        var currentFormPanel = win.down('form');
        var values = currentFormPanel.getValues();

        console.log(currentFormPanel);
        console.log(values);
    },

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
                paths.push(graph.pathFromTo(startSubjects[i], endSubjects[j]));
            }
        }
        return paths;
    },

    evaluatePaths: function(paths, subjectsSeparated, selectedQty){
        var me = this;

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
            score += me.scheduleDistance(subjects);

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
        
        var subjects = [];
        for(var i = 0; i < path.length; i++){
            subjects.push(subjectsSeparated[path.charAt(i)]);
        }

        subjects = me.order(subjects);
        return subjects;
    },
    
    order: function (subjects) {

        var me = this;
        var i, j;
        var temp;

        for(i = 0; i < subjects.length; i++) {
            temp = subjects[i];
            j = i - 1;
            while (j >= 0 && me.dayToIndex(subjects[j].get('schedules').day) > me.dayToIndex(temp.get('schedules').day)) {
                subjects[j + 1] = subjects[j];
                j--;
            }
            subjects[j + 1] = temp;
        }
        return subjects;
    },

    dayToIndex: function(day){
        switch (day){
            case Playground.Constants.MONDAY:
                return Playground.Constants.MONDAY_INDEX;
            case Playground.Constants.TUESDAY:
                return Playground.Constants.TUESDAY_INDEX;
            case Playground.Constants.WEDNESDAY:
                return Playground.Constants.WEDNESDAY_INDEX;
            case Playground.Constants.THURSDAY:
                return Playground.Constants.THURSDAY_INDEX;
            case Playground.Constants.FRIDAY:
                return Playground.Constants.FRIDAY_INDEX;
        }
    },

    scheduleDistance: function(subjects){
        var me = this;

        var total = 0;
        var i;
        var currentDay, nextDay;
        var currentHour, nextHour;

        for(i = 0; i < subjects.length - 1; i++){
            currentDay = me.dayToIndex(subjects[i].get('schedules').day);
            nextDay = me.dayToIndex(subjects[i + 1].get('schedules').day);

            currentHour = subjects[i].get('schedules').start;
            nextHour = subjects[i + 1].get('schedules').start;

            total += Math.abs(currentDay - nextDay) * 10;
            total += Math.abs(currentHour - nextHour);
        }

        return total;
    },

    setupNextForm: function(form, store){
        var txt = "";
        var current;

        for(var i = 0; i < store.getCount(); i++){
            current = store.getAt(i);
            var option = i + 1;
            txt += "Option " + option + ": ";
            txt += "(score " + current.get('score') + ") ";

            for(var j = 0; j < current.get('subjects').length; j++){
                txt += current.get('subjects')[j].get('name') + " " + current.get('subjects')[j].get('schedules').day
                    + " " + current.get('subjects')[j].get('schedules').start + " | ";
            }
            txt += '\n';
        }

        console.log(txt);

        var items = [
            {
                xtype: 'form',
                bodyPadding: 15,
                items: [
                    {
                        xtype: 'text',
                        text: txt
                    },
                    {
                        xtype: 'text',
                        text: 'The best schedule is the one with lowest score',
                        style: 'font-weight: bold; color: #26A65B' /*{
                            fontWeight: 'bold',
                            fontColor: '#26A65B'
                        }*/
                    },
                    {
                        xtype: 'combo',
                        alias: 'widget.'
                        store: store,
                        fieldLabel: 'Schedule',
                        displayField: 'name',
                        valueField: 'name',
                        queryMode: 'local',
                        name: 'name'
                    }

                ],
                buttons: [
                    {
                        xtype: 'button',
                        text: 'Choose schedule',
                        itemId: 'btnChoose'
                    }
                ]
            }
        ];

        form.add(items);
    }
});