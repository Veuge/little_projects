Ext.onReady(function(){
    var win;

    var newWindow = function(btn) {
        if (!win) {
            win = Ext.create('Ext.window.Window', {
                height: 75,
                width: 200,
                modal: true,
                title: "This is one rigid window",
                html: "I don't move nor resize",
                plain: true,
                border: false,
                resizable: false,
                draggable: false,
                closable: false,
                buttonAlign: 'center',
                buttons: [
                    {
                        text: "I give up",
                        handler: function(){
                            win.close();
                        }
                    }
                ]
                // animateTarget : btn.el,
                // closeAction: 'hide',
                // id: 'myWin',
                // constrain: true
            });
        }
        win.show();
    }


    new Ext.Button({
        renderTo : Ext.getBody(),
        text: 'Open my Window',
        style: 'margin: 100px',
        handler : newWindow
    });

    var myCallback = function(btn, text){
        console.info('You pressed', btn);
        if(text){
            console.info('You entered', text);
        }
    }

    // var msg = "Your document was saved successfully";
    // var title = "Save status: ";
    // Ext.MessageBox.alert(title, msg);
    //
    // msg = "Please enter your email address:"
    // title = "Input required"
    // Ext.MessageBox.prompt(title, msg, myCallback);

    Ext.MessageBox.show({
        title: "Input required",
        msg: "Please tell us a little about yourself",
        width: 300,
        buttons: Ext.Msg.YESNOCANCEL,
        multiline: true,
        fn: myCallback,
        icon: Ext.MessageBox.ERROR
    });

    Ext.MessageBox.wait("Waaaaaait a minute", "Hold on...");

    Ext.MessageBox.show({
       title        : 'Hold on there cowboy!',
       msg          : "We're doing something...",
       progressText : 'Initializing...',
       width        : 300,
       progress     : true,
       closable     : false
    });

    var updateFn = function(num){
    //    return function(){
    //       if(num == 6){
    //          Ext.MessageBox.updateProgress(1, 'All Items saved!');
            //  Ext.Function.defer(Ext.MessageBox.hide, 1500, Ext.MessageBox);
        //   }
        //   else{
            //  var i = num/6;
            //  var pct = Math.round(100 * i);
             Ext.MessageBox.updateProgress(0.16, num + '% completed');
        //   }
    //   };
    };

    for (var i = 1; i < 7; i++){
       setTimeout(updateFn(i), i * 500);
    }

    var simpleTab = {
        title: "Simple tab",
        html: "This is a simple tab"
    };

    var closableTab = {
        title: "Closable tab",
        html: "This is a closable tab",
        closable: true
    }

    var disabledTab = {
        title: "Disabled tab",
        itemId: "disabled",
        html: "Whatever",
        disabled: true,
        closable: true
    }

    var tabPanel = Ext.create("Ext.tab.Panel", {
        activeTab: 0,
        itemId: "myTabPanel",
        items: [
            simpleTab,
            closableTab,
            disabledTab
        ]
    });

    Ext.create('Ext.window.Window', {
        height: 300,
        width: 400,
        layout: 'fit',
        items: tabPanel
    }).show();

    var tbpan = Ext.ComponentQuery.query("#myTabPanel")[0];

    tbpan.add({
        title: "New tab",
        itemId: "newTab",
        html: "I'm an added tab"
    });
    tbpan.setActiveTab("newTab");
    tbpan.down("#disabled").tab.hide();
});
