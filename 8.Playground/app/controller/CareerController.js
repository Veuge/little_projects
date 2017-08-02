Ext.define('playground.controller.CareerController', {
    extend: 'Ext.app.Controller',
    models: [
        'playground.model.Career'
    ],
    stores: [
        'playground.store.Careers'
    ],
    views: [
        'playground.view.CareersGrid',
    ],

    init: function(application){
        this.control({
            'menutree': {
                dummyevent: this.callCareers
            }
        });
    },

    callCareers: function(record){
        if(record.getId() === "callCareers"){
            var grid;
            var welcome = Ext.ComponentQuery.query('#welcome')[0];
            welcome.hide();

            var cont = Ext.ComponentQuery.query('#gridscontainer')[0];
            var items = {
                items: [
                    { xtype: 'careersgrid' }
                ]
            };
            cont.removeAll(true);
            cont.add(items);

            grid = Ext.ComponentQuery.query('careersgrid')[0];
            grid.getStore().load();
            grid.show();
        }
    }
});
