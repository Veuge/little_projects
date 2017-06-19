function Student(ci, name, last_name, gender, last_payment, subjects){
    this.ci = ci;
    this.name = name;
    this.last_name = last_name;
    this.gender = gender;
    this.last_payment = last_payment;
    this.subjects = subjects;
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

function Subject(id, name, description, credits, students, classroom){
    this.id = id;
    this.name = name;
    this.description = description;
    this.credits = credits;
    this.students = students;
    this.classroom = classroom;
}
