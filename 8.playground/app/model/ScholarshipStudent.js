Ext.define('playground.model.ScholarshipStudent', {
    extend: "playground.model.Student"

    fields: [
        { name: 'discount', type: 'int' },
        { name: 'min_gpa', type: 'float' }
    ],
    proxy: {
        type: 'rest',
        url : 'http://10.100.1.85:8000/api/scholarships'
    }
});
