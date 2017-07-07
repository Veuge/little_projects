function RegularStudent(id, name, last_name, gender, last_payment, next_payment, subjects_allowed){
    Student.call(this, id, name, last_name, gender, last_payment);

    this.subjects_allowed = subjects_allowed;
    this.next_payment = next_payment;
}
RegularStudent.prototype = Object.create(Student.prototype);
RegularStudent.prototype.constructor = RegularStudent;

RegularStudent.prototype.jsonToRegularStudent = function (jsonData){
    this.jsonToStudent(jsonData);
    this.next_payment = jsonData.next_payment;
    this.subjects_allowed = jsonData.subjects_allowed;
}

RegularStudent.prototype.jsonArrayToRegularArray = function (jsonArray){
    var arrayJson = jsonArray.data;
    var paginator = jsonArray.paginator;

    var regularsArray = [];
    var i;
    var regularStudent;

    for (i = 0; i < arrayJson.length; i++) {
        regularStudent = new RegularStudent();
        regularStudent.jsonToRegularStudent(arrayJson[i]);
        regularsArray.push(regularStudent);
    }
    regularsArray.push(paginator);

    return regularsArray;
}

RegularStudent.prototype.validateInput = function(){
    var errorsBag = [];
    errorsBag = this.validate(errorsBag);
    var checkvalue = this.next_payment;

    if(isNaN(Date.parse(checkvalue))){
        errorsBag.push("The date format in next_payment is not correct. The correct format is yyyy-mm-dd");
    }

    if(Number(this.subjects_allowed) < 0 || this.subjects_allowed > 8){
        errorsBag.push("The subjects_allowed value must be between 0 and 8");
    }
    return errorsBag;
}
