Ext.define('playground.view.RegularStudentsForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.regularstudentsform',
    itemId: 'formWindow',

    height: 400,
    width: 500,
    layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: true,
        activeOnTop: true,
    },
    autoShow: true,
    titleCollapse: true,
    hideCollapse: true,
    items: [
        {
            xtype: 'form',
            alias: 'widget.formCareer',
            itemId: 'formCareer',
            title: 'Career information',
            bodyPadding: 15,
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    xtype: 'radiogroup',
                    itemId: 'radio',
                    fieldLabel: 'Career',
                    name: 'whatever',
                    columns: 1,
                    vertical: true,
                }
            ],
            buttons: [
                { xtpe: 'button', text: 'Next', itemId: 'nextButton' }
            ]
        },
        {
            xtype: 'form',
            alias: 'widget.regularstudentinfo',
            itemId: 'regularStudentInfo',
            title: 'Regular Student',
            bodyPadding: 15,
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Student name',
                },
                {
                    xtype: 'textfield',
                    name: 'last_name',
                    fieldLabel: 'Student last name'
                },
                {
                    xtype: 'combo',
                    name: 'gender',
                    fieldLabel: 'Gender',
                    queryMode: 'local',
                    displayField: 'gender',
                    store: {
                        fields: ['gender'],
                        data: [
                            { 'gender': 'Female' },
                            { 'gender': 'Male' },
                        ]
                    }
                },
                {
                    xtype: 'datefield',
                    name: 'last_payment',
                    fieldLabel: 'Last payment',
                    format: 'Y/m/d',
                    maxValue: new Date()
                },
                {
                    xtype: 'datefield',
                    name: 'next_payment',
                    fieldLabel: 'Next payment',
                    format: 'Y/m/d'
                },
                {
                    xtype: 'numberfield',
                    name: 'subjects_allowed',
                    fieldLabel: 'Subjects allowed'
                }
            ],
            buttons: [
                { xtpe: 'button', text: 'Next', itemId: 'nextButton' }
            ]
        },
        {
            xtype: 'form',
            itemId: 'subjectForm',
            title: 'Subjects',
            bodyPadding: 15,
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Subjects',
                    store: 'playground.store.Subjects',
                    name: 'subjects',
                    displayField: 'name',
                    valueField: 'id',
                    multiSelect: true,
                    // titleCollapse: true,
                    hideCollapse: true
                }
            ]
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save',
            itemId: 'save'
        },
        {
            xtype: 'button',
            text: 'Cancel',
            itemId: 'cancel'
        }
    ],

})
