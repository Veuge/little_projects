Ext.define('playground.controller.Main', {
    extend: 'Ext.app.Controller',

    statics: {
        CAREER_FORM: 'formCareer',
        RSTUDENT_FORM: 'regularStudentInfo',
        SUBJECT_FORM: 'subjectForm',
        MORNING: 'morning',
        MORNING_MIN: 7,
        MORNING_MAX: 12,
        AFTERNOON: 'afternoon',
        AFTERNOON_MIN: 13,
        AFTERNOON_MAX: 18,
        NIGHT: 'night',
        NIGHT_MIN: 19,
        NIGHT_MAX: 23,
    },

    refs: [
        // { ref: 'completeForm', selector: 'regularstudentsform' },
        // { ref: 'formCareer', selector: 'formCareer' },
        // { ref: 'formRStudent', selector: 'regularstudentinfo' },

        // Refactor part
        { ref: 'formContainer', selector: 'form-container'},
        { ref: 'studentPartialForm', selector: 'pnl-student-partial-form'},
        { ref: 'subjectPartialForm', selector: 'pnl-subject-partial-form'},

        { ref: 'btnNext', selector: 'btnNext'}
    ],

    models: [
        'playground.model.RegularStudent',
        'playground.model.ScholarshipStudent',
        'playground.model.Subject',
        'playground.model.Career'
    ],
    stores: [
        'playground.store.RegularStudents',
        'playground.store.ScholarshipStudents',
        'playground.store.Subjects',
        'playground.store.Careers'
    ],

    views: [
        'MenuTree',
        'ColumnPanel',
        'RegularStudentsGrid',
        'RegularStudentsForm',
        'ScholarshipStudentsGrid',
        'ScholarshipStudentsForm',
        'SubjectsGrid',
        'SubjectsForm',
        'ClassroomsGrid',
        'CareersGrid',
        'ClassroomsForm',
        'students.FormContainer',
        'students.SubjectPartialForm',
        'students.StudentPartialForm'
    ],

    init: function(application){
        // var me = this;

        this.control({
            'win-regulars-form button#cancel': {
                click: this.onCancelClick
            },

            'scholarshipstudentsgrid button#add': {
                click: this.onAddScholarshipClick
            },

            'subjectsgrid button#add': {
                click: this.onAddSubjectClick
            },

            'classroomsgrid button#add': {
                click: this.onAddClassroomClick
            },
            // 'pnl-student-partial-form button#btnNext': {
            //     click: this.onNextButtonClick
            // },
            'pnl-subject-partial-form button#btnSuggest': {
                click: this.onSuggestButtonClick
            }
        });
    },

    onCancelClick: function(button, e, options){
        var win = button.up('window');
        var form = win.down('form');
        form.getForm().reset();
        win.close();
    },

    onAddScholarshipClick: function(button, e, options){
        var win = Ext.create('playground.view.ScholarshipStudentsForm');
        var form = win.down('form');
        win.setTitle('Create Scholarship student');
    },

    onAddSubjectClick: function(button, e, options){
        var win = Ext.create('playground.view.SubjectsForm');
        var form = win.down('form');
        win.setTitle('Create Subject');
    },

    onAddClassroomClick: function(button, e, options){
        var win = Ext.create('playground.view.ClassroomsForm');
        var form = win.down('form');
        win.setTitle('Create Classroom');
    },

    /**
     * Obtains the selected subjects with the preferred time to generate schedules
     * @param  {button} button
     * @param  {Event} e
     */
    onSuggestButtonClick: function(button, e, options){
        var me = this;

        var win = me.getFormContainer();
        var currentFormPanel = me.getSubjectPartialForm();
        var subjectsForm = currentFormPanel.down('form');
        var values = subjectsForm.getValues();
        var subjectsStore = Ext.create('playground.store.Subjects');
        var subjectsSelected = [];

        win.remove(currentFormPanel, true);

        subjectsStore.load({
            scope: this,
            callback: function(records, success){
                subjectsSelected = me.getSelectableSubjects(values, records, 'afternoon');
                me.identifyConflicts(subjectsSelected);
                console.log(subjectsSelected);
                // me.suggestSchedules(subjectsSelected);
            }
        });
    },

    getSelectableSubjects: function(selectedIds, subjectsArray, preference){
        var me = this;
        var min, max;
        var selectableSub = [];
        var controllerRef = me.getController('Main').self;

        if(preference === controllerRef.MORNING){
            min = controllerRef.MORNING_MIN;
            max = controllerRef.MORNING_MAX;
        }
        else if (preference === controllerRef.AFTERNOON) {
            min = controllerRef.AFTERNOON_MIN;
            max = controllerRef.AFTERNOON_MAX;
        }
        else if (preference === controllerRef.NIGHT) {
            min = controllerRef.NIGHT_MIN;
            max = controllerRef.NIGHT_MAX;
        }

        // for(var i = 0; i < subjectsArray.length; i++){
        //     var subject = subjectsArray[i];
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
                    subject.schedules = selectableSch;
                    selectableSub.push(subject);
                }
            }
        // }
        });
        return selectableSub;
    },

    identifyConflicts: function(subjectsArray){
        var me = this;
        var j = 1;

        for(var i = 0; i < subjectsArray.length - 1; i++){
            while (i + j < subjectsArray.length) {
                me.compareSchedules(subjectsArray[i].schedules, subjectsArray[i+j].schedules);
                j++;
            }
        }
    },

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

    suggestSchedules: function(arraySubjects){
        var schedules;
        var conflict;
        var selected = [];

        for(var i = 0; i < arraySubjects.length; i++){
            schedules = arraySubjects[i].schedules;
            conflict = arraySubjects[i].schedules.conflict;

            if(conflict || schedules.length > 1){
                console.log("Handle conflict. How? trees? graphs? I don't know!");
                console.log(arraySubjects);

            }
            else {
                selected.push(arraySubjects[i]);
            }
        }
        console.log(selected);
    }
});
