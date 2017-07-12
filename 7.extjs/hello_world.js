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
});
