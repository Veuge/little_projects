var form = document.getElementById("create_object");
var studentType;

function createForm(object){
    studentType = object;
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
    var errorsContainer = document.getElementById("errorsContainer");
    restartEmptySettings(errorsContainer);

    var inputAreas = document.querySelectorAll(".user-input");
    var selectedSubjects = [];
    var attributes = {};
    var errorsBag = [];

    for(var i = 0; i < inputAreas.length; i++){
        if (inputAreas[i].nodeName == "SELECT") {
            selectedSubjects = getMultipleSelect(inputAreas[i]);
            attributes[inputAreas[i].attributes.for.nodeValue] = getObjects(selectedSubjects, subjectsObject);
        }
        else{
            attributes[inputAreas[i].attributes.for.nodeValue] = inputAreas[i].value;
        }
    }
    if(validateInput(attributes, errorsBag)){
        var newStudent = new studentType.constructor();
        var arrayOfAttributes = []
        for (var value in attributes) {
            if (attributes.hasOwnProperty(value)) {
                arrayOfAttributes.push(attributes[value]);
            }
        }
        studentType.constructor.apply(newStudent, arrayOfAttributes);
        for(var i = 0; i < arrayOfAttributes[5].length; i++){
            arrayOfAttributes[5][i].addStudent(newStudent);
        }
        console.log(newStudent);
        studentsObject.push(newStudent);
        createTableRow(newStudent, "name");
    }
    else{
        formFeedback(errorsBag);
        console.log(errorsBag);
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

function validateInput(data, errorsBag){
    var field;
    for(field in data){
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
                number(field, data[field], min, max, errorsBag);
                break;

            case "name":
            case "last_name":
                // string validation
                string(field, data[field], errorsBag);
                break;

            case "last_payment":
            case "next_payment":
                // date validation
                date(field, data[field], errorsBag);
                break;

            case "gender":
                // gender validation
                gender(field, data[field], errorsBag);
                break;
        }
    }
    return (errorsBag.length == 0);
}

function number(field, checkvalue, min, max, errorsBag){
    if(checkvalue != ""){
        checkvalue = Number(checkvalue);
        if(checkvalue <= max && checkvalue >= min){
            return true;
        }
        else {
            errorsBag.push("The field " + field + " must be in the range " + min + "-" + max);
            return false;
        }
    }
    else{
        errorsBag.push("The field " + field + " can't be empty");
        return false;
    }
}

function string(field, checkvalue, errorsBag){
    if(checkvalue.length != 0){
        if(checkvalue.length >= 4){
            return true;
        }
        else{
            errorsBag.push("The field " + field + " must be at least 4 characters length");
            return false;
        }
    }
    else{
        errorsBag.push("The field " + field + " cannot be empty");
        return false;
    }
}

function date(field, checkvalue, errorsBag){
    if(!isNaN(Date.parse(checkvalue))){
        return true;
    }
    else {
        errorsBag.push("The date format in " + field + " is not correct. The correct format is yyyy-mm-dd");
        return false;
    }
}

function gender(checkvalue){
    var pattern = /[(Fem|M)ale]/g;
    if (pattern.test(checkvalue)){
        return true;
    }
    else {
        errorsBag.push("The field gender is filled in incorrectly, the valid options are Male or Female");
    }
}

function formFeedback(errors){
    // <div id="formErrors" class="pa4 bg-light-red black">
    //     <span class="lh-title ml3"><strong>Errors in form</strong></span>
    // </div>
    var errorsContainer = document.getElementById("errorsContainer");

    var errorMessages = document.createElement("div");
    errorMessages.className = "pa4 bg-light-red black";
    errorMessages.setAttribute("id", "formErrors");

    var errorTitle = document.createElement("strong");
    errorTitle.className = "lh-title ml3";
    var title = document.createTextNode("Errors in form");
    errorTitle.appendChild(title);
    errorMessages.appendChild(errorTitle);
    errorsContainer.appendChild(errorMessages);

    var listErrors = document.createElement("ul");
    var i;
    var errorItem;
    var errorText;

    for(i = 0; i < errors.length; i++){
        errorItem = document.createElement("li");
        errorText = document.createTextNode(errors[i]);
        errorItem.appendChild(errorText);
        listErrors.appendChild(errorItem);
    }
    errorMessages.appendChild(listErrors);
    console.log(errorMessages);
}

// Template!
// <div class="mt3">
//     <label class="db fw4 lh-copy f6" for="password">Student last name</label>
//     <input class="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password">
// </div>
