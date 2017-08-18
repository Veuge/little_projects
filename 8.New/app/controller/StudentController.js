Ext.define('Playground.controller.StudentController', {
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
        { ref: 'regularsGrid', selector: '#grdRegulars'},
        { ref: 'formContainer', selector: 'frm-container' },
        { ref: 'subjectPartialForm', selector: 'pnl-subjects-partial' },
        { ref: 'cmbSchedules', selector: '#cmbSchedules' }
    ],

    init: function(application){
        var me = this;

        me.control({
            '#btnSuggest': {
                click: me.suggestSchedulesClick
            },

            '#btnChoose': {
                click: me.chooseScheduleClick
            }
        });
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
                graph = helpers.schedulesGraph(subjectsSelected, subjectsSeparated);
                paths = helpers.findPaths(graph, subjectsSeparated);
                suggestionsStore = helpers.evaluatePaths(paths, subjectsSeparated, values.subjects.length);
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

                        jsonObject = JSON.stringify(jsonObject);

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
    },
});