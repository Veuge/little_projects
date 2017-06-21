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
    var attributes = [];

    for(var i = 0; i < inputAreas.length; i++){
        if (inputAreas[i].nodeName == "SELECT") {
            selectedSubjects.push(getMultipleSelect(inputAreas[i]));
            console.log(selectedSubjects);
            getObjects(selectedSubjects, subjectsObject);
        }
        else{
            attributes.push(inputAreas[i].value);
        }
    }

    console.log(attributes);
    console.log(whoIs.constructor);

    var newStudent = new whoIs.constructor();
    whoIs.constructor.apply(newStudent, attributes);
    console.log(newStudent);
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
    var object = {};
    var arrayOfSelected = {};
    var i;
    console.log(arrayOfObjects);

    for (i = 0; i < arrayOfNames.length; i++) {

    }
}

// createForm(schStudents[0]);

// Template!
// <div class="mt3">
//     <label class="db fw4 lh-copy f6" for="password">Student last name</label>
//     <input class="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password">
// </div>
