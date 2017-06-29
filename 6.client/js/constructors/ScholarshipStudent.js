function ScholarshipStudent(ci, name, last_name, gender, last_payment, discount, min_gpa){
    Student.call(this, ci, name, last_name, gender, last_payment, subjects);

    this.discount = discount;
    this.min_gpa = min_gpa;
}
ScholarshipStudent.prototype = Object.create(Student.prototype);
ScholarshipStudent.prototype.constructor = ScholarshipStudent;
