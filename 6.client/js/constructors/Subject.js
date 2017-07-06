function Subject(id, name, description, credits, classroom_id){
    this.id = id;
    this.name = name;
    this.description = description;
    this.credits = credits;
    this.classroom_id = classroom_id;
}

Subject.prototype.jsonToSubject = function(jsonData){
    this.id = jsonData.id;
    this.name = jsonData.name;
    this.description = jsonData.description;
    this.credits = jsonData.credits;
    this.classroom_id = jsonData.classroom_id;
}

Subject.prototype.jsonArrayToSubjectArray = function(jsonArray){
    var arrayJson = jsonArray.data;
    var subjectsArray = [];
    var i;
    var subject;

    for(i = 0; i < arrayJson.length; i++){
        subject = new Subject();
        subject.jsonToSubject(arrayJson[i]);
        subjectsArray.push(subject);
    }
    return subjectsArray;
}

Subject.prototype.validateInput = function(){
    var errorsBag = [];

    if(this.name.length <= 4){
        errorsBag.push("Field name must contain at least 4 characters");
    }

    if(this.description.length < 10){
        errorsBag.push("The description field must contain at least 10 characters");
    }

    if(Number(this.credits) < 5 || Number(this.credits) > 10){
        errorsBag.push("The credit value must be between 5 and 10");
    }

    if(Number(this.classroom_id) >= 5 || Number(this.classroom_id) <= 1){
        errorsBag.push("The classroom id must be between 1 and 5");
    }

    return errorsBag;
}
