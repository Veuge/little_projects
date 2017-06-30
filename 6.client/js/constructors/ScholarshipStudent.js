function ScholarshipStudent(ci, name, last_name, gender, last_payment, discount, min_gpa){
    Student.call(this, ci, name, last_name, gender, last_payment, subjects);

    this.discount = discount;
    this.min_gpa = min_gpa;
}
ScholarshipStudent.prototype = Object.create(Student.prototype);
ScholarshipStudent.prototype.constructor = ScholarshipStudent;

ScholarshipStudent.prototype.jsonToScholarshipStudent = function (schStudent, jsonData){
    schStudent.jsonToStudent(schStudent, jsonData);
    schStudent.discount = jsonData.discount;
    schStudent.min_gpa = jsonData.min_gpa;
}

ScholarshipStudent.prototype.jsonArrayToScholarshipArray = function (jsonArray){
    var arrayJson = jsonArray.data;
    var scholarshipsArray = [];
    var i;
    var scholarshipStudent;

    for (i = 0; i < arrayJson.length; i++) {
        scholarshipStudent = new ScholarshipStudent();
        scholarshipStudent.jsonToScholarshipStudent(scholarshipStudent, arrayJson[i]);
        scholarshipsArray.push(scholarshipStudent);
    }
    return scholarshipsArray;
}
