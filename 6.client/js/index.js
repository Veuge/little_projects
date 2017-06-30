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

    var regularStudents = makeGetRequest(baseURL, "regulars");
    var scholarshipStudents = makeGetRequest(baseURL, "scholarships");
    var subjects = makeGetRequest(baseURL, "subjects");
    var classrooms = makeGetRequest(baseURL, "classrooms");

    console.log(regularStudents);
    console.log(scholarshipStudents);
    console.log(subjects);
    console.log(classrooms);

    var specificStudent = makeGetRequest(baseURL, "regulars/1");
    var aRegStudent = new RegularStudent();
    aRegStudent.jsonToRegularStudent(aRegStudent, specificStudent.data);
    console.log(aRegStudent);
    console.log(aRegStudent.jsonArrayToRegularArray(regularStudents));

    var scholarStudent = makeGetRequest(baseURL, "scholarships/1");
    var aSchStudent = new ScholarshipStudent();
    aSchStudent.jsonToScholarshipStudent(aSchStudent, scholarStudent.data);
    console.log(aSchStudent);
    console.log(aSchStudent.jsonArrayToScholarshipArray(scholarshipStudents));

    var classroom = makeGetRequest(baseURL, "classrooms/1");
    var aClassroom = new Classroom();
    aClassroom.jsonToClassroom(aClassroom, classroom.data);
    console.log(aClassroom);
    console.log(aClassroom.jsonArrayToClassroomArray(classrooms));

    var subject = makeGetRequest(baseURL, "subjects/1");
    var aSubject = new Subject();
    aSubject.jsonToSubject(aSubject, subject.data);
    console.log(aSubject);
    console.log(aSubject.jsonArrayToSubjectArray(subjects));
}
