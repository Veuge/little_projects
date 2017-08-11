Ext.define('playground.controller.GraphController', {
    Graph: function(dimension){
        this.adjMatrix = [dimension][dimension];
    },

    addAdjacence: function(orig, dest){
        this.adjMatrix[orig][dest] = 1;
    },

    removeAdjacence: function(orig, dest){
        this.adjMatrix[orig][dest] = 0;
    },

    
});
