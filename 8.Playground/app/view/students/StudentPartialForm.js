Ext.define('playground.view.students.StudentPartialForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl-student-partial-form',
    itemId: 'pnlStudentPartialForm',
    items: [
        {
            xtype: 'form',
            alias: 'widget.frm-student',
            itemId: 'frmStudent',
            title: 'Student information',
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
        }
    ]
})
