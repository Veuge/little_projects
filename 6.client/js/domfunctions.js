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

    for(attr in object){
        if (object.hasOwnProperty(attr)) {
            newDataTerm = document.createElement("dt");
            text = document.createTextNode(attr);
            newDataTerm.appendChild(text);
            newDescriptionList.appendChild(newDataTerm)

            newDataDesc = document.createElement("dd");
            text = document.createTextNode(object[attr]);
            newDataDesc.appendChild(text);
            newDescriptionList.appendChild(newDataDesc);
        }
    }

    if(array){
        newDataTerm = document.createElement("dt");
        text = document.createTextNode(array[0].constructor.name);
        newDataTerm.appendChild(text);
        newDescriptionList.appendChild(newDataTerm)

            array.forEach(function(item){
                newDataDesc = document.createElement("dd");
                text = document.createTextNode(item[value]);
                newDataDesc.appendChild(text);
                newDescriptionList.appendChild(newDataDesc);
            });
    }
    container.appendChild(newDescriptionList);

    createButton(container, "Delete", "danger", object, deleteElement);
    createButton(container, "Edit", "warning", object, editElement);
}

function createButton(container, text, classname, object, functionCallback){
    var newButton = document.createElement("button");
    var text = document.createTextNode(text);
    newButton.appendChild(text);
    newButton.className = classname;
    newButton.onclick = function(){
        functionCallback(object);
    }
    container.appendChild(newButton);
}
