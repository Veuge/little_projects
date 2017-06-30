console.log("here we are");

/*
* These following functions are unnecessary I think!
*/

function makeGetRequest(baseURL, path){
    var url = baseURL + path;
    var getRequestObject = new ClientRequest("GET", url);

    return JSON.parse(getRequestObject.sendRequest(null));
}

function makePostRequest(baseURL, path, params){
    var url = baseURL + path + params;
    var postRequestObject = new ClientRequest("POST", url);

    return JSON.parse(postRequestObject.sendRequest(null));
}

function makePutRequest(baseURL, path, params){
    var url = baseURL + path + params;
    var postRequestObject = new ClientRequest("PUT", url);

    return JSON.parse(postRequestObject.sendRequest(null));
}

function makeDeleteRequest(baseURL, path){
    var url = baseURL + path + params;
    var postRequestObject = new ClientRequest("DELETE", url);

    return JSON.parse(postRequestObject.sendRequest(null));
}

/*
* Functions triggered on click
*/

function requestRegulars(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Regular students";

    var regularStudents = makeGetRequest(baseURL, "regulars");
    var aRegStudent = new RegularStudent();
    var regularStudentsArray = aRegStudent.jsonArrayToRegularArray(regularStudents);

    createDataTable(regularStudentsArray);

    // console.log(regularStudents);
    // var regularStudent = makeGetRequest(baseURL, "regulars/1");
    // aRegStudent.jsonToRegularStudent(aRegStudent, regularStudent.data);
    // console.log(aRegStudent);
}

function requestScholarships(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Scholarship students";

    var scholarshipStudents = makeGetRequest(baseURL, "scholarships");
    var aSchStudent = new ScholarshipStudent();
    var scholarshipStudentsArray = aSchStudent.jsonArrayToScholarshipArray(scholarshipStudents);

    createDataTable(scholarshipStudentsArray);
    addLinkToDetails();

    // console.log(scholarshipStudents);
    // var scholarStudent = makeGetRequest(baseURL, "scholarships/1");
    // aSchStudent.jsonToScholarshipStudent(aSchStudent, scholarStudent.data);
    // console.log(aSchStudent);
}

function requestSubjects(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Subjects";

    var subjects = makeGetRequest(baseURL, "subjects");
    var aSubject = new Subject();
    var subjectsArray= aSubject.jsonArrayToSubjectArray(subjects);

    createDataTable(subjectsArray);
    addLinkToDetails();

    // console.log(subjects);
    // var subject = makeGetRequest(baseURL, "subjects/1");
    // aSubject.jsonToSubject(aSubject, subject.data);
    // console.log(aSubject);
}

function requestClassrooms(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Classrooms";

    var classrooms = makeGetRequest(baseURL, "classrooms");
    var aClassroom = new Classroom();
    var classroomsArray= aClassroom.jsonArrayToClassroomArray(classrooms);

    createDataTable(classroomsArray);
    addLinkToDetails();

    // console.log(classrooms);
    // var classroom = makeGetRequest(baseURL, "classrooms/1");
    // aClassroom.jsonToClassroom(aClassroom, classroom.data);
    // console.log(aClassroom);
}

function addLinkToDetails(baseURL){
    var rows = document.getElementsByClassName("item");
    var x;
    var pressed;

    for(x = 0; x < rows.length; x++){
        (function(x1){
            rows[x1].onclick = function(e){
                pressed = rows[x1];
                showDetails(baseURL, pressed);
            }
        })(x);
    }
}

function showDetails(baseURL, pressed){
    var classes = (pressed.className).split(" ");
    var content = document.getElementById("content");
    var path = determinePressed(classes);
    var object = makeGetRequest(baseURL, path);
    
    restartEmptySettings(content);
    createDetails(content, object);
}

function determinePressed(classes){
    var type;
    var id = classes[2];

    switch (classes[1]) {
        case "regularstudent":
            type = "regulars";
            break;
        case "scholarsipstudent":
            type = "scholarships";
            break;
        case "subject":
            type = "subjects";
            break;
        case "classroom":
            type = "clasrooms";
            break;
    }

    return type + "/" + id;
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
// var deleteURL = "http://10.100.1.85:8000/api/regulars/10";
// var deleteRequest = new ClientRequest(method3, deleteURL);
// console.log(deleteRequest.sendRequest(null));

// var method4 = "PUT";
// var url = "http://localhost:8000/api/regulars/10";
// var params = "?name=Valentinaaaaa";
// var putURL = url + params;
// var putRequest = new ClientRequest(method4, putURL);
// console.log(putRequest.sendRequest(null));

window.onload = function doEverything(){
    var baseURL = "http://10.100.1.85:8000/api/";

    // DOM References and events
    var showRegulars = document.getElementById("reg_students");
    showRegulars.onclick = function() {
        requestRegulars(baseURL);
        addLinkToDetails(baseURL);
    };

    var showScholarships = document.getElementById("sch_students");
    showScholarships.onclick = function() {
        requestScholarships(baseURL)
    };

    var showSubjects = document.getElementById("subjects");
    showSubjects.onclick = function() {
        requestSubjects(baseURL)
    };

    var showClassrooms = document.getElementById("classrooms");
    showClassrooms.onclick = function() {
        requestClassrooms(baseURL)
    };


}
