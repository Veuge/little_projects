function RegularStudent(id, name, last_name, gender, last_payment, next_payment, subjects_allowed){
    Student.call(this, id, name, last_name, gender, last_payment);

    this.subjects_allowed = subjects_allowed;
    this.next_payment = next_payment;
}
RegularStudent.prototype = Object.create(Student.prototype);
RegularStudent.prototype.constructor = RegularStudent;

RegularStudent.prototype.jsonToRegularStudent = function (regStudent, jsonData){
    regStudent.jsonToStudent(regStudent, jsonData);
    regStudent.next_payment = jsonData.next_payment;
    regStudent.subjects_allowed = jsonData.subjects_allowed;
}

RegularStudent.prototype.jsonArrayToRegularArray = function (jsonArray){
    var arrayJson = jsonArray.data;
    var regularsArray = [];
    var i;
    var regularStudent;

    for (i = 0; i < arrayJson.length; i++) {
        regularStudent = new RegularStudent();
        regularStudent.jsonToRegularStudent(regularStudent, arrayJson[i]);
        regularsArray.push(regularStudent);
    }
    return regularsArray;
}
