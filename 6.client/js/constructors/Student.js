function Student(id, name, last_name, gender, last_payment){
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.gender = gender;
    this.last_payment = last_payment;
}

Student.prototype.jsonToStudent = function (student, jsonData){
    student.id = jsonData.id;
    student.name = jsonData.name;
    student.last_name = jsonData.last_name;
    student.gender = jsonData.gender;
    student.last_payment = jsonData.last_payment;
}
