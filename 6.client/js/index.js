console.log("here we are");

// var method = "GET";
// var url = "http://10.100.1.85:8000/api/regulars/1";
// var asyncbool = true;
// var getRequest = new ClientRequest(method, url);
//
// console.log(getRequest.sendRequest(null));

// var method2 = "POST";
// var params = "?name=Augusto&last_name=Medinaceli&gender=male&last_payment=2017-05-05&next_payment=2018-05-05&subjects_allowed=6";
// var postURL = url + params;
// console.log(postURL);
//
// var postRequest = new ClientRequest(method2, postURL);
// console.log(postRequest.sendRequest(null));

var method3 = "DELETE";
var deleteURL = "http://10.100.1.85:8000/api/regulars/1";
var deleteRequest = new ClientRequest(method3, deleteURL);
console.log(deleteRequest.sendRequest(null));
