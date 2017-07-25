Ext.onReady(function(){
    Ext.define('playground.model.Author', {
        extend:'Ext.data.Model',
        fields:[
            'name'
        ]
    });

    Ext.define('playground.model.Comment', {
        extend:'Ext.data.Model',
        fields:[
            'emailAddress',
            'body'
        ]
    });

    Ext.define('playground.model.BlogPost', {
        extend:'Ext.data.Model',
        fields:[
            'title',
            'body'
        ],
        belongsTo:[
            {
                name:'author',
                instanceName:'author',
                model:'playground.model.Author',
                getterName:'getAuthor',
                setterName:'setAuthor',
                associationKey:'author'
            }
        ],
        hasMany:[
            {
                name:'comments',
                model:'playground.model.Comment',
                associationKey:'comments'
            }
        ],
        proxy:{
            type:'ajax',
            url:'DATA/blogpost.json',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    Ext.ModelManager.getModel('playground.model.BlogPost').load(1, {
        success:function(record, operation){
            console.log(record.get('title')); // "some title"
            console.log(record.getAuthor().get('name')); // "neil"
            console.log(record.comments().getCount()); // 2
            console.log(operation);
        }
    });
});
