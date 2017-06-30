console.log("here we are");

function makeGetRequest(baseURL, path){
    var url = baseURL + path;
    var getRequestObject = new ClientRequest("GET", url);

    return JSON.parse(getRequestObject.sendRequest(null));
}

// var method = "GET";
// var url = "http://localhost:8000/api/regulars";
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

// var method3 = "DELETE";
// var deleteURL = "http://localhost:8000/api/regulars/10";
// var deleteRequest = new ClientRequest(method3, deleteURL);
// console.log(deleteRequest.sendRequest(null));

// var method4 = "PUT";
// var url = "http://localhost:8000/api/regulars/10";
// var params = "?name=Valentinaaaaa";
// var putURL = url + params;
// var putRequest = new ClientRequest(method4, putURL);
// console.log(putRequest.sendRequest(null));

window.onload = function doEverything(){
    var baseURL = "http://localhost:8000/api/";

    var regularStudents = makeGetRequest(baseURL, "regulars");
    var scholarshipStudents = makeGetRequest(baseURL, "scholarships");
    var subjects = makeGetRequest(baseURL, "subjects");
    var classrooms = makeGetRequest(baseURL, "classrooms");

    console.log(regularStudents);
    console.log(scholarshipStudents);
    console.log(subjects);
    console.log(classrooms);
}
