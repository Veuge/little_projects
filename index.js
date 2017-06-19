function Student(ci, name, last_name, gender, last_payment){
    this.ci = ci;
    this.name = name;
    this.last_name = last_name;
    this.gender = gender;
    this.last_payment = last_payment;
}

function RegularStudent(ci, name, last_name, gender, last_payment, subject_allowed, next_payment){
    Student.call(ci, name, last_name, gender, last_payment);

    this.subject_allowed = subject_allowed;
    this.next_payment = next_payment;
}
RegularStudent.prototype = Object.create(Student.prototype);
RegularStudent.prototype.constructor = Student;

function ScholarshipStudent(ci, name, last_name, gender, last_payment, discount, min_gpa){
    Student.call(ci, name, last_name, gender, last_payment);

    this.discount = discount;
    this.min_gpa = min_gpa;
}
ScholarshipStudent.prototype = Object.create(Student.prototype);
ScholarshipStudent.prototype.constructor = Student;


function Classroon(id, capacity, facilities){
    this.id = id;
    this.capacity = capacity;
    this.facilities = facilities;
}

function Subject(id, name, description, credits){
    this.id = id;
    this.name = name;
    this.description = description;
    this.credits = credits;
}

function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

var studentsJSONArray = JSON.parse(students);
var studentsObject = [];
forEach(studentsJSONArray, function(student){
    if(student.min_gpa){
        studentsObject.push(new ScholarshipStudent(student.ci, student.name, student.last_name, student.gender, student.last_payment, student.discount, student.min_gpa));
    }
    else{
        studentsObject.push(new RegularStudent(student.ci, student.name, student.last_name, student.gender, student.last_payment, student.subject_allowed, student.next_payment));
    }
});
console.log(studentsObject);

var classroomsJSONArray = JSON.parse(classrooms);
var classroomsObject = [];
forEach(classroomsJSONArray, function(classroom){
    classroomsObject.push(new Classroon(classroom.id, classroom.capacity, classroom.facilities));
});
console.log(classroomsObject);

var subjectsJSONArray = JSON.parse(subjects);
var subjectsObject = [];
forEach(subjectsJSONArray, function(subject){
    subjectsObject.push(new Subject(subject.id, subject.name, subject.description, subject.credits));
});
console.log(subjectsObject);
