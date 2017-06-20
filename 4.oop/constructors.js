function Student(ci, name, last_name, gender, last_payment, subjects){
    this.ci = ci;
    this.name = name;
    this.last_name = last_name;
    this.gender = gender;
    this.last_payment = last_payment;
    this.subjects = subjects;
}
Student.prototype.setSubjects = function(subjects){
    this.subjects = subjects;
}

Student.prototype.addSubject = function(subject){
    this.subjects.push(subject);
}

Student.prototype.getName = function(){
    return this.name;
}

Student.prototype.getLastName = function(){
    return this.last_name;
}

Student.prototype.getStudentInfo = function(){
    return this.getName() + this.getLastName();
}

function RegularStudent(ci, name, last_name, gender, last_payment, subjects, subject_allowed, next_payment){
    Student.call(this, ci, name, last_name, gender, last_payment, subjects);

    this.subject_allowed = subject_allowed;
    this.next_payment = next_payment;
}
RegularStudent.prototype = Object.create(Student.prototype);
RegularStudent.prototype.constructor = RegularStudent;

function ScholarshipStudent(ci, name, last_name, gender, last_payment, subjects, discount, min_gpa){
    Student.call(this, ci, name, last_name, gender, last_payment, subjects);

    this.discount = discount;
    this.min_gpa = min_gpa;
}
ScholarshipStudent.prototype = Object.create(Student.prototype);
ScholarshipStudent.prototype.constructor = ScholarshipStudent;


function Classroom(id, capacity, facilities, subjects){
    this.id = id;
    this.capacity = capacity;
    this.facilities = facilities;
    this.subjects = subjects
}
Classroom.prototype.addSubject = function (subject) {
    this.subjects.push(subject);
};

function Subject(id, name, description, credits, students, classroom){
    this.id = id;
    this.name = name;
    this.description = description;
    this.credits = credits;
    this.students = students;
    this.classrooms = classrooms;
}

Subject.prototype.setStudents = function(students){
    this.students = students
}

Subject.prototype.addStudent = function(student){
    this.students.push(student);
}

Subject.prototype.addClassroom = function(classrooms){
    this.classrooms.push = classrooms
}
