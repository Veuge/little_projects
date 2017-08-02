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
                    // items: [
                    //     { boxLabel: 'Radio 1', name: 'radio', inputValue: '1' },
                    //     { boxLabel: 'Radio 2', name: 'radio', inputValue: '2', checked: true},
                    //     { boxLabel: 'Radio 3', name: 'radio', inputValue: '3' },
                    //     { boxLabel: 'Radio 4', name: 'radio', inputValue: '4' },
                    //     { boxLabel: 'Radio 5', name: 'radio', inputValue: '5' },
                    //     { boxLabel: 'Radio 6', name: 'radio', inputValue: '6' }
                    // ]
                }
            ]
        },
        {
            xtype: 'form',
            alias: 'widget.regularstudentinfo',
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
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Subjects',
                    store: 'playground.store.Subjects',
                    name: 'subjects',
                    displayField: 'name',
                    valueField: 'id',
                    multiSelect: true
                }
            ],
        },
        {
            xtype: 'form',
            title: 'Subjects',
            bodyPadding: 15,
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'whatever',
                    fieldLabel: 'LOL'
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
