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
        url : playground.Constants.BASE_URL + 'subjects',
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
        var completeURL = playground.Constants.BASE_URL + "subjects/" + this.id + "/students";

        Ext.Ajax.request({
            url: completeURL,
            success: function(response){
                console.log(response.responseText);
            }
        });
    }
});
