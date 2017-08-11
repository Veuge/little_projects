Ext.define('Playground.model.Regular', {
   extend: 'Playground.model.Student',

   fields: [
       { name: 'next_payment', type: 'date' },
       { name: 'subjects_allowed', type: 'int' }
   ],

    proxy: {
        type: 'rest',
        url: Playground.Constants.BASE_URL + 'regulars'
    }
});