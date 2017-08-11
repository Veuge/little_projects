Ext.define('Playground.model.Classroom', {
   extend: 'Ext.data.Model',

   fields: [
       { name: 'id', type: 'int' },
       { name: 'classroom_name', type: 'string' },
       { name: 'capacity', type: 'int' },
   ],

    proxy: {
        type: 'rest',
        url: Playground.Constants.BASE_URL + 'classrooms',

        reader: {
            type: 'json',
            root: 'data',
        },

        writer: {
            writeRecordId: false,
        }
    }
});