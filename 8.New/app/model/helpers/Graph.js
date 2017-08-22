Ext.define('Playground.model.helpers.Graph', {
    mixins: [
        'Playground.controller.Helpers'
    ],

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

    addVertices: function(array, subjectsSeparated){
        var me = this;

        var app = Playground.getApplication();
        var currentSubject;
        var newSubject;

        for(i = 0; i < array.length; i++){
            currentSubject = array[i];

            for(j = 0; j < currentSubject.get('schedules').length; j++){
                newSubject = me.separateSubjects(currentSubject, j);
                newSubject.level = i;
                subjectsSeparated.push(newSubject);
                this.addVertex(subjectsSeparated.length - 1);
            }
        }
    },

    addEdge: function (vertex1, vertex2) {
        this.edges[vertex1].push(vertex2);
        this.numberOfEdges++;
    },

    addEdges: function(subjectSeparated, adjMatrix){
        var i, j;
        var currentNode;
        var nextNode;

        for(i = 0; i < subjectSeparated.length - 1; i++){
            currentNode = subjectSeparated[i];
            j = 1;
            while(i + j < subjectSeparated.length){
                nextNode = subjectSeparated[i + j];

                if(currentNode.data.id !== nextNode.data.id
                    && (! currentNode.get('schedules').conflict
                        || currentNode.get('schedules').conflict !== nextNode.get('schedules').conflict)
                    && currentNode.level === nextNode.level - 1){

                    this.addEdge(i, i + j);
                    adjMatrix.addEdge(i, i + j);
                }
                j++;
            }
        }
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