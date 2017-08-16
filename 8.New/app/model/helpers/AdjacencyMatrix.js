Ext.define('Playground.model.helpers.AdjacencyMatrix', {

    dimension: 0,
    matrix: [],

    _constructor: function(dim){
        this.dimension = dim;
        this.matrix = new Array(dim);

        for(var i = 0; i < this.dimension; i++){
            this.matrix[i] = new Array(this.dimension);
            for(var j = 0; j < this.dimension; j++){
                this.matrix[i][j] = 0;
            }
        }
    },

    addEdge: function (fromNode, toNode) {
        this.matrix[fromNode][toNode] = 1;
    },


    print: function () {
        var strRow = "";
        for(var i = 0; i < this.dimension; i++){
            var row = this.matrix[i];

            for(var j = 0; j < this.dimension; j++){
                strRow += row[j] + ' ';
            }
            strRow += '\n';
        }
        console.log(strRow);
    },

    getPath: function(startNode, num){
        var pathArray = new Array(num);
        var numOfRows = 1;
        for(var i = 0; i < num; i++){
            pathArray[i] = new Array(numOfRows);
        }


    }
});