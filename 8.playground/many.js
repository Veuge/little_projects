Ext.onReady(function(){
    // One user has many groups and a group has many users

    Ext.define('playground.model.User', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
        hasMany: [
            { model: 'playground.model.UserGroup', name: 'usersgroups' }
        ]
    });

    var userStore = Ext.create('Ext.data.Store', {
        model: 'playground.model.User',
        data:[
            { id: 1, name: 'Juan' },
            { id: 2, name: 'Paco' },
            { id: 3, name: 'Pedro' }
        ]
    });


    Ext.define('playground.model.Group', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'desc', type: 'string' }
        ],
        hasMany: [
            { model: 'playground.model.UserGroup', name: 'usersgroups' }
        ]
    });

    var groupStore = Ext.create('Ext.data.Store', {
        model: 'playground.model.Group',
        data: [
            { id: 1, desc: 'Group 1' },
            { id: 2, desc: 'Group 2' },
            { id: 3, desc: 'Group 3' }
        ]
    });

    Ext.define('playground.model.UserGroup', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'user_id', type: 'int' },
            { name: 'group_id', type: 'int' },
        ],
        belongsTo: [
            { model: 'playground.model.User', getterName: 'getUser' },
            { model: 'playground.model.Group', getterName: 'getGroup' }
        ]
    });

    var userGroupStore = Ext.create('Ext.data.Store', {
        model: 'playground.model.UserGroup',
        data: [
            { id: 1, user_id: 1, group_id: 1 },
            { id: 2, user_id: 1, group_id: 2 },
            { id: 3, user_id: 1, group_id: 3 },
            { id: 4, user_id: 2, group_id: 2 },
            { id: 5, user_id: 3, group_id: 3 }
        ]
    });

    // Ext.ModelManager.getModel('playground.model.User').load(1, {
    //     success:function(user){
    //         console.log('TESTS');
    //
    //         console.log(user.get('name'));
    //         console.log(user.usersgroups().get('group_id'));
    //     }
    // });
    //
    userStore.load();
});
