Ext.define('Playground.view.regulars.RegularsPartialForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl-regulars-partial',
    itemId: 'pnlRegularsPartial',
    items: [
        {
            xtype: 'form',
            alias: 'widget.frm-regulars',
            itemId: 'frmRegulars',
            title: 'Regular Student Information',
            bodyPadding: 15,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combo',
                    store: 'Playground.store.Careers',
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
                            { 'gender': 'Male' }
                        ]
                    },
                    allowBlank: false
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
                {
                    xtype: 'button',
                    text: 'Next',
                    itemId: 'btnNext',
                    disabled: true,
                    formBind: true          // To enable the button when the required fields are filled in
                }
            ]
        }
    ]
});
