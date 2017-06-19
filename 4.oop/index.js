var studentsJSONArray = students;
var studentsObject = [];

studentsJSONArray.forEach(function(student){
    for(var i = 0; i < 4; i++){
        var subjectIndex = Math.floor((Math.random() * 8)) + 1;
        student.subjects.push(subjects[subjectIndex]);
        subjects[subjectIndex].students.push(student);
    }

    if(student.min_gpa){
        studentsObject.push(new ScholarshipStudent(student.ci, student.name, student.last_name, student.gender, student.last_payment, student.subjects, student.discount, student.min_gpa));
    }
    else{
        studentsObject.push(new RegularStudent(student.ci, student.name, student.last_name, student.gender, student.last_payment, student.subjects, student.subject_allowed, student.next_payment));
    }
});

var classroomsJSONArray = classrooms;
var classroomsObject = [];
classroomsJSONArray.forEach(function(classroom){
    classroomsObject.push(new Classroom(classroom.id, classroom.capacity, classroom.facilities, classroom.subjects));
});

var subjectsJSONArray = subjects;
var subjectsObject = [];
subjectsJSONArray.forEach(function(subject){
    var classroomIndex = Math.floor((Math.random() * 4)) + 1;
    subject.classroom = classrooms[classroomIndex];
    classrooms[classroomIndex].subjects.push(subject);
    subjectsObject.push(new Subject(subject.id, subject.name, subject.description, subject.credits, subject.students, subject.classroom));
});

/*
*
*/

var table = document.getElementById("data");
var tableHeader = document.getElementById("tableH");
var tableBody = document.getElementById("tableB");

function restartTable(node){
    while (node.hasChildNodes) {
        node.removeChild(node.firstChild);
    }
}

function createTableHeader(object){
    var newHeader = document.createElement("tr");
    newHeader.className = "stripe-dark";

    for(var attr in object){
        if(attr !== "constructor"){
            var newCell = document.createElement("th");
            newCell.className = "fw6 tl pa3 bg-white";
            var text = document.createTextNode(attr);
            newCell.appendChild(text);
            newHeader.appendChild(newCell);
        }
    }
    tableHeader.appendChild(newHeader);
}

function createTableRow(object){
    var newRow = document.createElement("tr");
    newRow.className = "stripe-dark";
    for(var attr in object){
        var text;
        if(attr !== "constructor"){
            var newCell = document.createElement("td");
            newCell.className = "pa3";

            if(Array.isArray(object[attr])){
                var str = "";
                for(var i = 0; i < object[attr].length; i++){
                    str += object[attr][i].name + ", ";
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
    table.appendChild(newRow);
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
            console.log(pressed);

            switch (pressed) {
                case 0:
                    createTableHeader(regStudents[0]);
                    regStudents.forEach(function(student){
                        createTableRow(student);
                    });
                    break;
                case 1:
                    createTableHeader(schStudents[0]);
                    schStudents.forEach(function(student){
                        createTableRow(student);
                    });
                    break;
                case 2:
                    createTableHeader(subjects[0]);
                    subjects.forEach(function(student){
                        createTableRow(student);
                    });
                    break;
                case 3:
                    createTableHeader(classrooms[0]);
                    classrooms.forEach(function(student){
                        createTableRow(student);
                    });
                    break;
                default:
                    break;

            }
        }
    })(x);
}

createTableHeader(studentsObject[0]);
studentsObject.forEach(function(student){
    createTableRow(student);
});

// createTableHeader(subjectsObject[0]);
// subjectsObject.forEach(function(subject){
//     createTableRow(subject);
// });

// createTableHeader(classroomsObject[0]);
// classroomsObject.forEach(function(classroom){
//     createTableRow(classroom);
// });
