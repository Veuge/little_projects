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

function fromClassnameToPath(classname){
    switch (classname) {
        case "RegularStudent":
            return "regulars/";
            break;
        case "ScholarshipStudent":
            return "scholarships/";
            break;
        case "Subject":
            return "subjects/";
            break;
        case "Classroom":
            return "classrooms/";
            break;
    }
}

function fromPathToClassname(path){
    switch (path) {
        case "regulars/":
            return "RegularStudent";
            break;
        case "scholarships/":
            return "ScholarshipStudent";
            break;
        case "subjects/":
            return "Subject";
            break;
        case "classrooms/":
            return "Classroom";
            break;
    }
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
    var path = fromClassnameToPath(object.constructor.name);
    path += object.id;
    var response;

    // gets all the object's methods.
    var conversionFunction = Object.getOwnPropertyNames(object.constructor.prototype)[2];

    if(confirm("Are you sure you want to delete the element?")){
        response = makeRequest("DELETE", baseURL, path);
        console.log(response);

        // redirect on delete
        createTitle(object.constructor.name, object, createElement);
        createDataTable(getCollection(fromClassnameToPath(object.constructor.name), object[conversionFunction]));
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

    var arrayOfObjects;
    var title;
    var template;

    // DOM References and events
    showRegulars.onclick = function() {
        template = new RegularStudent();
        arrayOfObjects = getCollection("regulars", template.jsonArrayToRegularArray);
        title = "Regular Students";

        createTitle(title, template, createElement);
        createDataTable(arrayOfObjects);
    };

    showScholarships.onclick = function() {
        template = new ScholarshipStudent();
        arrayOfObjects = getCollection("scholarships", template.jsonArrayToScholarshipArray);
        title = "Scholarship Students";

        createTitle(title, template, createElement);
        createDataTable(arrayOfObjects);
    };

    showSubjects.onclick = function() {
        template = new Subject();
        arrayOfObjects = getCollection("subjects", template.jsonArrayToSubjectArray);
        title = "Subjects";

        createTitle(title, template, createElement);
        createDataTable(arrayOfObjects);
    };

    showClassrooms.onclick = function() {
        template = new Classroom();
        arrayOfObjects = getCollection("classrooms", template.jsonArrayToClassroomArray);
        title = "Classrooms"

        createTitle(title, template, createElement);
        createDataTable(arrayOfObjects);
    };
}
