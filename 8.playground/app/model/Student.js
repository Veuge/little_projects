Ext.define('playground.model.Student', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'last_payment', type: 'date' },
        { name: 'subjects', type: 'auto'}
    ],

    validations: [
        { type: 'presence', field: 'name' },
        { type: 'length', field: 'name', min: 4 },
        { type: 'presence', field: 'last_name' },
        { type: 'length', field: 'last_name', min: 4 },
        { type: 'inclusion', field: 'gender', list: ['Female', 'Male'] }
    ],

    validateDate: function(date){
        var maxDate = new Date();
        if(date > maxDate){
            return false;
        }
        return true;
    },

    getSubject: function(){
        var me = this;
        var resp;
        var subjects = 'http://10.100.1.85:8000/api/regulars/' + me.getId() + '/subjects';
        // var subjects = 'http://192.168.1.159:8000/api/regulars/' + me.getId() + '/subjects';

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
    },

    appendStore: function(){
        var me = this;
        var arrayOfSubjects;
        me.getSubject().then(function(response){
            arrayOfSubjects = response.data;
            me.set('subjects', arrayOfSubjects);
            console.log("Success" + response.responseText);
        }, function(error){
            console.log("Error" + error);
        });
    }
})
