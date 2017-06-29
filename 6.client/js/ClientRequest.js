function ClientRequest(method, url, asyncbool){
    this.method = method;
    this.url = url;
    this.asyncbool = asyncbool;
}

ClientRequest.prototype.createXHRObject = function(){
    // Polyfill for xhrobject
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

ClientRequest.prototype.sendRequest = function(message){
    var xhr = this.createXHRObject();
    console.log(xhr);
    xhr.open(this.method, this.url, this.asyncbool);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log("request method", xhr.getAllResponseHeaders());
    
    xhr.send(message);
    return xhr.response;
}
