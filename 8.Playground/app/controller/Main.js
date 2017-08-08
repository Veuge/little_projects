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

            'grid': {
                itemdblclick: this.onEditClick
            },

            'regularstudentsgrid button#add': {
                // click: me.onAddClick
                click: this.onAddClick
            },

            'regularstudentsform button#cancel': {
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
            'pnl-student-partial-form button#btnNext': {
                click: this.onNextButtonClick
            },
            'pnl-subject-partial-form button#btnSuggest': {
                click: this.onSuggestButtonClick
            }
        });
    },

    // Shows the form :v
    onAddClick: function(button, e, options){
        var win = Ext.create('playground.view.students.FormContainer');
        var formStudent = Ext.create('playground.view.students.StudentPartialForm');
        win.add(formStudent);
    },

    // Shows the form with the instance of the record clicked
    onEditClick: function(row, record, item, index, e, options){
        var win = Ext.create('playground.view.RegularStudentsForm')
        var form = win.down('form');

        win.setTitle('Edit regular student - ' + record.get('name') + ' ' + record.get('last_name'));
        form.loadRecord(record);
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

    onNextButtonClick: function(button, e, options){
        var me = this;
        var win = me.getFormContainer();
        var currentFormPanel = me.getStudentPartialForm();
        var currentForm = currentFormPanel.down('form');
        var nextFormPanel = Ext.create('playground.view.students.SubjectPartialForm');

        var values = currentForm.getValues();

        var newStudent = Ext.create('playground.model.RegularStudent', {
            name: values.name,
            last_name: values.last_name,
            gender: values.gender,
            last_payment: values.last_payment,
            next_payment: values.next_payment,
            subjects_allowed: values.subjects_allowed,
            subjects: values.subjects,
            career_id: values.career_id
        });

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
                console.log(records);
                subjectsSelected = me.getSelectableSubjects(values, records, 'morning');
                // me.generateSchedule(subjectsSelected, "afternoon");
            }
        });
    },

    generateSchedule: function(subjects, preference){
        var me = this;
        var controllerRef = me.getController('Main').self;
        var possible = [];
        var min, max;

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

        // Ext.Array.forEach(subjects, function(subject){
        for(var i = 0; i < subjects.length; i++){
            var subject = subjects[i];
            var schedules = subject.get('schedules');
            if(schedules.start >= min && schedules.start <= max){
                possible.push(subject);
            }
        }
        // });
        // console.log(possible);
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

        for(var i = 0; i < subjectsArray.length; i++){
            var subject = subjectsArray[i];
        // Ext.Array.forEach(subjectsArray, function(subject) {
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
            console.log(selectableSub[0].schedules);
        }
        // });

    },

    selectSchedules: function(){}
});
