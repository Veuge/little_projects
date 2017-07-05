function Student(id, name, last_name, gender, last_payment){
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.gender = gender;
    this.last_payment = last_payment;
}

Student.prototype.jsonToStudent = function (jsonData){
    this.id = jsonData.id;
    this.name = jsonData.name;
    this.last_name = jsonData.last_name;
    this.gender = jsonData.gender;
    this.last_payment = jsonData.last_payment;
}

Student.prototype.jsonArrayToStudentArray = function (jsonArray){
    var arrayJson = jsonArray.data;
    var studentsArray = [];
    var i;
    var student;

    for (i = 0; i < arrayJson.length; i++) {
        student = new Student();
        student.jsonToStudent(arrayJson[i]);
        studentsArray.push(student);
    }
    return studentsArray;
}

Student.prototype.studentToJson = function(){
    var jsonObject = JSON.parse(JSON.stringify(this));
    return jsonObject;
}

Student.prototype.validate = function(errorsBag){
    var checkvalue = this.last_payment;
    var genders = ["female", "male", "Female", "Male"];

    if(this.name.length <= 4 || this.last_name.length <= 4){
        errorsBag.push("Fields name and last name must contain at least 4 characters");
    }

    if(genders.indexOf(this.gender) < 0){
        errorsBag.push("Field gender is incorrect. Valid options are 'female' or 'male'");
    }
    checkvalue = this.last_payment;
    if(isNaN(Date.parse(checkvalue))){
        errorsBag.push("The date format in last_payment is not correct. The correct format is yyyy-mm-dd");
    }
    return errorsBag;
}
