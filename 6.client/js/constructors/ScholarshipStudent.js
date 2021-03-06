function ScholarshipStudent(ci, name, last_name, gender, last_payment, discount, min_gpa){
    Student.call(this, ci, name, last_name, gender, last_payment, subjects);

    this.discount = discount;
    this.min_gpa = min_gpa;
}
ScholarshipStudent.prototype = Object.create(Student.prototype);
ScholarshipStudent.prototype.constructor = ScholarshipStudent;

ScholarshipStudent.prototype.jsonToScholarshipStudent = function (jsonData){
    this.jsonToStudent(jsonData);
    this.discount = jsonData.discount;
    this.min_gpa = jsonData.min_gpa;
}

ScholarshipStudent.prototype.jsonArrayToScholarshipArray = function (jsonArray){
    var arrayJson = jsonArray.data;
    var paginator = jsonArray.paginator;

    var scholarshipsArray = [];
    var i;
    var scholarshipStudent;

    for (i = 0; i < arrayJson.length; i++) {
        scholarshipStudent = new ScholarshipStudent();
        scholarshipStudent.jsonToScholarshipStudent(arrayJson[i]);
        scholarshipsArray.push(scholarshipStudent);
    }
    scholarshipsArray.push(paginator);

    return scholarshipsArray;
}

ScholarshipStudent.prototype.validateInput = function(){
    var errorsBag = [];
    errorsBag = this.validate(errorsBag);

    if(Number(this.discount) < 10 || Number(this.discount) > 30){
        errorsBag.push("The discount field must be between 10 and 30");
    }

    if(Number(this.min_gpa) < 0 || Number(this.min_gpa) >= 5){
        errorsBag.push("The min_gpa field must contain a number between 0,0 and 5,0.");
    }

    return errorsBag;
}
