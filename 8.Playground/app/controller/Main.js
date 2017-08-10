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
                subjectsSelected = me.getSelectableSubjects(values, records, 'morning');
                console.log(subjectsSelected[0].schedules);
                me.generateSchedule(subjectsSelected);
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

    generateSchedule: function(subjects){
        var me = this;
        var selected = [];

        me.removeConflicts(subjects);

        for(var i = 0; i < subjects.length; i ++){
            var optionsQty = subjects[i].schedules.length;
            if(optionsQty === 1){
                selected.push(subjects[i]);
            }
        }
        console.log(selected);
    },

    removeConflicts: function(subjects){
        var currentSubject;
        var currentSchedules;
        var currentDay;
        var currentHour;

        for(var i = 0; i < subjects.length; i++){
            currentSubject = subjects[i];
            currentSchedules = current.schedules();
            for(var j = 0; j < currentSchedules.length; j++){
                currentDay = currentSchedules[i].day;
                currentHour = currentSchedules[i].start;

                if(repeated(currentDay, currentHour, subjects)){

                }
            }
        }
    },

    findConflicts: function(){

    }
});
