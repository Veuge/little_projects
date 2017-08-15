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

    removeVertex: function (vertex) {
        var index = this.vertices.indexOf(vertex);
        if(~index) {
            this.vertices.splice(index, 1);
        }
        while(this.edges[vertex].length) {
            var adjacentVertex = this.edges[vertex].pop();
            this.removeEdge(adjacentVertex, vertex);
        }
    },

    addEdge: function (vertex1, vertex2) {
        this.edges[vertex1].push(vertex2);
        // this.edges[vertex2].push(vertex1);
        this.numberOfEdges++;
    },

    removeEdge: function (vertex1, vertex2) {
        var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
        var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
        if(~index1) {
            this.edges[vertex1].splice(index1, 1);
            this.numberOfEdges--;
        }
        if(~index2) {
            this.edges[vertex2].splice(index2, 1);
        }
    },

    size: function() {
        return this.vertices.length;
    },

    relations: function() {
        return this.numberOfEdges;
    },

    traverseDFS: function(vertex, fn) {
        if(!~this.vertices.indexOf(vertex)) {
            return console.log('Vertex not found');
        }
        var visited = [];
        this._traverseDFS(vertex, visited, fn);
    },

    _traverseDFS: function(vertex, visited, fn) {
        visited[vertex] = true;
        if(this.edges[vertex] !== undefined) {
            fn(vertex);
        }
        for(var i = 0; i < this.edges[vertex].length; i++) {
            if(!visited[this.edges[vertex][i]]) {
                this._traverseDFS(this.edges[vertex][i], visited, fn);
            }
        }
    },

    traverseBFS: function(vertex, fn) {
        if(!~this.vertices.indexOf(vertex)) {
            return console.log('Vertex not found');
        }
        var queue = [];
        queue.push(vertex);
        var visited = [];
        visited[vertex] = true;

        while(queue.length) {
            vertex = queue.shift();
            fn(vertex);
            for(var i = 0; i < this.edges[vertex].length; i++) {
                if(!visited[this.edges[vertex][i]]) {
                    visited[this.edges[vertex][i]] = true;
                    queue.push(this.edges[vertex][i]);
                }
            }
        }
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
        return path.reverse().join('-');
    },

    print: function() {
        console.log(this.vertices.map(function(vertex) {
            return (vertex + ' -> ' + this.edges[vertex].join(', ')).trim();
        }, this).join(' | '));
    }
});