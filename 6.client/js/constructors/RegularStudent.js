function RegularStudent(id, name, last_name, gender, last_payment, subject_allowed, next_payment){
    Student.call(this, id, name, last_name, gender, last_payment);

    this.subject_allowed = subject_allowed;
    this.next_payment = next_payment;
}
RegularStudent.prototype = Object.create(Student.prototype);
RegularStudent.prototype.constructor = RegularStudent;
