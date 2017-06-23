var form = document.getElementById("create_object");
var whoIs;

function createForm(object){
    whoIs = object;
    var attr;
    var newWrapper;
    var newLabel;
    var newText;
    var newInput;
    var newSaveBtn;

    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newWrapper = document.createElement("div");
            newWrapper.className = "mt3";
            newLabel = document.createElement("label");
            newLabel.className = "db fw4 lh-copy f6";
            newLabel.setAttribute("id", attr);
            newText = document.createTextNode(attr);
            newLabel.appendChild(newText);

            if(attr == "subjects"){
                newInput = document.createElement("select");
                newInput.className = "user-input b pa2 input-reset ba bg-transparent";
                newInput.setAttribute("multiple", true);
                newInput.setAttribute("for", attr);
                populateSelect(subjectsObject, newInput);
            }
            else{
                newInput = document.createElement("input");
                newInput.className = "user-input b pa2 input-reset ba bg-transparent";
                newInput.setAttribute("for", attr);
                newInput.setAttribute("required", true);
                newInput.setAttribute("type", "text");
            }
            newWrapper.appendChild(newLabel);
            newWrapper.appendChild(newInput);
            newWrapper.appendChild(newInput);
        }
        form.appendChild(newWrapper);
    }
    newWrapper = document.createElement("div");
    newWrapper.className = "mt3";
    newSaveBtn = document.createElement("input");
    newSaveBtn.className = "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6";
    newSaveBtn.setAttribute("id", "save_button");
    newSaveBtn.setAttribute("value", "Save");
    newWrapper.appendChild(newSaveBtn)
    form.appendChild(newWrapper);
    var saveButton = document.getElementById("save_button");
    saveButton.onclick = saveData;
}

function saveData(){
    var inputAreas = document.querySelectorAll(".user-input");
    var selectedSubjects = [];
    var attributes = {};

    for(var i = 0; i < inputAreas.length; i++){
        if (inputAreas[i].nodeName == "SELECT") {
            selectedSubjects = getMultipleSelect(inputAreas[i]);
            attributes[inputAreas[i].attributes.for.nodeValue] = getObjects(selectedSubjects, subjectsObject);
        }
        else{
            attributes[inputAreas[i].attributes.for.nodeValue] = inputAreas[i].value;
        }
    }
    if(validateInput(attributes)){
        var newStudent = new whoIs.constructor();
        whoIs.constructor.apply(newStudent, attributes);
        console.log(newStudent);
        studentsObject.push(newStudent);
        createTableRow(newStudent, "name");
        // writeToFile();
    }
    else{
        console.log("required fields aren't filled in");
    }
}

function populateSelect(objectArray, domParent){
    var newOption;
    var i;

    for(i = 0; i < objectArray.length; i++){
        newOption = document.createElement("option");
        newOption.setAttribute("value", objectArray[i].name);
        newText = document.createTextNode(objectArray[i].name);
        newOption.appendChild(newText);
        domParent.appendChild(newOption);
    }
}

function getMultipleSelect(select){
    var selected = [];
    var i;
    var option;

    for(i = 0; i < select.options.length; i++){
        option = select.options[i];
        if(option.selected){
            selected.push(option.innerText);
        }
    }
    return selected;
}

function getObjects(arrayOfNames, arrayOfObjects){
    var arrayOfSelected = [];
    var i;
    var j;

    for (i = 0; i < arrayOfNames.length; i++) {
        for(j = 0; j < arrayOfObjects.length; j++){
            if(arrayOfObjects[j].name == arrayOfNames[i]){
                arrayOfSelected.push(arrayOfObjects[j]);
                break;
            }
        }
    }
    return arrayOfSelected;
}

function validateInput(data){
    var valid = true;
    var field;
    var partialBoolean;
    for(field in data){
        console.log(field);
        switch (field) {
            case "ci":
            case "subject_allowed":
            case "discount":
            case "min_gpa":
                // number validation
                var min;
                var max;
                field == "ci" ? min = 100 : min = 1;
                field == "ci" ? max = 999 : field == "subject_allowed" ? max = 8 : field == "discount" ? max = 30 : field == "min_gpa" ? max = 5 : max = 0;
                partialBoolean = number(data[field], min, max)
                valid = valid && partialBoolean;
                break;

            case "name":
            case "last_name":
                // string validation
                partialBoolean = string(data[field]);
                valid = valid && partialBoolean;
                break;

            case "last_payment":
            case "next_payment":
                // date validation
                partialBoolean = date(data[field]);
                valid = valid && partialBoolean;
                break;

            case "gender":
                // gender validation
                gender(data[field]);
                break;
        }
        console.log("partial", partialBoolean, "total", valid);
    }

    return valid;
}

function number(checkvalue, min, max){
    if(checkvalue != ""){
        checkvalue = Number(checkvalue);
        return (checkvalue <= max && checkvalue >= min);
    }
    else{
        return false;
    }
}

function string(checkvalue){
    return (checkvalue.length >= 4);
}

function date(checkvalue){
    return (!isNaN(Date.parse(checkvalue)));
}

function gender(checkvalue){
    pattern = /[(Fem|M)ale]/g;
    return (pattern.test(checkvalue));
}


// Template!
// <div class="mt3">
//     <label class="db fw4 lh-copy f6" for="password">Student last name</label>
//     <input class="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password">
// </div>
