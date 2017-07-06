function makeRequest(method, path, message){
    var url = baseURL + path;
    var requestObject = new ClientRequest(method, url);

    return JSON.parse(requestObject.sendRequest(message));
}

function getCollection(path, conversionFunction){
    var jsonArray = makeRequest("GET", path, null);
    var objectsArray = conversionFunction(jsonArray);

    return objectsArray;
}

// TODO: this function should only return the selected item with it's relationships (if exist), and then call the
// createDetails function. Apply single responsibility!
function getItem(object){
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

function deleteItem(object){
    var path = fromClassnameToPath(object.constructor.name);
    path += "/" + object.id;
    var response;

    // gets all the object's methods.
    var conversionFunction = Object.getOwnPropertyNames(object.constructor.prototype)[2];

    if(confirm("Are you sure you want to delete the element?")){
        response = makeRequest("DELETE", path, null);
        alert(response);

        redirect(object, conversionFunction);
    }
}

function postItem(object){
    getUserInput(object);
    var errorsBag = object.validateInput();
    var path = fromClassnameToPath(object.constructor.name);
    var response;
    var conversionFunction = Object.getOwnPropertyNames(object.constructor.prototype)[2];

    if(errorsBag.length === 0){
        response = makeRequest("POST", path, JSON.stringify(object));
        alert(response);

        redirect(object, conversionFunction);
    }
    else{
        showFormErrors(errorsBag);
        console.log(errorsBag);
    }
}

function editItem(object){
    getUserInput(object);
    var errorsBag = object.validateInput();
    var path = fromClassnameToPath(object.constructor.name) + "/" + object.id;
    var response;
    var conversionFunction = Object.getOwnPropertyNames(object.constructor.prototype)[2];

    if(errorsBag.length === 0){
        response = makeRequest("PUT", path, JSON.stringify(object));
        alert(response);

        redirect(object, conversionFunction);
    }
    else {
        console.log(errorsBag);
    }
}

function fromClassnameToPath(classname){
    switch (classname) {
        case "RegularStudent":
            return "regulars";
            break;
        case "ScholarshipStudent":
            return "scholarships";
            break;
        case "Subject":
            return "subjects";
            break;
        case "Classroom":
            return "classrooms";
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

function editElement(object){
    createForm(object, "edit");
}

function createElement(object){
    createForm(object, "post");
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
    return object;
}

function redirect(object, conversionFunction){
    createTitle(object.constructor.name, object, createElement);
    createDataTable(getCollection(fromClassnameToPath(object.constructor.name), object[conversionFunction]));
}

function processServerResponse(response){
    if(response.error){

    }
    else if (response.success) {

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

    // console.log(baseURL + "classrooms/6");
    // var x = new Classroom(100, "TES TES TES", 70);
    // delete(x.id);
    // var path = baseURL + "classrooms/6";
    // console.log("path", path);
    // // var cr = new ClientRequest("PUT", path, undefined);
    // var json = JSON.stringify(x);
    // console.log(json);
    // // console.log(json);
    // console.log(makeRequest("PUT", "classrooms/6", json));
    // // console.log(cr.sendRequest(json));
}
