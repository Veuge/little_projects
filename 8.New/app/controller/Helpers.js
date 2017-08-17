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


});