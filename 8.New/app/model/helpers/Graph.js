Ext.define('Playground.model.helpers.Graph', {
    vertices: [],
    edges: [],
    numberOfEdges: 0,

    _constructor: function () {
        this.vertices = [];
        this.edges = [];
        this.numberOfEdges = 0;
    },

    addVertex: function(vertex){
        this.vertices.push(vertex);
        this.edges[vertex] = [];
    },

    addEdge: function (vertex1, vertex2) {
        this.edges[vertex1].push(vertex2);
        // this.edges[vertex2].push(vertex1);
        this.numberOfEdges++;
    },

    size: function() {
        return this.vertices.length;
    },

    pathFromTo: function(vertexSource, vertexDestination) {
        if(!~this.vertices.indexOf(vertexSource)) {
            return console.log('Vertex not found');
        }
        var queue = [];
        queue.push(vertexSource);
        var visited = [];
        visited[vertexSource] = true;
        var paths = [];

        while(queue.length) {
            var vertex = queue.shift();
            for(var i = 0; i < this.edges[vertex].length; i++) {
                if(!visited[this.edges[vertex][i]]) {
                    visited[this.edges[vertex][i]] = true;
                    queue.push(this.edges[vertex][i]);
                    // save paths between vertices
                    paths[this.edges[vertex][i]] = vertex;
                }
            }
        }
        if(!visited[vertexDestination]) {
            return undefined;
        }

        var path = [];
        for(var j = vertexDestination; j !== vertexSource; j = paths[j]) {
            path.push(j);
        }
        path.push(j);
        return path.reverse().join('');
    },

    print: function() {
        console.log(this.vertices.map(function(vertex) {
            return (vertex + ' -> ' + this.edges[vertex].join(', ')).trim();
        }, this).join(' | '));
    }
});