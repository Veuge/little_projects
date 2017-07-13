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
});
