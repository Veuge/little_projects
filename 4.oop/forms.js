var form = document.getElementById("create_object");
var saveButton = document.getElementById("save_button");
console.log(studentsObject);

function createForm(object){
    var attr;
    var newWrapper;
    var newLabel;
    var newText;
    var newInput;

    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newWrapper = document.createElement("div");
            newWrapper.className = "mt3";
            newLabel = document.createElement("label");
            newLabel.className = "db fw4 lh-copy f6";
            newLabel.setAttribute("id", attr);
            newText = document.createTextNode(attr);
            newInput = document.createElement("input");
            newInput.className = "b pa2 input-reset ba bg-transparent";
            newLabel.appendChild(newText);
            newWrapper.appendChild(newLabel);
            newWrapper.appendChild(newInput);
        }
        form.appendChild(newWrapper);
    }
    saveButton.style.display = "inline-block";
}

// createForm(schStudents[0]);

// Template!
// <div class="mt3">
//     <label class="db fw4 lh-copy f6" for="password">Student last name</label>
//     <input class="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password">
// </div>
