Ext.define('playground.view.students.CareerPartialForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl-career-partial-form',
    itemId: 'pnlCareerPartialForm',
    items: [
        {
            xtype: 'form',
            alias: 'widget.frm-career',
            itemId: 'frmCareer',
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
                    //     { boxLabel: 'aaa', name: 'aaa', inputValue: '1' },
                    //     { boxLabel: 'bbb', name: 'bbb', inputValue: '2' },
                    //     { boxLabel: 'ccc', name: 'ccc', inputValue: '3' },
                    //     { boxLabel: 'ddd', name: 'ddd', inputValue: '4' }
                    // ]
                }
            ],
            buttons: [
                { xtpe: 'button', text: 'Next', itemId: 'nextButton' }
            ]
        }
    ]
})
