Ext.define('playground.view.SubjectsForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.subjectsform',
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
                    fieldLabel: 'Subject name',
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description'
                },
                {
                    xtype: 'numberfield',
                    name: 'credits',
                    fieldLabel: 'Credits',
                    step: 1,
                    minValue: 1,
                    maxValue: 10
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Classroom',
                    store: 'playground.store.Classrooms',
                    displayField: 'classroom_name',
                    name: 'classroom_id',
                    valueField: 'id'
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
