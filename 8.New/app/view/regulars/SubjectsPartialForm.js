Ext.define('Playground.view.regulars.SubjectsPartialForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl-subjects-partial',
    itemId: 'pnlSubjectsPartial',

    items: [
        {
            xtype: 'form',
            itemId: 'frmSubjects',
            title: 'Subjects',
            bodyPadding: 15,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Subjects',
                    store: 'Playground.store.Subjects',
                    name: 'subjects',
                    displayField: 'name',
                    valueField: 'id',
                    multiSelect: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Preference',
                    name: 'preference',
                    queryMode: 'local',
                    displayField: 'preference',
                    store: {
                        fields: ['preference'],
                        data: [
                            { 'preference': 'Morning' },
                            { 'preference': 'Afternoon' },
                            { 'preference': 'Night' }
                        ]
                    },
                    allowBlank: false
                }
            ],
            buttons: [
                { xtype: 'button', text: 'Suggest schedules', itemId: 'btnSuggest' },
                { xtype: 'button', text: 'Choose manually' }
            ]
        }
    ]
});