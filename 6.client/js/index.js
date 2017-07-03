console.log("here we are");

function makeRequest(method, baseURL, path){
    var url = baseURL + path;
    var requestObject = new ClientRequest(method, url);

    return JSON.parse(requestObject.sendRequest(null));
}

/*
* Functions triggered on click
*/

function requestRegulars(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Regular students";

    var regularStudents = makeRequest("GET", baseURL, "regulars");
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

    var scholarshipStudents = makeRequest("GET", baseURL, "scholarships");
    var aSchStudent = new ScholarshipStudent();
    var scholarshipStudentsArray = aSchStudent.jsonArrayToScholarshipArray(scholarshipStudents);

    createDataTable(scholarshipStudentsArray);
    // console.log(scholarshipStudents);
    // var scholarStudent = makeGetRequest(baseURL, "scholarships/1");
    // aSchStudent.jsonToScholarshipStudent(aSchStudent, scholarStudent.data);
    // console.log(aSchStudent);
}

function requestSubjects(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Subjects";

    var subjects = makeRequest("GET", baseURL, "subjects");
    var aSubject = new Subject();
    var subjectsArray= aSubject.jsonArrayToSubjectArray(subjects);

    createDataTable(subjectsArray);
    // console.log(subjects);
    // var subject = makeGetRequest(baseURL, "subjects/1");
    // aSubject.jsonToSubject(aSubject, subject.data);
    // console.log(aSubject);
}

function requestClassrooms(baseURL){
    var title = document.getElementById("section-title");
    title.innerHTML = "Classrooms";

    var classrooms = makeRequest("GET", baseURL, "classrooms");
    var aClassroom = new Classroom();
    var classroomsArray= aClassroom.jsonArrayToClassroomArray(classrooms);

    createDataTable(classroomsArray);
    // console.log(classrooms);
    // var classroom = makeGetRequest(baseURL, "classrooms/1");
    // aClassroom.jsonToClassroom(aClassroom, classroom.data);
    // console.log(aClassroom);
}

function determinePath(classes){
    var type;
    var id = classes[1];

    switch (classes[0]) {
        case "RegularStudent":
            type = "regulars";
            break;
        case "ScholarshipStudent":
            type = "scholarships";
            break;
        case "Subject":
            type = "subjects";
            break;
        case "Classroom":
            type = "classrooms";
            break;
    }

    return type + "/" + id;
}

function requestElement(classname){
    // console.log(classes[0]);
    var classes = classname.split(" ");
    var path = determinePath(classes);
    var object = makeRequest("GET", baseURL, path);
    console.log(object);
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

var baseURL = "http://127.0.0.1:8585/api/";
window.onload = function doEverything(){

    // DOM References and events
    var showRegulars = document.getElementById("reg_students");
    showRegulars.onclick = function() {
        requestRegulars(baseURL);
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
