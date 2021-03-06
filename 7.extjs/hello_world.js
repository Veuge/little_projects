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

    myDiv1.setSize(350,350, {
        duration: 5000,
        easing: 'bounceOut'
    });

    myDiv1.createChild("<h3>Intocable!</h3>");
    myDiv1.createChild({
        tag: "div",
        id: "nestedDiv",
        style: "border: 1px solid black; padding: 10px;",
        children: {
            tag: "p",
            html: "Interesting!",
            style: "color: green;"
        }
    });
    myDiv1.createChild({
        tag: "h4",
        html: "Whatever"
    }, myDiv1.dom.childNodes[1]);

    var div2 = Ext.get('div2');
    var firstChild = div2.down("div:first-child");
    firstChild.remove();

    var lastChild = div2.down(">div:last-child");
    lastChild.remove();

    Ext.get("child4").remove();

    // Ext.getBody().load({
    //     url: "wuuut.html",
    //     scripts: true
    // });

    var myTemplate = Ext.create('Ext.Template', "<p>Hello {0}.</p>");

    myTemplate.append(document.body, ['Marjan']);
    myTemplate.append(document.body, ['Michael']);
    myTemplate.append(document.body, ['Sebastian']);

    var myTemplate2 = Ext.create("Ext.XTemplate", [
        "<div style='background-color: {color}; margin: 20px; padding: 10px;'>",
            '<b> Name :</b> {name}<br />',
            '<b> Age :</b> {age}<br />',
            '<b> DOB :</b> {dob}<br />',
        "</div>"
    ]);

    myTemplate2.compile();

    myTemplate2.append(document.body, {
        name: "John Lennon",
        age: 35,
        dob: "06/06/1945",
        color: "#3498db"
    });
    myTemplate2.append(document.body, {
        name: "Paul McCartney",
        age: 34,
        dob: "18/06/1945",
        color: "#9b59b6"
    });
    myTemplate2.append(document.body, {
        name: "George Harrison",
        age: 35,
        dob: "19/01/1947",
        color: "#1abc9c"
    });
    myTemplate2.append(document.body, {
        name: "Ringo Starr",
        age: 35,
        dob: "15/12/1943",
        color: "#e67e22"
    });

    var arrayOfData = [
        {
            name: "Someone Interesting",
            age: 10,
            dob: "11/11/2011",
            color: "rgba(26, 188, 156, 0.6)",
            cars: ['Jetta', 'Camry', 'S2000']
        },
        {
            name: "Someone Not",
            age: 13,
            dob: "10/10/2010",
            color: "rgba(23, 185, 153, 0.6)",
            cars: ['Civic', 'Accord', 'Camry']
        },
        {
            name: "Someone Rain",
            age: 23,
            dob: "05/05/2005",
            color: "rgba(20, 182, 150, 0.6)",
            cars:   ['Jetta', 'Camry', 'S2000']
        },
        {
            name: "Someone Shining",
            age: 39,
            dob: "01/01/2001",
            color: "rgba(17, 179, 147, 0.6)",
            cars: ['Civic', 'Accord', 'Camry']
        }
    ];

    var myTemplate3 = Ext.create(Ext.XTemplate, [
        '<tpl for=".">',
            '<div style="background-color: {color}; margin: 10px;">',
                '<b> Name :</b> {name}<br />',
                '<b> Age :</b> {age}<br />',
                '<b> DOB :</b> {dob}<br />',
            '</div>',
        '</tpl>'
    ]);

    myTemplate3.compile();
    myTemplate3.append(document.body, arrayOfData);

    var myTemplate4 = Ext.create(Ext.XTemplate, [
        '<tpl for=".">',
            '<div style="background-color: {color}; margin: 10px;">',
                '<b> Name :</b> {name}<br />',
                '<b> Age :</b> {age}<br />',
                '<b> DOB :</b> {dob}<br />',
                '<b> Cars : </b>',
                '<tpl for="cars">',
                    '{.}',
                    '<tpl if="this.isCamry(values)">',
                        '<b> (wuut)</b>',
                    '</tpl>',
                    '{[ (xindex < xcount) ? ", " : "" ]}',
                '</tpl>',
                '<br />',
            '</div>',
        '</tpl>',
        {
            isCamry : function(car) {
                return car === 'Camry';
            }
        }
    ]);

    myTemplate4.compile();
    myTemplate4.append(document.body, arrayOfData);

    var panel1 = {
        xtype: 'panel',
        title: 'Plain panel 1',
        html: 'Panel with xtype specified'
    };

    var panel2 = {
        title: 'Plain pamel 2',
        html: 'Panel <b>without</b> xtype specified'
    };

    // Ext.create('Ext.window.Window', {
    //     width: 200,
    //     height: 150,
    //     title: 'Accordion window',
    //     border: false,
    //     layout: {
    //         type: 'accordion',
    //         animate: true
    //     },
    //     items: [
    //         panel1,
    //         panel2
    //     ]
    // }).show();

    Ext.create('Ext.window.Window', {
        width: 200,
        height: 150,
        title: 'Accordion window',
        border: false,
        layout: {
            type: 'accordion',
            animate: true
        },
        items: [
            {
                xtype: 'panel',
                title: 'Plain panel1',
                html: 'Panel with xtype'
            },
            {
                title: 'Plain panel2',
                html: 'Panel without xtype'
            }
        ]
    }).show();

    var myPanel = Ext.create('Ext.panel.Panel', {
        // renderTo: document.body,
        height: 50,
        width: 150,
        title: 'Panel rendered immediately',
        frame: true
    });

    myPanel.render(Ext.get('appendHere'));

    var panel3 = {
        html: "Imma panel 3",
        id: "panel3",
        frame: true,
        height: 100
    }

    var panel4 = {
        html : '<b>Imma Panel2</b>',
        id: 'panel2',
        frame : true
    };

    var myWin = Ext.create('Ext.window.Window',{
        id: 'myWin',
        height : 400,
        width : 400,
        items : [
            panel3,
            panel4
        ]
    });
    myWin.show();

    var myWin2 = Ext.create('Ext.window.Window', {
        id: 'myWin2',
        height: 100,
        width: 200,
    });
    myWin2.show();

    Ext.getCmp('myWin').add({
        title: "A title",
        id: "addedPanel",
        html: "It's cool here"
    });

    Ext.getCmp('myWin').insert(0, {
        title: "Another title",
        id: "addedPanel2",
        html: "It's not so cool here"
    });

    Ext.getCmp("myWin").remove(Ext.getCmp("addedPanel"));

    var panel = Ext.getCmp("addedPanel2");
    Ext.getCmp("myWin").remove(panel, false);

    Ext.getCmp("myWin2").add(panel);

    // var componentQuery = Ext.componentQuery.query("#master_panel")[0];
    // console.log(componentQuery);

    // Ext.create('Ext.container.Viewport', {
    //     layout: 'border',
    //     items: [
    //         {
    //             height : 75,
    //             region : 'north',
    //             title : 'Does Santa live here?'
    //         },
    //         {
    //             width : 150,
    //             region : 'west',
    //             title : 'The west region rules'
    //         },
    //         {
    //             region : 'center',
    //             title : 'No, this region rules!'
    //         }
    //     ]
    // });


    // BUILDING COMPLEX PANELS
    var myBtnHandler = function(btn) {
        Ext.MessageBox.alert('You Clicked', btn.text);
    };

    var fileBtn = Ext.create('Ext.button.Button', {
        text: 'File',
        handler : myBtnHandler
    });

    var editBtn = Ext.create('Ext.button.Button', {
        text: 'Edit',
        handler : myBtnHandler
    });

    var tbFill = new Ext.toolbar.Fill();

    var myTopToolbar = Ext.create('Ext.toolbar.Toolbar', {
        items : [
            fileBtn,
            tbFill,
            editBtn
        ]
    });

    var myBottomToolbar = [{
            text: 'Save',
            handler : myBtnHandler
        },
        '-',
        {
            text: 'Cancel',
            handler : myBtnHandler
        },
        '->',
        '<b>Items open: 1</b>'
    ];

    var myPanel = Ext.create('Ext.panel.Panel', {
        width: 200,
        height: 150,
        title: 'Ext Panels rock!',
        collapsible : true,
        renderTo: Ext.getBody(),
        tbar: myTopToolbar,
        bbar: myBottomToolbar,
        html: 'My first Toolbar Panel!'
    });

    var myPanel1 = Ext.create('Ext.panel.Panel', {
        width: 200,
        height: 150,
        title: 'Ext Panels rock!',
        collapsible : true,
        renderTo: Ext.getBody(),
        tbar: myTopToolbar,
        bbar: myBottomToolbar,
        html: 'My first Toolbar Panel!',

        buttonAlign : 'left',
        buttons: [{
            text: 'Press me!',
            handler : myBtnHandler
        }],
        tools: [{
            type: 'gear',
            handler : function(evt, toolEl, panel) {
                var toolClassNames = toolEl.className.split(' ');
                var toolClass = toolClassNames[1];
                var toolId = toolClass.split('-')[2];
                Ext.MessageBox.alert('You Clicked', 'Tool ' + toolId);
            }
        },
        {
            type: 'help',
            handler : function() {
                Ext.MessageBox.alert('You Clicked', 'The help tool');
            }
        }]
    });

    var buttons = [
        { text: "btn 1"},
        { text: "btn 2"},
        { text: "btn 3"}
    ];

    var topDockedToolbar = {
        xtype: 'toolbar',
        dock: 'top',
        items: buttons
    };

    var bottomDockedToolbar = {
        xtype: 'toolbar',
        dock: 'bottom',
        items: buttons,
        weight: 5
    };

    var leftDockedToolbar = {
        xtype: 'toolbar',
        vertical: true,
        dock: 'left',
        items: buttons,
        weight: 10
    };

    var rightDockedToolbar = {
        xtype: 'toolbar',
        vertical : true,
        dock: 'right',
        items: buttons,
        weight: 10
    };

    var myPanel2 = Ext.create('Ext.panel.Panel', {
        width: 350,
        height: 250,
        title: 'Ext Panels rock!',
        renderTo: Ext.getBody(),
        html: 'Content body',
        buttons: {
            weight: -1,
            items : buttons
        },
        dockedItems : [
            topDockedToolbar,
            bottomDockedToolbar,
            leftDockedToolbar,
            rightDockedToolbar
        ]
    });
});
