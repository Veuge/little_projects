Ext.onReady(function(){
    var childPnl1 = {
        frame : true,
        height : 150,
        html: 'My First Child Panel',
        title : 'First children are fun'
    };

    var childPnl2 = {
        width : 200,
        html: 'Second child',
        title : 'Second children have all the fun!'
    };

    var myWin = Ext.create("Ext.Window", {
        height: 300,
        width: 300,
        title: 'A window with a container layout',
        autoScroll : true,
        items: [
            childPnl1,
            childPnl2
        ],
        tbar : [{
            text: 'Add child',
            handler : function() {
                var numItems = myWin.items.getCount() + 1;
                myWin.add({
                    title: 'Child number ' + numItems,
                    height: 60,
                    frame: true,
                    collapsible: true,
                    collapsed: true,
                    html: 'Yay, another child!'
                });
            }
        }]
    });
    myWin.show();

    var myWin = Ext.create("Ext.Window", {
        height     : 300,
        width      : 300,
        layout     : 'anchor',
        autoScroll : false,
        anchorSize : '400',
        items      : [
            {
                title     : 'Panel1',
                anchor    : '-50, -150',
                frame     : true
            },
            {
                title     : 'Panel2',
                anchor    : '-10, -150',
            },
            {
                title     : 'Panel3',
                anchor    : '50%, 25%',
                frame     : true
            }
        ]
    });
    myWin.show();

    var myWin2 = Ext.create("Ext.Window", {
        height: 300,
        width: 300,
        layout: 'absolute',
        autoScroll: true,
        border: false,
        items: [
            {
                title: "Panel A",
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                html: "x: 50, y: 50",
                frame: true
            },
            {
                title: "Panel B",
                x: 100,
                y: 120,
                height: 75,
                width: 100,
                html: "x: 75, y: 120",
                frame: true
            }
        ]
    });
    myWin2.show();

    var myWin3 = Ext.create("Ext.Window", {
        height: 200,
        width: 200,
        layout: "fit",
        border: false,
        items: [
            {
                title: "Only child",
                html: "I fill the window",
                frame: true
            }
        ]
    });
    myWin3.show();

    var accordionWin = Ext.create("Ext.Window", {
        height: 300,
        width: 400,
        layout: "accordion",
        border: true,
        title: "Hey you!",
        layoutConfig: {
            animate: true
        },
        items:[
            {
                xtype: 'form',
                title: 'General info',
                bodyStyle: 'padding: 5px',
                defaultType: 'textfield',
                fieldDefaults: {
                    labelWidth  : 50
                },
                items: [
                    {
                        fieldLabel : 'Name',
                        anchor     : '-10',
                        width: 20
                    },
                    {
                        xtype      : 'field',
                        fieldLabel : 'Age',
                        anchor     :   '-10',
                        size       :  3
                    },
                    {
                        xtype      : 'combo',
                        fieldLabel : 'Location',
                        anchor     : '-10',
                        store      : [ 'Here', 'There', 'Anywhere' ]
                    }
                ]
            },
            {
                xtype  : 'panel',
                autoEl : {},
                title  : 'Bio',
                layout : 'fit',
                items  : {
                    xtype : 'textarea',
                    value  : 'Tell us about yourself'
                }
            },
            {
                title : 'Instructions',
                html  : 'Please enter information.',
                tools : [
                    {id : 'gear'}, {id:'help'}
                ]
            }
        ]
    });

    accordionWin.show();

    var handleNav = function(btn) {
        var activeItem  = cardWin.layout.activeItem,
            index       = cardWin.items.indexOf(activeItem),
            numItems    = cardWin.items.getCount(),
            indicatorEl = Ext.getCmp('indicator').el;
        if (btn.text == 'Forward' && index < numItems - 1) {
            index++;
            cardWin.layout.setActiveItem(index);
            index++;
            indicatorEl.update(index + ' of ' + numItems);
        }
        else if (btn.text == 'Back' && index > 0) {
            cardWin.layout.setActiveItem(index - 1);
            indicatorEl.update(index + ' of ' + numItems);
        }
    };

    var cardWin = Ext.create("Ext.Window", {
        height      : 200,
        width       : 300,
        autoScroll  : true,
        id          : 'cardWin',
        title       : 'A Window with a Card layout',
        layout      : 'card',
        activeItem  : 0,
        defaults    : { border : false },
        items       : [
            {
                xtype: 'form',
                title      : 'General info',
                bodyStyle   : 'padding: 5px',
                defaultType : 'field',
                labelWidth  : 50,
                items       : [
                    {
                        fieldLabel : 'Name',
                        anchor     : '-10'
                    },
                    {
                        xtype      : 'numberfield',
                        fieldLabel : 'Age',
                        size       : 3
                    },
                    {
                        xtype      : 'combo',
                        fieldLabel : 'Location',
                        anchor     : '-10',
                        store      : [ 'Here', 'There', 'Anywhere' ]
                    }
                ]
            },
            {
                xtype  : 'panel',
                title  : 'Bio',
                layout : 'fit',
                items  : {
                    xtype : 'textarea',
                    value : 'Tell us about yourself'
                }
            },
            {
                title : 'Congratulations',
                html  : 'Thank you for filling out our form!'
            }
        ],
        dockedItems : [
            {
                xtype : 'toolbar',
                dock  : 'bottom',
                items : [
                    {
                        text    : 'Back',
                        handler : handleNav
                    },
                    '-',
                    {
                        text    : 'Forward',
                        handler : handleNav
                    },
                    '->',
                    {
                        type   : 'component',
                        id     : 'indicator',
                        style  : 'margin-right: 5px',
                        html   : '1 of 3'
                    }
                ]
            }
        ]
    });
    cardWin.show();

    var columnWin = Ext.create("Ext.Window", {
        height: 200,
        width: 400,
        autoScroll: true,
        id: "columnWin",
        title: "A column layout",
        layout: "column",
        defaults: {
            frame: true
        },
        items: [
            {
                title: "Col 1",
                id: "col1",
                columnWidth: .3,
                html: "lalalalalalala lalala lalala alallaa alallalalala alalalal alalala alallala lalalalalalala lalala lalala alallaa alallalalala alalalal alalala alallala"
            },
            {
                title: "Col 2",
                id: "col2",
                html: "20 % relative width",
                columnWidth: .2
            },
            {
                title: "Col 3",
                id: "col3",
                html: "100px fixed width",
                width: 100
            },
            {
                title: "Col 4",
                id: "col4",
                html: "50% relative width",
                columnWidth: .5
            }
        ]
    });

    columnWin.show();

    // Ext.create("Ext.Window", {
    //     layout: "hbox",
    //     height: 300,
    //     width: 300,
    //     title: "A container with HBox layout",
    //     // autoScroll: true,
    //     layoutConfig: {
    //         // type: "hbox",
    //         pack: "center"
    //     },
    //     defaults: {
    //         frame: true,
    //         width: 75
    //     },
    //     items: [
    //         {
    //             title: "Panel 1",
    //             height: 100
    //         },
    //         {
    //             title: "Panel 2",
    //             height: 75,
    //             width: 100
    //         },
    //         {
    //             title: "Panel 3",
    //             height: 200
    //         }
    //     ]
    // }).show();

    Ext.create("Ext.Window", {
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        height       : 300,
        width        : 300,
        title        : 'A Container with an HBox layout',
        defaults : {
            frame : true,
            width: 50
        },
        items : [
            {
                title  : 'Panel 1',
                height : 100
            },
            {
                title  : 'Panel 2',
                height : 75,
                width  : 100
            },
            {
                title  : 'Panel 3',
                height : 200
            }
        ]
    }).show();
});
