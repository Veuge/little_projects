Ext.define('playground.controller.TreeController', {

    node: function(data){
        this.data = data;
        this.parent = null;
        this.children = [];
    },

    tree: function(data){
        var node = new node(data);
        this.root = node;
    },

    add: function(data, toData, traversal){
        var 
    }
});
