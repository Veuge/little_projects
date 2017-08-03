Ext.define('playground.model.ScholarshipStudent', {
    extend: "playground.model.Student",

    fields: [
        { name: 'discount', type: 'int' },
        { name: 'min_gpa', type: 'float' }
    ],

    proxy: {
        type: 'rest',
        url : playground.Constants.BASE_URL + 'scholarships'
    },

    associations: [
        { type: 'hasMany', model: 'playground.model.Subject' }
    ]
});
