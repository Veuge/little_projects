Ext.onReady(function(){
    // Ext.define('playground.model.Author', {
    //     extend:'Ext.data.Model',
    //     fields:[
    //         'name'
    //     ]
    // });

    // Ext.define('playground.model.Comment', {
    //     extend:'Ext.data.Model',
    //     fields:[
    //         'emailAddress',
    //         'body'
    //     ]
    // });

    // Ext.define('playground.model.BlogPost', {
    //     extend:'Ext.data.Model',
    //     fields:[
    //         'title',
    //         'body'
    //     ],
    //     belongsTo:[
    //         {
    //             name:'author',
    //             instanceName:'author',
    //             model:'playground.model.Author',
    //             getterName:'getAuthor',
    //             setterName:'setAuthor',
    //             associationKey:'author'
    //         }
    //     ],
    //     hasMany:[
    //         {
    //             name:'comments',
    //             model:'playground.model.Comment',
    //             associationKey:'comments'
    //         }
    //     ],
    //     proxy:{
    //         type:'ajax',
    //         url:'DATA/blogpost.json',
    //         reader:{
    //             type:'json',
    //             root:'data'
    //         }
    //     }
    // });

    // Ext.ModelManager.getModel('playground.model.BlogPost').load(1, {
    //     success:function(record, operation){
    //         console.log(record.get('title')); // "some title"
    //         console.log(record.getAuthor().get('name')); // "neil"
    //         console.log(record.comments().getCount()); // 2
    //         console.log(operation);
    //     }
    // });

    var classroom = Ext.create('playground.model.Classroom', {
        id: 6,
        classroom_name: 'Classroom-10',
        capacity: 100
    });

    var subject = Ext.create('playground.model.Subject', {
        name: 'xyz-123',
        description: 'xyz',
        credits: 9,
        classroom_id: 6
    });

    classroom.getSubjects().add(
        subject,
        { name: 'abc-123', description: 'abc', credits: 3, classroom_id: classroom.id },
        { name: 'def-123', description: 'def', credits: 4, classroom_id: this.id },
        { name: 'ghi-123', description: 'ghi', credits: 5, classroom_id: this.id },
        { name: 'jkl-123', description: 'jkl', credits: 6, classroom_id: this.id },
        { name: 'mno-123', description: 'mno', credits: 7, classroom_id: this.id },
    );

    classroom.getSubjects().each(function(subject){
        console.log("ID", subject.get('id'));
        console.log("NAME", subject.get('name'));
        console.log("DESCRIPTION", subject.get('description'));
        console.log("CREDITS", subject.get('credits'));
        console.log("CLASSROOM ID", subject.get('classroom_id'));
    });

    console.log('BELONGS TO');

    subject.getClassroom(function(c){
        console.log("Classroom name", c.get('classroom_name'));
    });
});
