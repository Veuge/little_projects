Ext.define('playground.view.students.SubjectPartialForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl-subject-partial-form',
    itemId: 'pnlStudentPartialForm',

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
                multiSelect: true
            }
        ]
    }
})
