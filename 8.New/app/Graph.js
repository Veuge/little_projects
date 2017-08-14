function Graph(dimension){
    this.dimension = dimension;
    this.adjMatrix =  [];

    for(var i = 0; i < dimension; i++){
        this,adjMatrix[i] = [];
        for(var j = 0; j < dimension; j++){
            this.adjMatrix[i][j] = 0;
        }
    }
}

Graph.prototype.addAdjacence = function(fromNode, toNode){
    this.adjMatrix[fromNode][toNode] = 1;
};

Graph.prototype.removeAdjacence = function(fromNode, toNode){
    this.adjMatrix[fromNode][toNode] = 0;
};

Graph.prototype.getRoute = function(){
    for(var i = 0; i < this.dimension; i++){
        for(var j = 0; j < this.dimension; j++){
            if(this.adjMatrix[i][j] === 1){

            }
        }
    }
};