function Subject(id, name, description, credits, classroom_id){
    this.id = id;
    this.name = name;
    this.description = description;
    this.credits = credits;
    this.classroom_id = classroom_id;
}

Subject.prototype.jsonToSubject = function(subject, jsonData){
    subject.id = jsonData.id;
    subject.name = jsonData.name;
    subject.description = jsonData.description;
    subject.credits = jsonData.credits;
    subject.classroom_id = jsonData.classroom_id;
}

Subject.prototype.jsonArrayToSubjectArray = function(jsonArray){
    var arrayJson = jsonArray.data;
    var subjectsArray = [];
    var i;
    var subject;

    for(i = 0; i < arrayJson.length; i++){
        subject = new Subject();
        subject.jsonToSubject(subject, arrayJson[i]);
        subjectsArray.push(subject);
    }
    return subjectsArray;
}
