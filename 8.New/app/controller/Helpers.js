Ext.define('Playground.controller.Helpers', {
    extend: 'Ext.app.Controller',

    /**
     * Returns the list of subjects selected filtered by the preference of schedules as well
     * @param selectedIds       List of subject ids selected
     * @param subjectsArray     Complete list of subjects
     * @param preference        Schedule preference [Morning, Afternoon, Night]
     *
     * @returns {Array}         List of subject selected with schedules according to preference
     */
    getSelectableSubjects: function(selectedIds, subjectsArray, preference){
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

        Ext.Array.forEach(subjectsArray, function(subject) {
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

        });
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
                    && currentSchedules[i].start === nextSchedules[j].start){
                    currentSchedules[i].conflict = conflictId;
                    nextSchedules[j].conflict = conflictId;
                    conflictId++;
                    break;
                }
            }
        }
    },

    /**
     * Returns a subject with only one schedule
     * @param subject   Playground.model.Subject
     * @param index     Schedule index to be part of the subject
     * @returns {Playground.model.Subject}
     */
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

    /**
     * Returns an array with the indexes of the subjects with the same level
     * @param level             Level to be searched
     * @param arraySubjects     List of subjects
     * @returns {Array}
     */
    getByLevel: function(level, arraySubjects){
        var byLevel = [];

        for(var i = 0; i < arraySubjects.length; i++){
            if(arraySubjects[i].level === level){
                byLevel.push(i)
            }
        }
        return byLevel;
    },

    /**
     * Builds the Schedules selector form
     * @param form      Form container
     * @param store     Schedules store
     */
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
                        alias: 'widget.cmb-schedules',
                        itemId: 'cmbSchedules',
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
    },

    /**
     * Returns an index according the day
     * @param day           Day from which get index
     * @returns {number}    Index
     */
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

    /**
     * Adds the distance between subjects in an schedule
     * @param subjects      Array of Subjects
     * @returns {number}    Total distance between Subjects
     */
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

            total += Math.abs(currentDay - nextDay) + 10;
            total += Math.abs(currentHour - nextHour);
        }

        return total;
    },

    /**
     * Orders the array of subjects according their schedule day
     * @param subjects      Array of Subjects
     * @returns {*}         Asc ordered array of Subjects
     */
    order: function (subjects) {
        var me = this;

        var i, j;
        var temp;

        for(i = 0; i < subjects.length; i++) {
            temp = subjects[i];
            j = i - 1;
            while (j >= 0
                && me.dayToIndex(subjects[j].get('schedules').day) > me.dayToIndex(temp.get('schedules').day)) {
                subjects[j + 1] = subjects[j];
                j--;
            }
            subjects[j + 1] = temp;
        }
        return subjects;
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
        subjectsSeparated = helpers.order(subjectsSeparated);

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
            score += Math.abs(selectedQty - path.length) + 100;
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