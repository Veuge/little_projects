console.log("here we are");

function makeRequest(method, baseURL, path){
    var url = baseURL + path;
    var requestObject = new ClientRequest(method, url);

    return JSON.parse(requestObject.sendRequest(null));
}

/*
* Functions triggered on click
*/

function getCollection(path, conversionFunction){
    var jsonArray = makeRequest("GET", baseURL, path);
    var objectsArray = conversionFunction(jsonArray);

    return objectsArray;
}

function requestElement(object){
    var path = object.constructor.name;
    var id = object.id;

    var item = [];
    var relationship = [];
    var child;

    switch (path) {
        case "RegularStudent":
            item = getCollection("regulars/" + id, object.jsonArrayToRegularArray);
            child = new Subject();
            relationship = getCollection("regulars/" + id + "/subjects", child.jsonArrayToSubjectArray);
            createDetails(item, relationship, "name");
            break;
        case "ScholarshipStudent":
            item = getCollection("scholarships/" + id, object.jsonArrayToScholarshipArray);

            child = new Subject();
            relationship = getCollection("scholarships/" + id + "/subjects", child.jsonArrayToSubjectArray);
            createDetails(item, relationship, "name");
            break;
        case "Subject":
            item = getCollection("subjects/" + id, object.jsonArrayToSubjectArray);

            child = new Student();
            relationship = getCollection("subjects/" + id + "/students", child.jsonArrayToStudentArray);
            createDetails(item, relationship, "last_name");
            break;
        case "Classroom":
            item = getCollection("classrooms/" + id, object.jsonArrayToClassroomArray);
            createDetails(item, null, "last_name");
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

var baseURL = "http://10.100.1.85:8585/api/";

window.onload = function doEverything(){
    var showRegulars = document.getElementById("reg_students");
    var showScholarships = document.getElementById("sch_students");
    var showSubjects = document.getElementById("subjects");
    var showClassrooms = document.getElementById("classrooms");

    /*
    *   Empty instances of classes
    */
    var regStudent = new RegularStudent();
    var schStudent = new ScholarshipStudent();
    var subject = new Subject();
    var classroom = new Classroom();

    var arrayRegulars;
    var arrayScholarships;
    var arraySubjects;
    var arrayClassrooms;

    // DOM References and events
    showRegulars.onclick = function() {
        arrayRegulars = getCollection("regulars", regStudent.jsonArrayToRegularArray);

        createTitle("Regular Students", regStudent, createElement);
        createDataTable(arrayRegulars);
    };

    showScholarships.onclick = function() {
        arrayScholarships = getCollection("scholarships", schStudent.jsonArrayToScholarshipArray);

        createTitle("Scholarship Students", schStudent, createElement);
        createDataTable(arrayScholarships);
    };

    showSubjects.onclick = function() {
        arraySubjects = getCollection("subjects", subject.jsonArrayToSubjectArray);

        createTitle("Subjects", subject, createElement);
        createDataTable(arraySubjects);
    };

    showClassrooms.onclick = function() {
        arrayClassrooms = getCollection("classrooms", classroom.jsonArrayToClassroomArray);

        createTitle("Classrooms", classroom, createElement);
        createDataTable(arrayClassrooms);
    };
}
