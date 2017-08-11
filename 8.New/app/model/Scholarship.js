Ext.define('Playground.model.Scholarship', {
    extend: 'Playground.model.Student',

    fields: [
        { name: 'discount', type: 'int' },
        { name: 'min_gpa', type: 'float' },
    ],

    proxy: {
        type: 'rest',
        url: Playground.Constants.BASE_URL + 'scholarships',
    }
})