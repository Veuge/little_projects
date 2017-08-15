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
                    xtype: 'combo',
                    store: 'playground.store.Careers',
                    fieldLabel: 'Career',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'career_id'
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Student name',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'last_name',
                    fieldLabel: 'Student last name',
                    allowBlank: false
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
                    maxValue: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    name: 'next_payment',
                    fieldLabel: 'Next payment',
                    format: 'Y/m/d',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    name: 'subjects_allowed',
                    fieldLabel: 'Subjects allowed',
                    minValue: 0,
                    maxValue: 8
                }
            ],
            buttons: [
                { xtpe: 'button', text: 'Next', itemId: 'btnNext' }
            ]
        }
    ]
})
