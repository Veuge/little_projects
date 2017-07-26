Ext.define('playground.view.ClassroomsForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.classroomsform',
    itemId: 'formWindow',

    layout: 'fit',
    autoShow: 'true',

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
                    name: 'classroom_name',
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'numberfield',
                    name: 'capacity',
                    fieldLabel: 'Capacity'
                }
            ],

            buttons: [
                {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'saveClassroom'
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
