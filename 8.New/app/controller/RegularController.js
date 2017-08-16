Ext.define('Playground.controller.RegularController', {
    extend: 'Ext.app.Controller',

    models: [
        'Playground.model.Regular'
    ],

    stores: [
        'Playground.store.Regulars'
    ],

    views: [
        'Playground.view.ColumnPanel',
        'Playground.view.GridPanel',
        'Playground.view.MenuTree',
        'Playground.view.FormContainer',

        'Playground.view.regulars.RegularsGrid',
        'Playground.view.regulars.RegularsPartialForm',
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

        { ref: 'formContainer', selector: 'frm-container' },
        { ref: 'regularPartialForm', selector: 'pnl-regulars-partial' },
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
     * @param btn       Next buton
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

        var win = me.getFormContainer();
        var currentFormPanel = me.getSubjectPartialForm();
        var subjectsForm = currentFormPanel.down('form');
        var values = subjectsForm.getValues();
        var subjectsStore = Ext.create('Playground.store.Subjects');
        var subjectsSelected = [];

        // win.remove(currentFormPanel, true);

        subjectsStore.load({
            scope: this,
            callback: function(records, success){
                subjectsSelected = me.getSelectableSubjects(values, records, values.preference);
                me.identifyConflicts(subjectsSelected);
                var possibleSchedules = me.suggestSchedules(subjectsSelected);
            }
        });
    },


    /**
     * Returns the list of subjects selected filtered by the preference of schedules as well
     * @param selectedIds       List of subject ids selected
     * @param subjectsArray     Complete list of subjects
     * @param preference        Schedule preference [Morning, Afternoon, Night]
     *
     * @returns {Array}         List of subject selected with schedules according to preference
     */
    getSelectableSubjects: function(selectedIds, subjectsArray, preference){
        var me = this;
        var min, max;
        var selectableSub = [];

        if(preference === Playground.Constants.MORNING){
            min = Playground.Constants.MORNING_MIN;
            max = Playground.Constants.MORNING_MAX;
        }
        else if (preference === Playground.Constants.AFTERNOON) {
            min = Playground.Constants.AFTERNOON_MIN;
            max = Playground.Constants.AFTERNOON_MAX;
        }
        else if (preference === Playground.Constants.NIGHT) {
            min = Playground.Constants.NIGHT_MIN;
            max = Playground.Constants.NIGHT_MAX;
        }

        for(var i = 0; i < subjectsArray.length; i++){
            var subject = subjectsArray[i];
        //Ext.Array.forEach(subjectsArray, function(subject) {
            if(Ext.Array.indexOf(selectedIds.subjects, subject.getId()) >= 0){
                var schedules = subject.get('schedules');
                var selectableSch = [];
                for(var j = 0; j < schedules.length; j++){
                    if(schedules[j].start >= min && schedules[j].start <= max){
                        selectableSch.push(schedules[j]);
                    }
                }
                if(selectableSch.length > 0){
                    delete subject.data.schedules;
                    subject.set('schedules', selectableSch);
                    selectableSub.push(subject);
                }
            }
        }
        //});
        return selectableSub;
    },


    /**
     * Marks the schedules in each subject that is repeated in another subject
     * @param subjectsArray     List of selected subjects with preferred schedule
     */
    identifyConflicts: function(subjectsArray){
        var me = this;
        var j = 1;

        for(var i = 0; i < subjectsArray.length - 1; i++){
            while (i + j < subjectsArray.length) {
                me.compareSchedules(subjectsArray[i].get('schedules'), subjectsArray[i+j].get('schedules'));
                j++;
            }
        }
    },

    /**
     * Adds an id in the schedules that are repeated between subjects
     * @param currentSchedules  List of current schedules
     * @param nextSchedules     List of next schedules
     */
    compareSchedules: function(currentSchedules, nextSchedules){
        var conflictId = 1;
        for(var i = 0; i < currentSchedules.length; i++){
            for(var j = 0; j < nextSchedules.length; j++){
                if(currentSchedules[i].day === nextSchedules[j].day
                    && currentSchedules[i].hour === nextSchedules[j].hour){
                    currentSchedules[i].conflict = conflictId;
                    nextSchedules[j].conflict = conflictId;
                    conflictId++;
                    break;
                }
            }
        }
    },

    /**
     * Assembles a graph of schedules
     * @param arraySubjects
     */
    suggestSchedules: function(arraySubjects) {
        var me = this;
        var i, j;
        var subjectSeparated = [];
        var currentSubject;
        var newSubject;
        var currentNode;
        var nextNode;

        var graph = Ext.create('Playground.model.helpers.Graph');
        graph._constructor();

        var adjMatrix = Ext.create('Playground.model.helpers.AdjacencyMatrix');

        /**
         * Adds vertices to the graph
         */
        for(i = 0; i < arraySubjects.length; i++){
            currentSubject = arraySubjects[i];

            for(j = 0; j < currentSubject.get('schedules').length; j++){
                newSubject = me.separateSubjects(currentSubject, j);
                newSubject.level = i;
                subjectSeparated.push(newSubject);
                graph.addVertex(subjectSeparated.length - 1);
            }
        }

        adjMatrix._constructor(subjectSeparated.length);

        /**
         * Adds edges to the graph
         */
        for(i = 0; i < subjectSeparated.length - 1; i++){
            currentNode = subjectSeparated[i];
            j = 1;
            while(i + j < subjectSeparated.length){
                nextNode = subjectSeparated[i + j];

                if(currentNode.data.id !== nextNode.data.id
                    && (! currentNode.get('schedules').conflict
                    || currentNode.get('schedules').conflict !== nextNode.get('schedules').conflict)
                    && currentNode.level === nextNode.level - 1){

                    graph.addEdge(i, i + j);
                    adjMatrix.addEdge(i, i + j);
                }
                j++;
            }
        }
        graph.print();
        adjMatrix.print();

        var startSubjects = me.getByLevel(0, subjectSeparated);
        var endSubjects = me.getByLevel(subjectSeparated[subjectSeparated.length - 1].level, subjectSeparated);

        var paths = [];
        for(i = 0; i < startSubjects.length; i++){
            for(j = 0; j < endSubjects.length; j++){
                paths.push(graph.pathFromTo(startSubjects[i], endSubjects[j]));
            }
        }
        return paths;
    },

    separateSubjects: function(subject, index){
        var schedule = subject.get('schedules')[index];
        return Ext.create('Playground.model.Subject', {
            id: subject.data.id,
            name: subject.data.name,
            description: subject.data.description,
            credits: subject.data.credits,
            classroom_id: subject.data.classroom_id,
            career_id: subject.data.career_id,

            schedules: schedule
        });
    },

    getByLevel: function(level, arraySubjects){
        var byLevel = [];

        for(var i = 0; i < arraySubjects.length; i++){
            if(arraySubjects[i].level === level){
                byLevel.push(i)
            }
        }
        return byLevel;
    }
});