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
