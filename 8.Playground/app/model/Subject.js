Ext.define('playground.model.Subject', {
    extend: 'Ext.data.Model',

    require: [
        'playground.model.RegularSubject'
    ],

    fields: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'credits', type: 'int' },
        { name: 'classroom_id', type: 'int' }
    ],

    proxy: {
        type: 'rest',
        // url : 'http://192.168.1.159:8000/api/subjects',
        url : 'http://10.100.1.85:8000/api/subjects',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'paginator.total'
        },
        writer: {
            writeRecordId: false
        }
    },

    belongsTo: [
        { model: 'playground.model.Classroom', getterName: 'getClassroom' }
    ],

    hasMany: [
        {
            model: 'playground.model.RegularSubject',
            foreignKey: 'regular_id',
            associationKey: 'regulars',
            name: 'regulars'
        }
    ],

    getStudents: function(){
        var completeURL = "http://10.100.1.85:8000/api/subjects/" + this.id + "/students";

        Ext.Ajax.request({
            url: completeURL,
            success: function(response){
                console.log(response.responseText);
            }
        });
    }
});
