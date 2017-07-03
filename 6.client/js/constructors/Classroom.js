function Classroom(id, classroom_name, capacity){
    this.id = id;
    this.classroom_name = classroom_name;
    this.capacity = capacity;
}

Classroom.prototype.jsonToClassroom = function(classroom, jsonData){
    classroom.id = jsonData.id;
    classroom.classroom_name = jsonData.classroom_name;
    classroom.capacity = jsonData.capacity;
}

Classroom.prototype.jsonArrayToClassroomArray = function(jsonArray){
    var arrayJson = jsonArray.data;
    var classroomsArray = [];
    var i;
    var classroom;

    for(i = 0; i < arrayJson.length; i++){
        classroom = new Classroom();
        classroom.jsonToClassroom(classroom, arrayJson[i]);
        classroomsArray.push(classroom);
    }
    return classroomsArray;
}

Classroom.prototype.validateInput = function(){
    var errorsBag = [];

    if(this.classroom_name.length <= 4){
        errorsBag.push("Field name must contain at least 4 characters");
    }

    if(Number(this.capacity) < 30 || Number(this.capacity) > 70){
        errorsBag.push("The discount field must be between 10 and 70");
    }

    return errorsBag;
}
