Ext.define('Playground.model.Student', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'last_payment', type: 'date' },
        { name: 'career_id', type: 'int' },
        // { name: 'subjects', type: 'auto' }
    ],

    validations: [
        { type: 'presence', field: 'name' },
        { type: 'length', field: 'name', min: 4},
        { type: 'presence', field: 'last_name' },
        { type: 'length', field: 'last_name', min: 4 },
        { type: 'presence', field: 'gender' },
        { type: 'inclusion', field: 'gender', list: ['Male', 'Female'] }
    ],

    // proxy: {
    //     reader: {
    //         type: 'json',
    //         root: 'data',
    //         totalProperty: 'paginator.total'
    //     },

    //     writer: {
    //         writeRecordId: false,
    //         dateFormat: 'Y-m-d'
    //     }
    // }

    getCompleteName: function(){
        var me = this;
        
        return me.get('name') + ' ' + me.get('last_name');
    },

    deleteId: function (){
        var me = this;
        delete me.data.id;
    }
});