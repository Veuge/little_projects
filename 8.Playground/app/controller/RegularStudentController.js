Ext.define('playground.controller.RegularStudentController', {
    extend: 'Ext.app.Controller',

    statics: {
        REGULARS_ACTION: 'callRegulars'
    },

    models: [
        'playground.model.RegularStudent'
    ],

    stores: [
        'playground.store.RegularStudents'
    ],

    views: [
        'playground.view.RegularStudentsGrid',
        'playground.view.RegularStudentsForm',
        'playground.view.MenuTree',

        'playground.view.students.FormContainer',
        'playground.view.students.StudentPartialForm',
        'playground.view.students.SubjectPartialForm',
    ],

    refs: [
        {ref: 'regularsGrid', selector: 'grd-regulars'},
        {ref: 'regularsForm', selector: 'win-regulars-form'},
        {ref: 'addBtn', selector: '#add'},
        {ref: 'formContainer', selector: 'form-container'},
        {ref: 'studentPartialForm', selector: 'pnl-student-partial-form'},
        {ref: 'subjectPartialForm', selector: 'pnl-subject-partial-form'},
        {ref: 'btnNext', selector: 'btnNext'}
    ],

    init: function(application){
        var me = this;

        this.control({
            'menutree': {
                dummyevent: me.callRegulars
            },

            'win-regulars-form #save': {
                click: me.onSaveClick
            },

            'regularstudentsgrid #delete': {
                click: me.onDeleteClick
            },

            'grd-regulars': {
                itemdblclick: me.onEditClick
            },

            'grd-regulars button#add': {
                click: me.onAddClick
            },

            'pnl-student-partial-form button#btnNext': {
                click: this.onNextClick
            },
        });
    },

    /**
     * Populates grid with regular students from grid
     * @param  {MenuTreeChildren} record
     */
    callRegulars: function(record){
        var me = this;
        var controllerRef = me.getController('RegularStudentController').self;

        if(record.getId() === controllerRef.REGULARS_ACTION){
            var grid;
            var welcome = Ext.ComponentQuery.query('#welcome')[0];
            welcome.hide();

            var cont = Ext.ComponentQuery.query('#gridscontainer')[0];
            var items = {
                items: [
                    { xtype: 'grd-regulars' }
                ]
            };
            cont.removeAll(true);
            cont.add(items);

            grid = me.getRegularsGrid();
            grid.getStore().load();
            grid.show();
        }
    },

    /**
     * Saves the edition of a regular student information
     * @param  {ButtonView} button
     * @param  {Event} click
     */
    onSaveClick: function(button, click, options){
        var me = this;

        var grid = me.getRegularsGrid();
        var win = me.getRegularsForm();
        var form = win.down('form');
        var store = grid.getStore();
        var record = form.getRecord();

        console.log("edit");
        form.updateRecord();
        record = form.getRecord();

        record.save({
            success: function(record, operation){
                console.log('Success');
            },

            failure: function(record, operation){
                console.log('Failed');
            }
        });

        if(!record.getId()){
            record.setId(store.getTotalCount() + 1);
        }

        store.sync();
        win.close();
    },

    /**
     * Deletes a regular student
     * @param  {ButtonView} button
     * @param  {Event} click
     */
    onDeleteClick: function(button, click, options){
        var grid = Ext.ComponentQuery.query('regularstudentsgrid')[0];
        var register = grid.getSelectionModel().getSelection();
        var store = register[0].store;

        Ext.Msg.confirm('Attention', 'Are you sure you want to delete this item?', function(buttonId, text, opt){
            if (buttonId === 'yes') {
                register[0].destroy();
                store.sync();
            }
        });
    },

    /**
     * Shows the edition form for Regular Students
     * @param  {gridview} row
     * @param  {RegularStudent} record
     * @param  {html} item
     * @param  {[type]} index   [description]
     * @param  {Event} e
     */
    onEditClick: function(row, record, item, index, e, options){
        var win = Ext.create('playground.view.RegularStudentsForm')
        var form = win.down('form');

        win.setTitle('Edit regular student - ' + record.getCompleteName());
        form.loadRecord(record);
    },

    /**
     * Shows the create form for RegularStudentsForm
     * @param  {button} button
     * @param  {Event} e
     */
    onAddClick: function(button, e, options){
        var win = Ext.create('playground.view.students.FormContainer');
        var formStudent = Ext.create('playground.view.students.StudentPartialForm');
        win.add(formStudent);
    },

    /**
     * Saves the information of a Regular Student and goes to next formStudent
     * @param  {button} button
     * @param  {Event} e
     */
    onNextClick: function(button, e, options){
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


});
