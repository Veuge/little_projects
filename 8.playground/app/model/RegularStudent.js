Ext.define('playground.model.RegularStudent', {
    extend: 'playground.model.Student',

    require: [
        'playground.model.RegularSubject'
    ],

    fields: [
        { name: 'next_payment', type: 'date'},
        { name: 'subjects_allowed', type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url : 'http://192.168.1.159:8000/api/regulars',
        // url : 'http://10.100.1.85:8000/api/regulars',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        },
        writer: {
            writeRecordId: false,
            dateFormat: 'Y-m-d'
        }
    },

    hasMany: [
        {
            model: 'playground.model.RegularSubject',
            foreignKey: 'subject_id',
            associationKey: 'subjects',
            name: 'subjects'
        }
    ],

    getSubject: function(){
        var me = this;
        var resp;
        // var subjects = 'http://10.100.1.85:8000/api/regulars/' + me.getId() + '/subjects';
        var subjects = 'http://192.168.1.159:8000/api/regulars/' + me.getId() + '/subjects';

        return new Promise(function(resolve, reject){
            Ext.Ajax.request({
                url: subjects,
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    resolve(resp);
                },
                failure: function(response) {
                    reject("Could not get student subjects - server response was " + response.status);
                }
            });
        });

        // Ext.Ajax.request({
        //     url: subjects,
        //     success: function(response){
        //         resp = Ext.JSON.decode(response.responseText);
        //         // console.log(resp);
        //     },
        //     failure: function(response){
        //         resp = Ext.JSON.decode(resp);
        //         // console.log(resp);
        //     }
        // });
        // console.log(resp);
    }
});
