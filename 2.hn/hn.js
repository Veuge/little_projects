
function createXHRObject(){
    if(XMLHttpRequest != undefined){
        return new XMLHttpRequest();
    }
    else if(typeof AcitveXObject != undefined){
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
        for (var i = 0; i < versions.length; i++) {
            try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
            } catch (e) {
                return e;
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }
    else {
        throw new Error("No XHR object available");
    }
}

function infiniteScroll(event){
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
}

function loadData(initPos, quantity, JSONObject){
    for (var i = initPos; i < initPos + quantity && initPos + quantity < JSONObject.results.length; i++) {
        var nodeLi = document.createElement("li");
        var nodeP = document.createElement("p");
        nodeP.className = "libname"
        var nodeA = document.createElement("a");
        var textName = document.createTextNode(JSONObject.results[i].name);
        var textLatest = document.createTextNode(JSONObject.results[i].latest);
        nodeA.setAttribute("href", JSONObject.results[i].latest)
        nodeP.appendChild(textName);
        nodeA.appendChild(textLatest);
        nodeLi.appendChild(nodeP);
        nodeLi.appendChild(nodeA);
        list.appendChild(nodeLi);
    }
}

var list = document.getElementById("items");
window.onload = (function(){
    var position = 0,
        quantity = 20,
        button = document.getElementById("more"),
        url = "https://api.cdnjs.com/libraries?search=angular";

    var xhr = createXHRObject();
    xhr.open("GET", url, false); // opens an synchronous get request to the CDNJS API
    console.log(xhr.status);
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0) {
        xhr.send(null);
        var JSONObject = JSON.parse(xhr.response);
        loadData(position, quantity, JSONObject);
        position += quantity;

        window.onscroll = infiniteScroll();
    }
    else {
        alert("Error, couldn't retrieve data");
    }
});
