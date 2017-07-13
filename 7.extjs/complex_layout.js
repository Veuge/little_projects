Ext.onReady(function(){
    var win;

    var newWindow = function(btn) {
        if (!win) {
            win = Ext.create('Ext.window.Window', {
                animateTarget : btn.el,
                html: 'My first vanilla',
                closeAction: 'hide',
                id: 'myWin',
                height: 200,
                width: 300,
                constrain: true
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
})
