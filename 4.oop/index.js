/*
* From JSON Object to Array of objects
*/

/*
*  Corrections:
*       - No anonymous functions
*       - Adding instances of objects instead of JSON objects
*       - Function to add relations between classes
*/

var studentsObject = [];
var classroomsObject = [];
var subjectsObject = [];

students.forEach(function studentArray(student){
    if(student.min_gpa){
        studentsObject.push(new ScholarshipStudent(student.ci, student.name, student.last_name, student.gender, student.last_payment, student.subjects, student.discount, student.min_gpa));
    }
    else{
        studentsObject.push(new RegularStudent(student.ci, student.name, student.last_name, student.gender, student.last_payment, student.subjects, student.subject_allowed, student.next_payment));
    }
});

classrooms.forEach(function classroomArray(classroom){
    classroomsObject.push(new Classroom(classroom.id, classroom.capacity, classroom.facilities, classroom.subjects));
});

subjects.forEach(function subjectArray(subject){
    subjectsObject.push(new Subject(subject.id, subject.name, subject.description, subject.credits, subject.students, subject.classrooms));
});

function addRelationsBetweenObjects(arrayOfObjects1, arrayOfObjects2, quantity, addFunction1, addFunction2){
    for(var i = 0; i < arrayOfObjects1.length; i++){
        var actualObject = arrayOfObjects1[i];
        for(var j = 0; j < quantity; j++){
            var randomIndex = Math.floor((Math.random() * arrayOfObjects2.length - 1) + 1);
            addFunction1.call(actualObject, arrayOfObjects2[randomIndex]);
            addFunction2.call(arrayOfObjects2[randomIndex], actualObject);
        }
    }
}

function addRelationsBetweenObjectsVersion2(arrayOfObjects1, arrayOfObjects2, quantity){
    console.log(arrayOfObjects2[0].constructor.name);

    // var actions = {
    //     add: "add" + action
    // }
    // for(var i = 0; i < arrayOfObjects1.length; i++){
    //     var actualObject = arrayOfObjects1[i];
    //     for(var j = 0; j < quantity; j++){
    //         var randomIndex = Math.floor((Math.random() * arrayOfObjects2.length - 1) + 1);
    //         (actualObject[actions[action]], arrayOfObjects2[randomIndex]);
    //         addFunction2.call(arrayOfObjects2[randomIndex], actualObject);
    //     }
    // }
}
addRelationsBetweenObjects(studentsObject, subjectsObject, 4, studentsObject[0].addSubject, subjectsObject[0].addStudent);
addRelationsBetweenObjects(subjectsObject, classroomsObject, 1, subjectsObject[0].addClassroom, classroomsObject[0].addSubject);

addRelationsBetweenObjectsVersion2(studentsObject, subjectsObject, 5);
/*
*   DOM operations
*/

var table = document.getElementById("data");
var tableHeader = document.getElementById("tableH");
var tableBody = document.getElementById("tableB");

function restartTable(node){
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

function createTableHeader(object){
    var newHeader = document.createElement("tr");
    newHeader.className = "stripe-dark";
    for(var attr in object){
        if(object.hasOwnProperty(attr)){
            var newCell = document.createElement("th");
            newCell.className = "fw6 tl pa3 bg-white";
            var text = document.createTextNode(attr);
            newCell.appendChild(text);
            newHeader.appendChild(newCell);
        }
    }
    tableHeader.appendChild(newHeader);
}

function createTableRow(object, objectProperty){
    var newRow = document.createElement("tr");
    newRow.className = "stripe-dark";
    for(var attr in object){
        var text;
        if(object.hasOwnProperty(attr)){
            var newCell = document.createElement("td");
            newCell.className = "pa3";
            console.log("here!", typeof object[attr][0]);
            if(Array.isArray(object[attr]) && typeof object[attr][0] == "object"){
                var whatever = object[attr];
                var str = "";
                for(var i = 0; i < whatever.length; i++){
                    str += whatever[i][objectProperty] + " ";
                }
                text = document.createTextNode(str);
            }
            else{
                text = document.createTextNode(object[attr]);
            }
            newCell.appendChild(text);
            newRow.appendChild(newCell);
        }
    }
    tableBody.appendChild(newRow);
}

var regStudents = [];
regStudents = studentsObject.filter(function(student){
    return (student.subject_allowed != undefined);
});

var schStudents = [];
schStudents = studentsObject.filter(function(student){
    return (student.min_gpa != undefined);
});

var btns = document.querySelectorAll("a.btn");
var pressed;

for(var x = 0; x < btns.length; x++){
    (function(x1){
        btns[x1].onclick = function(e){
            pressed = x1;
            restartTable(tableHeader);
            restartTable(tableBody);

            switch (pressed) {
                case 0:
                    createTableHeader(regStudents[0]);
                    regStudents.forEach(function(student){
                        createTableRow(student, "name");
                    });
                    break;
                case 1:
                    createTableHeader(schStudents[0]);
                    schStudents.forEach(function(student){
                        createTableRow(student, "name");
                    });
                    break;
                case 2:
                    createTableHeader(subjects[0]);
                    subjects.forEach(function(subject){
                        createTableRow(subject, "name");
                    });
                    break;
                case 3:
                    createTableHeader(classrooms[0]);
                    classrooms.forEach(function(classroom){
                        console.log("HERE NOW!", classroom);
                        createTableRow(classroom, "name");
                    });
                    break;
                default:
                    break;s

            }
        }
    })(x);
}
