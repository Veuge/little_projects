Ext.define('playground.view.ScholarshipStudentsForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.scholarshipstudentsform',
    itemId: 'formWindow',

    // height: 250,
    // width: 400,
    layout: 'fit',
    autoShow: true,
    items: [
        {
            xtype: 'form',
            bodyPadding: 15,
            defaults: {
                anchor: '100%',
            },

            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Student name',
                    allowBlank: false,
                    msgTarget: 'title'
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
                    minValue: new Date()
                },
                {
                    xtype: 'numberfield',
                    name: 'discount',
                    fieldLabel: 'Discount',
                    step: 10,
                    minValue: 10,
                    maxValue: 60
                },
                {
                    xtype: 'numberfield',
                    name: 'min_gpa',
                    fieldLabel: 'Min GPA',
                    step: 0.1,
                    minValue: 0.1,
                    maxValue: 9.9
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
            ]
        }
    ]
})
