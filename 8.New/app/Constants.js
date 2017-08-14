Ext.define('Playground.Constants', {
    singleton: true,

    // BASE_URL: 'http://10.100.1.85:8000/api/'
    BASE_URL: 'http://192.168.1.159:8000/api/',

    /**
     * Menutree strings to recognize the grid to show
     */
    REGULARS_ACTION:        'callRegulars',
    SCHOLARSHIPS_ACTION:    'callScholarships',
    SUBJECTS_ACTION:        'callSubjects',
    CLASSROOMS_ACTION:      'callClassrooms',
    CAREERS_ACTION:         'callCareers',

    MORNING_MIN:            7,
    MORNING_MAX:            12,
    MORNING:                'Morning',
    AFTERNOON_MIN:          13,
    AFTERNOON_MAX:          18,
    AFTERNOON:              'Afternoon',
    NIGHT_MIN:              19,
    NIGHT_MAX:              23,
    NIGHT:                  'Night'
});