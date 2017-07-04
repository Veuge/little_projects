console.log("here we are");

function makeRequest(method, baseURL, path){
    var url = baseURL + path;
    var requestObject = new ClientRequest(method, url);

    return JSON.parse(requestObject.sendRequest(null));
}

/*
* Functions triggered on click
*/

function getCollection(collectionName, path, template, conversionFunction){
    var main = document.getElementById("main-content");
    var title = document.getElementById("section-title");
    title.innerHTML = collectionName;

    var jsonArray = makeRequest("GET", baseURL, path);
    var objectsArray = conversionFunction(jsonArray);

    createButton(title, "+", "btn info", template, createElement);
    createDataTable(objectsArray);
}

function requestRegular(id){
    var path = "regulars/" + id;
    var regularStudent = makeRequest("GET", baseURL, path);
    var aRegStudent = new RegularStudent();
    aRegStudent.jsonToRegularStudent(regularStudent.data);

    var subjects = makeRequest("GET", baseURL, path + "/subjects");
    var aSubject = new Subject();
    var subjectsArray = aSubject.jsonArrayToSubjectArray(subjects);

    createDetails(aRegStudent, subjectsArray, "name");
}

function requestScholarship(id){
    var path = "scholarships/" + id;
    var scholarStudent = makeRequest("GET", baseURL, path);
    var aSchStudent = new ScholarshipStudent();
    aSchStudent.jsonToScholarshipStudent(scholarStudent.data);

    var subjects = makeRequest("GET", baseURL, path + "/subjects");
    var aSubject = new Subject();
    var subjectsArray = aSubject.jsonArrayToSubjectArray(subjects);

    createDetails(aSchStudent, subjectsArray, "name");
}

function requestSubject(id){
    var path = "subjects/" + id;
    var subject = makeRequest("GET", baseURL, path);
    var aSubject = new Subject();
    aSubject.jsonToSubject(subject.data);

    var students = makeRequest("GET", baseURL, path + "/students");
    var aStudent = new RegularStudent();
    var studentsArray = aStudent.jsonArrayToRegularArray(students);

    createDetails(aSubject, studentsArray, "last_name");
}

function requestClassroom(id){
    var path = "classrooms/" + id;
    var classroom = makeRequest("GET", baseURL, path);
    var aClassrooms = new Classroom();
    aClassrooms.jsonToClassroom(classroom.data);

    createDetails(aClassrooms);
}

function requestElement(object){
    var path = object.constructor.name;
    var id = object.id;

    switch (path) {
        case "RegularStudent":
            requestRegular(id);
            break;
        case "ScholarshipStudent":
            requestScholarship(id);
            break;
        case "Subject":
            requestSubject(id);
            break;
        case "Classroom":
            requestClassroom(id);
            break;
    }
}

function deleteElement(object){
    var path = object.constructor.name;
    var id = object.id;

    switch (path) {
        case "RegularStudent":
            path = "regulars";
            break;
        case "ScholarshipStudent":
            path = "scholarships";
            break;
        case "Subject":
            path = "subjects";
            break;
        case "Classroom":
            path = "classrooms";
            break;
    }
    path += "/" + id;

    if(confirm("Are you sure you want to delete the element?")){
        makeRequest("DELETE", baseURL, path);
        requestRegulars();
    }
}

function editElement(object){
    createForm(object);
}

function createElement(object){
    createForm(object);
}

function postNewElement(object){
    var path = object.constructor.name;
    // var id = object.id;

    switch (path) {
        case "RegularStudent":
            path = "regulars";
            break;
        case "ScholarshipStudent":
            path = "scholarships";
            break;
        case "Subject":
            path = "subjects";
            break;
        case "Classroom":
            path = "classrooms";
            break;
    }

    path += "?";
    for (attr in object) {
        if (object.hasOwnProperty(attr) && attr != "id") {
            path += attr + "=";
            path += object[attr] + "&";
        }
    }
    path = path.substring(0, path.length - 1);

    console.log(path);
    var response = makeRequest("POST", baseURL, path);
    console.log(response);
}

function getUserInput(object){
    var input = document.querySelectorAll(".user-input");
    var i = 0;
    var attr;
    var path = "?";

    while(i < input.length){
        for (attr in object) {
            if (object.hasOwnProperty(attr) && attr !== "id") {
                object[attr] = input[i - 1].value;
            }
            i++;
        }
    }

    var errorsBag = object.validateInput();
    if(errorsBag.length === 0){
        postNewElement(object);
    }
    else{
        // showFormErrors(errorsBag);
        console.log(errorsBag);
    }
}

// var method = "GET";
// var url = "http://10.100.1.85:8585/api/regulars";
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
//
// var method3 = "DELETE";
// var deleteURL = "http://10.100.1.85:8585/api/regulars/18";
// var deleteRequest = new ClientRequest(method3, deleteURL);
// console.log(deleteRequest.sendRequest(null));

// var method4 = "PUT";
// var url = "http://localhost:8000/api/regulars/10";
// var params = "?name=Valentinaaaaa";
// var putURL = url + params;
// var putRequest = new ClientRequest(method4, putURL);
// console.log(putRequest.sendRequest(null));

var baseURL = "http://10.100.1.85:8585/api/";
window.onload = function doEverything(){

    // DOM References and events
    var showRegulars = document.getElementById("reg_students");
    showRegulars.onclick = function() {
        var regStudent = new RegularStudent();
        getCollection("Regular students", "regulars", regStudent, regStudent.jsonArrayToRegularArray);
    };

    var showScholarships = document.getElementById("sch_students");
    showScholarships.onclick = function() {
        var scholarStudent = new ScholarshipStudent();
        getCollection("Scholarship students", "scholarships", scholarStudent, scholarStudent.jsonArrayToScholarshipArray);
    };

    var showSubjects = document.getElementById("subjects");
    showSubjects.onclick = function() {
        var subject = new Subject();
        getCollection("Subjects", "subjects", subject, subject.jsonArrayToSubjectArray);
    };

    var showClassrooms = document.getElementById("classrooms");
    showClassrooms.onclick = function() {
        var classroom = new Classroom();
        getCollection("Classrooms", "classrooms", classroom, classroom.jsonArrayToClassroomArray);
    };
}
