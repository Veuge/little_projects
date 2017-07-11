var tpl = Ext.create('Ext.Template', [
    'Hello {firstName} {lastName}!',
    ' Nice to meet you!'
]);

var formPanel = Ext.create('Ext.form.Panel', {
    itemId: 'formPanel',
    frame: true,
    layout: 'anchor',
    defaultType : 'textfield',
    defaults: {
        anchor: '-10',
        labelWidth : 65
    },
    items: [
        {
            fieldLabel : 'First name',
            name: 'firstName'
        },
        {
            fieldLabel : 'Last name',
            name: 'lastName'
        }
    ],
    buttons : [
        {
            text: 'Submit',
            handler: function() {
                var formPanel = this.up('#formPanel'),
                    vals = formPanel.getValues(),
                    greeting = tpl.apply(vals);

                Ext.Msg.alert('Hello!', greeting);
            }
        }
    ]
});

Ext.onReady(function() {
    Ext.create('Ext.window.Window', {
        height: 150,
        width: 500,
        closable : false,
        title: 'Input needed.',
        border: false,
        layout: 'fit',
        items: formPanel
    }).show();

    var myDiv1 = Ext.get('div1');
    myDiv1.setHeight(200);
});
