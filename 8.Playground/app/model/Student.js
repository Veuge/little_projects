Ext.define('playground.model.Student', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'last_payment', type: 'date' },
        // { name: 'subjects', type: 'auto'},
        { name: 'career_id', type: 'int' }
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

    getCompleteName: function(){
        var me = this;
        return this.get('name') + ' ' + this.get('last_name');
    }
})
