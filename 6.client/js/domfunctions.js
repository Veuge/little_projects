function createTitle(collectionName, template, createFunction){
    var title_section = document.getElementById("section-title");
    title_section.innerHTML = collectionName;

    createButton(title_section, "+", "btn info", template, createFunction);
}

function createDataTable(objectArray){
    var content = document.getElementById("content");
    restartEmptySettings(content);

    var newTable = document.createElement("table");
    newTable.setAttribute("id", "data-table");
    content.appendChild(newTable);

    var table = document.getElementById("data-table");
    createTableHeader(table, objectArray[0]);
    objectArray.forEach(function createRows(object){
        createTableRow(table, object);
    });
}

function createTableHeader(table, object){
    var newHeader;
    var attr;
    var newCell;
    var text;

    newHeader = document.createElement("tr");
    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newCell = document.createElement("th");
            text = document.createTextNode(attr);
            newCell.appendChild(text);
            newHeader.appendChild(newCell);
        }
    }
    table.appendChild(newHeader);
}

function createTableRow(table, object){
    var newRow;
    var newCell;
    var newLink;
    var attr;
    var text;
    var actual;
    var str;
    var i;
    var classname = object.constructor.name + " " + object.id;

    newRow = document.createElement("tr");
    newRow.className = "item " + classname;

    // TODO: INSTEAD OF CLASSNAME I COULD PASS THE OBJECT PER SAY.
    newRow.onclick = function(){
        requestElement(object);
    }

    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newCell = document.createElement("td");
            text = document.createTextNode(object[attr]);
            newCell.appendChild(text);
            newRow.appendChild(newCell);
        }
    }
    table.appendChild(newRow);
}

function restartEmptySettings(node){
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

function createDetails(object, array, value){
    var container = document.getElementById("content");
    restartEmptySettings(content);

    var newDescriptionList = document.createElement("dl");
    var newDataTerm;
    var newDataDesc;
    var text;
    var attr;
    var newButton;

    for(attr in object[0]){
        if (object[0].hasOwnProperty(attr)) {
            newDataTerm = document.createElement("dt");
            text = document.createTextNode(attr);
            newDataTerm.appendChild(text);
            newDescriptionList.appendChild(newDataTerm)

            newDataDesc = document.createElement("dd");
            text = document.createTextNode(object[0][attr]);
            newDataDesc.appendChild(text);
            newDescriptionList.appendChild(newDataDesc);
        }
    }

    if(array && array.length != 0){
        newDataTerm = document.createElement("dt");
        text = document.createTextNode(array[0].constructor.name);
        newDataTerm.appendChild(text);
        newDescriptionList.appendChild(newDataTerm);

        array.forEach(function(item){
            newDataDesc = document.createElement("dd");
            text = document.createTextNode(item[value]);
            newDataDesc.appendChild(text);
            newDescriptionList.appendChild(newDataDesc);
        });
    }
    container.appendChild(newDescriptionList);

    createButton(container, "Delete", "danger", object[0], deleteElement);
    createButton(container, "Edit", "warning", object[0], editElement);
}

function createButton(container, text, classname, object, functionCallback){
    var newButton = document.createElement("button");
    var text = document.createTextNode(text);
    newButton.appendChild(text);
    newButton.className = classname + " btn";
    newButton.onclick = function(){
        functionCallback(object);
    }
    container.appendChild(newButton);
}

function createForm(object){
    var container = document.getElementById("content");
    restartEmptySettings(container);

    var newForm = document.createElement("form");
    newForm.setAttribute("id", "form-user");
    var attr;
    var newLabel;
    var newInput;
    var text;

    for (attr in object) {
        if (object.hasOwnProperty(attr) && attr != "id") {
            newLabel = document.createElement("label");
            text = document.createTextNode(attr);
            newLabel.appendChild(text);
            newForm.appendChild(newLabel);

            newInput = document.createElement("input");
            newInput.setAttribute("name", attr);
            newInput.className = "user-input";
            object[attr] === undefined ? newInput.value = "" : newInput.value = object[attr];
            newForm.appendChild(newInput);
        }
    }
    container.appendChild(newForm)
    createButton(container, "Submit", "btn info", object, getUserInput, object);
}

function showFormErrors(errors){
    var errorsContainer = document.getElementById("errorsContainer");

    var errorMessages = document.createElement("div");
    errorMessages.className = "errors";
    errorMessages.setAttribute("id", "formErrors");

    var errorTitle = document.createElement("strong");
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
