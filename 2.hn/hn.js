var list = document.getElementById("items");

function loadData(initPos, quantity, JSONObject){
    for (var i = initPos; i < initPos + quantity && initPos + quantity < JSONObject.results.length; i++) {
        var nodeLi = document.createElement("li");
        var nodeP = document.createElement("p");
        nodeP.className = "libname"
        var nodeA = document.createElement("a");
        var nodeName = document.createTextNode(JSONObject.results[i].name);
        var nodeLatest = document.createTextNode(JSONObject.results[i].latest);
        nodeA.setAttribute("href", JSONObject.results[i].latest)
        nodeP.appendChild(nodeName);
        nodeA.appendChild(nodeLatest);
        nodeLi.appendChild(nodeP);
        nodeLi.appendChild(nodeA);
        list.appendChild(nodeLi);
    }
}

window.onload = (function(){
    var position = 0,
        quantity = 20,
        button = document.getElementById("more");


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.cdnjs.com/libraries?search=angular", false);
    xhr.send();
    console.log("Status: " + xhr.status);
    console.log("Status message: " + xhr.statusText);
    console.log(xhr);
    console.log(typeof xhr.response);
    var JSONObject = JSON.parse(xhr.response);
    console.log(JSONObject);
    console.log(xhr.getAllResponseHeaders());
    loadData(position, quantity, JSONObject);
    position += quantity;

    window.onscroll = function(event){
        var pageHeight = document.documentElement.scrollHeight,
            scrollPos = window.pageYOffset;
            clientHeight = document.documentElement.clientHeight;

        console.log("Page height " + pageHeight);
        console.log("Scroll position " + scrollPos);
        console.log("Client Height " + clientHeight);
        console.log("Difference " + (pageHeight - (clientHeight + scrollPos)));

        if (pageHeight - (clientHeight + scrollPos) < 50) {
            alert("load!");
            loadData(position, quantity, JSONObject);
            position += quantity;
        }
    };
});
